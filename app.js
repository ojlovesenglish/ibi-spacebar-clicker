// ============================================================================
// APEX BEAST: English Vocabulary Clicker - Main Game Engine
// ============================================================================

class ApexBeastGame {
  constructor() {
    this.audio = new ApexAudioManager();

    // Game State
    this.points = 0;
    this.totalPointsEarned = 0;
    this.totalClicks = 0;
    this.spacebarClicks = 0;
    this.clickPower = 1;
    this.pointsPerSecond = 0;

    // Upgrades & Animals
    this.animals = JSON.parse(JSON.stringify(window.APEX_DEFAULT_ANIMALS || []));
    this.upgrades = JSON.parse(JSON.stringify(window.APEX_DEFAULT_UPGRADES || []));
    this.ownedAnimals = {}; // { id: count }
    this.purchasedUpgrades = new Set();

    this.selectedAnimalId = "dog";
    this.activeTierFilter = "all";
    this.activeArsenalTab = "verbs";
    this.buyMultiplier = 1; // 1, 10, or 'max'

    // Combo system
    this.combo = 0;
    this.comboTimer = null;
    this.maxCombo = 25;

    // AI Auto-Strike System (Protects tablet hardware with 35 clicks/sec)
    this.aiActive = false;
    this.aiClicksPerSecond = 35;
    this.aiDuration = 12; // 12 seconds active burst
    this.aiTimeRemaining = 0;
    this.aiCooldownDuration = 8; // 8 seconds recharge
    this.aiCooldownRemaining = 0;
    this.infiniteAiMode = false; // Teacher toggleable
    this.aiFiringInterval = null;

    // Frenzy event
    this.frenzyRemaining = 0;
    this.frenzyTimer = null;
    this.goldenSpawnTimer = null;

    // Preferences
    this.showJapanese = true;
    this.screenShake = true;

    // Loop
    this.lastTick = performance.now();
    this.saveInterval = null;

    this.init();
  }

  init() {
    this.loadGame();
    this.cacheDom();
    document.body.classList.toggle("show-ja", this.showJapanese);
    this.bindEvents();
    this.renderActiveAnimal();
    this.renderRoster();
    this.renderUpgrades();
    this.updateStatsDisplay();
    this.scheduleGoldenBeast();

    // Start Main Game Loop (60 FPS)
    requestAnimationFrame((t) => this.gameLoop(t));

    // Auto-save every 5 seconds
    this.saveInterval = setInterval(() => this.saveGame(), 5000);
  }

  cacheDom() {
    this.dom = {
      pointsDisplay: document.getElementById("pointsDisplay"),
      ppsDisplay: document.getElementById("ppsDisplay"),
      rankTitle: document.getElementById("rankTitle"),
      rankBadge: document.getElementById("rankBadge"),

      // Core
      beastCoreBtn: document.getElementById("beastCoreBtn"),
      coreArt: document.getElementById("coreArt"),
      floatingWords: document.getElementById("floatingWordContainer"),
      spacebarKey: document.getElementById("spacebarKey"),
      comboBarFill: document.getElementById("comboBarFill"),
      comboValue: document.getElementById("comboValue"),

      // AI Auto-Strike
      aiAutoBtn: document.getElementById("aiAutoBtn"),
      aiBotStatus: document.getElementById("aiBotStatus"),
      aiCooldownGauge: document.getElementById("aiCooldownGauge"),

      // Active Beast Card
      activeWord: document.getElementById("activeWord"),
      activeJaLarge: document.getElementById("activeJaLarge"),
      activePhonetic: document.getElementById("activePhonetic"),
      activeJa: document.getElementById("activeJa"),
      activeDesc: document.getElementById("activeDesc"),
      activeFact: document.getElementById("activeFact"),
      activePronounceBtn: document.getElementById("activePronounceBtn"),

      // Roster
      rosterList: document.getElementById("rosterList"),
      tierTabs: document.querySelectorAll(".tier-tab-btn"),
      buyMultBtns: document.querySelectorAll(".buy-mult-btn"),

      // Arsenal
      arsenalContent: document.getElementById("arsenalContent"),
      arsenalTabs: document.querySelectorAll(".arsenal-tab-btn"),

      // Controls
      testAudioBtn: document.getElementById("testAudioBtn"),
      soundToggleBtn: document.getElementById("soundToggleBtn"),
      voiceToggleBtn: document.getElementById("voiceToggleBtn"),
      jaToggleBtn: document.getElementById("jaToggleBtn"),
      teacherBtn: document.getElementById("teacherBtn"),

      // Frenzy Banner
      frenzyBanner: document.getElementById("frenzyBanner"),
      frenzyTimerText: document.getElementById("frenzyTimerText"),

      // Modals
      challengeModal: document.getElementById("challengeModal"),
      teacherModal: document.getElementById("teacherModal"),
      closeChallengeBtn: document.getElementById("closeChallengeBtn"),
      closeTeacherBtn: document.getElementById("closeTeacherBtn")
    };
  }

  bindEvents() {
    // Beast Core Click (Mouse & Touch)
    let lastTouchTime = 0;

    this.dom.beastCoreBtn.addEventListener("click", (e) => {
      if (Date.now() - lastTouchTime < 450) {
        return; // Ignore ghost click from touch
      }
      this.handleCoreClick(e.clientX, e.clientY, false);
    });

    // Multi-touch support for iPad / Android tablets
    this.dom.beastCoreBtn.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        lastTouchTime = Date.now();
        for (let i = 0; i < e.changedTouches.length; i++) {
          const t = e.changedTouches[i];
          this.handleCoreClick(t.clientX, t.clientY, false);
        }
      },
      { passive: false }
    );

    // Spacebar Trigger & AI Hotkey
    window.addEventListener("keydown", (e) => {
      // Hotkey 'A' triggers AI Auto-Strike
      if (e.code === "KeyA" || e.key === "a" || e.key === "A") {
        if (!["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
          this.toggleAiAutoStrike();
          return;
        }
      }

      if (e.code === "Space" || e.key === " ") {
        // Only trigger if not typing in teacher form input
        if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
          return;
        }
        e.preventDefault();
        this.dom.spacebarKey.classList.add("pressed");
        this.dom.beastCoreBtn.classList.add("pressed");
        
        // Center position for spacebar particle burst
        const rect = this.dom.beastCoreBtn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        this.handleCoreClick(cx, cy, true);
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.code === "Space" || e.key === " ") {
        this.dom.spacebarKey.classList.remove("pressed");
        this.dom.beastCoreBtn.classList.remove("pressed");
      }
    });

    // AI Auto-Strike Button
    this.dom.aiAutoBtn.addEventListener("click", () => {
      this.toggleAiAutoStrike();
    });

    // Active Beast Audio Pronounce button
    this.dom.activePronounceBtn.addEventListener("click", () => {
      const beast = this.getAnimal(this.selectedAnimalId);
      if (beast) {
        this.audio.playAnimalSound(beast.id);
        this.audio.speak(beast.word, true);
      }
    });

    // Tier Tabs
    this.dom.tierTabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.dom.tierTabs.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeTierFilter = btn.dataset.tier;
        this.renderRoster();
      });
    });

    // Buy Multipliers (1x, 10x, MAX)
    this.dom.buyMultBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.dom.buyMultBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const val = btn.dataset.mult;
        this.buyMultiplier = val === "max" ? "max" : parseInt(val, 10);
        this.renderRoster();
      });
    });

    // Arsenal Tabs
    this.dom.arsenalTabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.dom.arsenalTabs.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeArsenalTab = btn.dataset.tab;
        this.renderUpgrades();
      });
    });

    // Header Controls
    if (this.dom.testAudioBtn) {
      this.dom.testAudioBtn.addEventListener("click", () => {
        this.audio.testAudio();
      });
    }

    this.dom.soundToggleBtn.addEventListener("click", () => {
      const active = this.audio.toggleSound();
      this.dom.soundToggleBtn.classList.toggle("active", active);
      this.dom.soundToggleBtn.querySelector(".btn-label").textContent = active ? "SFX: ON" : "SFX: OFF";
    });

    this.dom.voiceToggleBtn.addEventListener("click", () => {
      const active = this.audio.toggleSpeech();
      this.dom.voiceToggleBtn.classList.toggle("active", active);
      this.dom.voiceToggleBtn.querySelector(".btn-label").textContent = active ? "VOICE: ON" : "VOICE: OFF";
    });

    this.dom.jaToggleBtn.addEventListener("click", () => {
      this.showJapanese = !this.showJapanese;
      document.body.classList.toggle("show-ja", this.showJapanese);
      this.dom.jaToggleBtn.classList.toggle("active", this.showJapanese);
      this.dom.jaToggleBtn.querySelector(".btn-label").textContent = this.showJapanese ? "日本語: ON" : "日本語: OFF";
      this.renderActiveAnimal();
      this.renderRoster();
      this.renderUpgrades();
      this.updateStatsDisplay();
      this.saveGame();
    });

    // Teacher Panel Modals
    this.dom.teacherBtn.addEventListener("click", () => this.openTeacherModal());
    this.dom.closeTeacherBtn.addEventListener("click", () => this.closeTeacherModal());
    this.dom.closeChallengeBtn.addEventListener("click", () => this.closeChallengeModal());
  }

  // --------------------------------------------------------------------------
  // Core Click Handling
  // --------------------------------------------------------------------------
  handleCoreClick(x, y, isSpacebar = false) {
    this.totalClicks++;
    if (isSpacebar) this.spacebarClicks++;

    // Calculate Combo
    this.combo = Math.min(this.combo + 1, this.maxCombo);
    clearTimeout(this.comboTimer);
    this.comboTimer = setTimeout(() => {
      this.combo = 0;
      this.updateComboDisplay();
    }, 1400);
    this.updateComboDisplay();

    // Multipliers
    let clickPoints = this.calculateClickPower(isSpacebar);

    // Critical Hit calculation (10% chance base + combo bonus)
    const critChance = 0.08 + (this.combo / this.maxCombo) * 0.12;
    const isCrit = Math.random() < critChance;
    if (isCrit) {
      clickPoints *= 3;
      this.audio.playCritical();
      if (this.screenShake) {
        document.body.classList.add("screen-shake");
        setTimeout(() => document.body.classList.remove("screen-shake"), 120);
      }
    } else {
      if (isSpacebar) {
        this.audio.playSpacebar(this.combo);
      } else {
        this.audio.playClick(this.combo);
      }
    }

    // Award Points
    this.points += clickPoints;
    this.totalPointsEarned += clickPoints;

    // Visual feedback: Spawning floating word damage
    const activeBeast = this.getAnimal(this.selectedAnimalId) || this.animals[0];
    const wordText = isCrit
      ? `CRITICAL ${activeBeast.actionVerb || "STRIKE"}! +${this.formatNumber(clickPoints)}`
      : `+${this.formatNumber(clickPoints)} ${activeBeast.word}!`;

    this.spawnFloatingWord(x, y, wordText, isCrit);

    // Speak word periodically on clicks to reinforce vocabulary
    if (this.totalClicks % 8 === 0 || isCrit) {
      this.audio.speak(activeBeast.word);
    }

    this.updateStatsDisplay();
    this.renderRosterAffordability();
    this.renderUpgradeAffordability();
  }

  calculateClickPower(isSpacebar = false) {
    // Base 1 + 1% of total PPS
    let base = 1 + this.pointsPerSecond * 0.015;

    // Upgrades that affect click power
    this.upgrades.forEach((up) => {
      if (this.purchasedUpgrades.has(up.id)) {
        if (up.target === "click") {
          base *= up.multiplier;
        }
        if (isSpacebar && up.target === "spacebar") {
          base *= up.multiplier;
        }
      }
    });

    // Combo multiplier (up to 2.5x at max combo)
    const comboMult = 1 + (this.combo / this.maxCombo) * 1.5;
    base *= comboMult;

    // Frenzy multiplier
    if (this.frenzyRemaining > 0) {
      base *= 7;
    }

    return Math.max(1, Math.floor(base));
  }

  spawnFloatingWord(x, y, text, isCrit = false) {
    const el = document.createElement("div");
    el.className = `floating-word ${isCrit ? "crit" : ""}`;
    el.textContent = text;

    // Calculate position relative to container
    const container = this.dom.floatingWords;
    const rect = container.getBoundingClientRect();
    
    // Spread around click point
    const spreadX = (Math.random() - 0.5) * 50;
    const spreadY = (Math.random() - 0.5) * 20;

    let posX = x ? x - rect.left + spreadX : rect.width / 2 + spreadX;
    let posY = y ? y - rect.top + spreadY : rect.height / 2 + spreadY;

    el.style.left = `${posX}px`;
    el.style.top = `${posY}px`;

    container.appendChild(el);
    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 950);
  }

  updateComboDisplay() {
    const pct = (this.combo / this.maxCombo) * 100;
    this.dom.comboBarFill.style.width = `${pct}%`;
    this.dom.comboValue.textContent = `COMBO: x${this.combo} (${Math.round((1 + (this.combo / this.maxCombo) * 1.5) * 10) / 10}x BOOST)`;
  }

  // --------------------------------------------------------------------------
  // AI Auto-Strike System (Overdrive 35 clicks/sec - protects hardware)
  // --------------------------------------------------------------------------
  toggleAiAutoStrike() {
    if (this.aiCooldownRemaining > 0 && !this.infiniteAiMode) {
      return;
    }

    if (this.aiActive) {
      this.stopAiAutoStrike(false);
    } else {
      this.startAiAutoStrike();
    }
  }

  startAiAutoStrike() {
    this.aiActive = true;
    this.aiTimeRemaining = this.aiDuration;
    this.dom.aiAutoBtn.classList.add("active");
    this.dom.spacebarKey.classList.add("ai-chattering");

    this.audio.playUpgrade();
    this.audio.speak("AI Auto Strike Engaged", true);

    const intervalMs = Math.round(1000 / this.aiClicksPerSecond);
    let pulseCounter = 0;
    let wordCounter = 0;

    clearInterval(this.aiFiringInterval);
    this.aiFiringInterval = setInterval(() => {
      if (!this.aiActive) {
        clearInterval(this.aiFiringInterval);
        return;
      }

      pulseCounter++;
      wordCounter++;

      const rect = this.dom.beastCoreBtn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Throttle floating text and audio so 35/sec runs at 60 FPS smoothly
      const spawnWord = (wordCounter % 6 === 0);
      const playSound = (pulseCounter % 3 === 0);

      this.handleAiCoreClick(cx, cy, spawnWord, playSound);
    }, intervalMs);
  }

  handleAiCoreClick(x, y, spawnWord, playSound) {
    this.totalClicks++;
    this.spacebarClicks++;

    this.combo = this.maxCombo;
    this.updateComboDisplay();

    let clickPoints = this.calculateClickPower(true);

    if (playSound) {
      this.audio.playAiPulse();
    }

    this.points += clickPoints;
    this.totalPointsEarned += clickPoints;

    if (spawnWord) {
      const activeBeast = this.getAnimal(this.selectedAnimalId) || this.animals[0];
      const wordText = `⚡ AI ${activeBeast.word}! +${this.formatNumber(clickPoints * 6)}`;
      this.spawnFloatingWord(x, y, wordText, true);
    }

    this.updateStatsDisplay();
  }

  stopAiAutoStrike(naturalEnd = true) {
    this.aiActive = false;
    clearInterval(this.aiFiringInterval);
    this.dom.aiAutoBtn.classList.remove("active");
    this.dom.spacebarKey.classList.remove("ai-chattering");

    if (naturalEnd && !this.infiniteAiMode) {
      this.aiCooldownRemaining = this.aiCooldownDuration;
      this.dom.aiAutoBtn.classList.add("cooldown");
      this.dom.aiAutoBtn.disabled = true;
      this.audio.playCritical();
    } else {
      this.aiCooldownRemaining = 0;
      this.dom.aiAutoBtn.classList.remove("cooldown");
      this.dom.aiAutoBtn.disabled = false;
      this.dom.aiBotStatus.textContent = `READY // ${this.aiClicksPerSecond} CLICKS/SEC`;
      this.dom.aiCooldownGauge.style.width = "0%";
    }
  }

  // --------------------------------------------------------------------------
  // Main Game Loop & PPS
  // --------------------------------------------------------------------------
  gameLoop(timestamp) {
    const delta = (timestamp - this.lastTick) / 1000;
    this.lastTick = timestamp;

    if (delta > 0 && delta < 5) {
      // Calculate current PPS
      this.pointsPerSecond = this.calculateTotalPPS();

      // Add points
      const gained = this.pointsPerSecond * delta;
      this.points += gained;
      this.totalPointsEarned += gained;

      // AI Auto-Strike Active & Cooldown Timers
      if (this.aiActive && !this.infiniteAiMode) {
        this.aiTimeRemaining -= delta;
        const pct = Math.max(0, (this.aiTimeRemaining / this.aiDuration) * 100);
        this.dom.aiCooldownGauge.style.width = `${pct}%`;
        this.dom.aiBotStatus.textContent = `OVERDRIVE ACTIVE // ${Math.ceil(this.aiTimeRemaining)}s`;

        if (this.aiTimeRemaining <= 0) {
          this.stopAiAutoStrike(true);
        }
      } else if (this.aiActive && this.infiniteAiMode) {
        this.dom.aiBotStatus.textContent = `INFINITE AI // ${this.aiClicksPerSecond} CLICKS/SEC`;
        this.dom.aiCooldownGauge.style.width = "100%";
      } else if (this.aiCooldownRemaining > 0) {
        this.aiCooldownRemaining -= delta;
        const pct = Math.min(100, ((this.aiCooldownDuration - this.aiCooldownRemaining) / this.aiCooldownDuration) * 100);
        this.dom.aiCooldownGauge.style.width = `${pct}%`;
        this.dom.aiBotStatus.textContent = `RECHARGING AI CORE... [${Math.ceil(this.aiCooldownRemaining)}s]`;

        if (this.aiCooldownRemaining <= 0) {
          this.aiCooldownRemaining = 0;
          this.dom.aiAutoBtn.classList.remove("cooldown");
          this.dom.aiAutoBtn.disabled = false;
          this.dom.aiBotStatus.textContent = `READY // ${this.aiClicksPerSecond} CLICKS/SEC`;
          this.dom.aiCooldownGauge.style.width = "0%";
          this.audio.playBuy();
        }
      }

      // Frenzy Countdown
      if (this.frenzyRemaining > 0) {
        this.frenzyRemaining -= delta;
        if (this.frenzyRemaining <= 0) {
          this.frenzyRemaining = 0;
          this.dom.frenzyBanner.style.display = "none";
        } else {
          this.dom.frenzyBanner.style.display = "block";
          this.dom.frenzyTimerText.textContent = `${Math.ceil(this.frenzyRemaining)}s`;
        }
      }

      this.updateStatsDisplay();
      this.renderRosterAffordability();
      this.renderUpgradeAffordability();
    }

    requestAnimationFrame((t) => this.gameLoop(t));
  }

  calculateTotalPPS() {
    let total = 0;

    // Animal specific multipliers from upgrades
    const animalMults = {};
    let globalMult = 1;

    this.upgrades.forEach((up) => {
      if (this.purchasedUpgrades.has(up.id)) {
        if (up.target === "global") {
          globalMult *= up.multiplier;
        } else if (up.target !== "click" && up.target !== "spacebar") {
          animalMults[up.target] = (animalMults[up.target] || 1) * up.multiplier;
        }
      }
    });

    this.animals.forEach((animal) => {
      const count = this.ownedAnimals[animal.id] || 0;
      if (count > 0) {
        const mult = animalMults[animal.id] || 1;
        total += count * animal.basePps * mult;
      }
    });

    total *= globalMult;

    if (this.frenzyRemaining > 0) {
      total *= 7;
    }

    return Math.floor(total);
  }

  // --------------------------------------------------------------------------
  // Roster & Upgrades Rendering
  // --------------------------------------------------------------------------
  getAnimal(id) {
    return this.animals.find((a) => a.id === id);
  }

  calculateCost(baseCost, countOwned, amountToBuy) {
    if (amountToBuy === 1) {
      return Math.floor(baseCost * Math.pow(1.15, countOwned));
    }

    let total = 0;
    for (let i = 0; i < amountToBuy; i++) {
      total += Math.floor(baseCost * Math.pow(1.15, countOwned + i));
    }
    return total;
  }

  calculateMaxAffordable(baseCost, countOwned) {
    let count = 0;
    let cost = 0;
    let nextCost = Math.floor(baseCost * Math.pow(1.15, countOwned));

    while (this.points >= cost + nextCost) {
      cost += nextCost;
      count++;
      nextCost = Math.floor(baseCost * Math.pow(1.15, countOwned + count));
      if (count >= 1000) break; // safety
    }

    return { count: Math.max(1, count), cost: Math.max(nextCost, cost) };
  }

  renderActiveAnimal() {
    const beast = this.getAnimal(this.selectedAnimalId) || this.animals[0];
    this.dom.coreArt.innerHTML = beast.svg;
    this.dom.activeWord.textContent = beast.word;
    if (this.dom.activeJaLarge) {
      this.dom.activeJaLarge.textContent = `${beast.jaMeaning || ""} [${beast.jaKana || ""}]`;
    }
    this.dom.activePhonetic.textContent = beast.phonetic || "";
    this.dom.activeJa.textContent = `${beast.jaMeaning || ""} / ${beast.jaTitle || ""}`;
    
    this.dom.activeDesc.innerHTML = `
      <div>${beast.desc || ""}</div>
      <div class="ja-text" style="color:#00f0ff; margin-top:4px; font-weight:600;">${beast.jaDesc || ""}</div>
    `;

    this.dom.activeFact.innerHTML = `
      <div><strong>TACTICAL TRIVIA:</strong> ${beast.fact || ""}</div>
      <div class="ja-text" style="color:#ffe600; margin-top:4px; font-weight:600;"><strong>【豆知識】</strong> ${beast.jaFact || ""}</div>
    `;
  }

  renderRoster() {
    this.dom.rosterList.innerHTML = "";

    const filtered = this.animals.filter((a) => {
      if (this.activeTierFilter === "all") return true;
      return a.tier.toString() === this.activeTierFilter;
    });

    filtered.forEach((animal) => {
      const count = this.ownedAnimals[animal.id] || 0;

      let amountToBuy = this.buyMultiplier === "max" ? 1 : this.buyMultiplier;
      let cost = this.calculateCost(animal.baseCost, count, amountToBuy);

      if (this.buyMultiplier === "max") {
        const maxInfo = this.calculateMaxAffordable(animal.baseCost, count);
        amountToBuy = maxInfo.count;
        cost = maxInfo.cost;
      }

      const card = document.createElement("div");
      card.className = `animal-card tier-${animal.tier}`;
      card.id = `card-${animal.id}`;

      card.innerHTML = `
        <div class="card-art-box" title="Select as Core Beast / 音声を聞く">
          ${animal.svg}
        </div>
        <div class="card-info">
          <div class="card-header-row">
            <span class="card-word">${animal.word}</span>
            <span class="card-kana-tag ja-text">${animal.jaKana || ""}</span>
            <span class="card-ja-title ja-text">${animal.jaMeaning || ""}</span>
            <span class="card-phonetic">${animal.phonetic || ""}</span>
          </div>
          <div style="font-size:0.75rem; color:var(--text-dim);" class="card-sub-row">
            <span>${animal.title}</span>
            <span class="ja-text" style="color:#00f0ff; margin-left:6px; font-weight:600;">(${animal.jaTitle || ""})</span>
          </div>
          <div class="card-stats-row">
            <span>LVL: <strong class="card-stat-count">${count}</strong></span>
            <span>+<strong class="card-stat-pps">${this.formatNumber(animal.basePps)}</strong> AP/s</span>
          </div>
        </div>
        <div class="card-action-col">
          <button class="card-speak-btn" title="Pronounce Word">🔊 Speak <span class="ja-inline ja-text">発音</span></button>
          <button class="buy-card-btn" ${this.points < cost ? "disabled" : ""}>
            <span>BUY +${amountToBuy} <span class="ja-inline ja-text">かう</span></span>
            <span class="cost-label">${this.formatNumber(cost)} AP</span>
          </button>
        </div>
      `;

      // Click card art to select as active core
      card.querySelector(".card-art-box").addEventListener("click", () => {
        this.selectedAnimalId = animal.id;
        this.renderActiveAnimal();
        this.audio.playAnimalSound(animal.id);
        this.audio.speak(animal.word, true);
      });

      // Speak Button
      card.querySelector(".card-speak-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        this.audio.playAnimalSound(animal.id);
        this.audio.speak(animal.word, true);
      });

      // Buy Button
      card.querySelector(".buy-card-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        this.buyAnimal(animal.id);
      });

      this.dom.rosterList.appendChild(card);
    });
  }

  buyAnimal(animalId) {
    const animal = this.getAnimal(animalId);
    if (!animal) return;

    const count = this.ownedAnimals[animalId] || 0;
    let amountToBuy = this.buyMultiplier === "max" ? 1 : this.buyMultiplier;
    let cost = this.calculateCost(animal.baseCost, count, amountToBuy);

    if (this.buyMultiplier === "max") {
      const maxInfo = this.calculateMaxAffordable(animal.baseCost, count);
      amountToBuy = maxInfo.count;
      cost = maxInfo.cost;
    }

    if (this.points >= cost) {
      this.points -= cost;
      this.ownedAnimals[animalId] = count + amountToBuy;
      
      // Play animal cry and pronounce word!
      this.audio.playAnimalSound(animal.id);
      this.audio.speak(animal.word, true);

      // If this is higher tier, set as active core
      this.selectedAnimalId = animal.id;
      this.renderActiveAnimal();

      this.renderRoster();
      this.renderUpgrades();
      this.updateStatsDisplay();
    }
  }

  renderRosterAffordability() {
    this.animals.forEach((animal) => {
      const card = document.getElementById(`card-${animal.id}`);
      if (!card) return;

      const count = this.ownedAnimals[animal.id] || 0;
      let amountToBuy = this.buyMultiplier === "max" ? 1 : this.buyMultiplier;
      let cost = this.calculateCost(animal.baseCost, count, amountToBuy);

      if (this.buyMultiplier === "max") {
        const maxInfo = this.calculateMaxAffordable(animal.baseCost, count);
        amountToBuy = maxInfo.count;
        cost = maxInfo.cost;
      }

      const buyBtn = card.querySelector(".buy-card-btn");
      if (buyBtn) {
        buyBtn.disabled = this.points < cost;
        buyBtn.querySelector("span:first-child").textContent = `BUY +${amountToBuy}`;
        buyBtn.querySelector(".cost-label").textContent = `${this.formatNumber(cost)} AP`;
      }
    });
  }

  renderUpgrades() {
    this.dom.arsenalContent.innerHTML = "";

    const filtered = this.upgrades.filter((up) => {
      if (this.activeArsenalTab === "verbs") return up.wordCategory === "Verb";
      if (this.activeArsenalTab === "adjectives") return up.wordCategory === "Adjective";
      if (this.activeArsenalTab === "mods") return up.wordCategory === "Tech Mod";
      return true;
    });

    filtered.forEach((up) => {
      const isPurchased = this.purchasedUpgrades.has(up.id);
      const card = document.createElement("div");
      card.className = `upgrade-card ${isPurchased ? "purchased" : ""}`;
      card.id = `upgrade-${up.id}`;

      let tagClass = "tech";
      if (up.wordCategory === "Verb") tagClass = "verb";
      if (up.wordCategory === "Adjective") tagClass = "adjective";

      const categoryLabel = `${up.wordCategory} <span class="ja-inline ja-text">(${up.jaCategory || ""})</span>`;

      card.innerHTML = `
        <div class="upgrade-header">
          <div>
            <span class="upgrade-name">${up.name}</span>
            <span class="upgrade-ja-name ja-text">${up.jaName || ""}</span>
          </div>
          <span class="upgrade-tag ${tagClass}">${categoryLabel}</span>
        </div>
        <div class="upgrade-desc">
          <div>${up.desc}</div>
          <div class="upgrade-ja-desc ja-text">${up.jaDesc || ""}</div>
        </div>
        ${up.vocabularyNote ? `
          <div class="vocab-note">
            <div>📖 ${up.vocabularyNote}</div>
            <div class="vocab-ja-note ja-text">💡 ${up.jaVocab || ""}</div>
          </div>` : ""}
        <div class="upgrade-buy-row">
          <span class="upgrade-cost">${isPurchased ? "INSTALLED (装着済)" : `${this.formatNumber(up.cost)} AP`}</span>
          <button class="upgrade-buy-btn" ${isPurchased || this.points < up.cost ? "disabled" : ""}>
            ${isPurchased ? "✓ ACTIVE (有効)" : "INSTALL (強化)"}
          </button>
        </div>
      `;

      if (!isPurchased) {
        card.querySelector(".upgrade-buy-btn").addEventListener("click", () => {
          this.buyUpgrade(up.id);
        });
      }

      this.dom.arsenalContent.appendChild(card);
    });
  }

  buyUpgrade(upId) {
    const up = this.upgrades.find((u) => u.id === upId);
    if (!up || this.purchasedUpgrades.has(upId)) return;

    if (this.points >= up.cost) {
      this.points -= up.cost;
      this.purchasedUpgrades.add(upId);
      this.audio.playUpgrade();

      // Speak verb / adjective name
      const cleanWord = up.name.split(" ")[0];
      this.audio.speak(cleanWord, true);

      this.renderUpgrades();
      this.renderRoster();
      this.updateStatsDisplay();
    }
  }

  renderUpgradeAffordability() {
    this.upgrades.forEach((up) => {
      const card = document.getElementById(`upgrade-${up.id}`);
      if (!card) return;

      const isPurchased = this.purchasedUpgrades.has(up.id);
      if (!isPurchased) {
        const btn = card.querySelector(".upgrade-buy-btn");
        if (btn) btn.disabled = this.points < up.cost;
      }
    });
  }

  // --------------------------------------------------------------------------
  // Golden Beast Frenzy Encounter ("Golden Cookie" equivalent)
  // --------------------------------------------------------------------------
  scheduleGoldenBeast() {
    // Spawns randomly between 40 and 75 seconds
    const interval = (40 + Math.random() * 35) * 1000;
    this.goldenSpawnTimer = setTimeout(() => {
      this.spawnGoldenBeast();
      this.scheduleGoldenBeast();
    }, interval);
  }

  spawnGoldenBeast() {
    const existing = document.querySelector(".golden-beast-alert");
    if (existing) existing.remove();

    this.audio.playBeacon();

    const el = document.createElement("div");
    el.className = "golden-beast-alert";

    // Random on screen
    const x = 50 + Math.random() * (window.innerWidth - 180);
    const y = 80 + Math.random() * (window.innerHeight - 220);
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;

    // Cool golden beast emblem
    el.innerHTML = `
      <svg viewBox="0 0 100 100" class="golden-beast-art">
        <polygon points="50,5 95,95 5,95" fill="none" stroke="#ffe600" stroke-width="4"/>
        <polygon points="50,25 75,75 25,75" fill="#ffe600" opacity="0.8"/>
        <circle cx="50" cy="55" r="10" fill="#ff0055"/>
      </svg>
    `;

    el.addEventListener("click", () => {
      el.remove();
      this.openWordChallenge();
    });

    document.body.appendChild(el);

    // Auto-vanish after 14 seconds
    setTimeout(() => {
      if (el.parentNode) el.remove();
    }, 14000);
  }

  openWordChallenge() {
    // Pick 1 random unlocked animal or common animal
    const target = this.animals[Math.floor(Math.random() * Math.min(this.animals.length, 8))];

    // Pick 3 distractors
    const distractors = this.animals.filter((a) => a.id !== target.id);
    this.shuffleArray(distractors);
    const choices = [target, distractors[0], distractors[1], distractors[2]];
    this.shuffleArray(choices);

    const modalBody = this.dom.challengeModal.querySelector(".modal-body");
    modalBody.innerHTML = `
      <div class="challenge-box">
        <div class="challenge-art">${target.svg}</div>
        <div class="challenge-prompt">
          <div>Identify the Wild Beast for a 7x OVERDRIVE FRENZY!</div>
          <div class="ja-text" style="color:#ffe600; font-size:0.95rem; margin-top:4px; font-weight:700;">英語の動物をあてて【7倍フィーバー】を発動しよう！</div>
        </div>
        <button id="challengeAudioBtn" class="hud-btn" style="margin-bottom: 8px;">
          <span>🔊</span> <span>Listen to Pronunciation</span> <span class="ja-inline ja-text">(音声を聞く)</span>
        </button>
        <div class="challenge-options">
          ${choices
            .map(
              (c) => `
            <button class="challenge-opt-btn" data-id="${c.id}">
              <div>${c.word}</div>
              <div class="ja-text" style="font-size:0.85rem; color:#00f0ff; margin-top:3px; font-weight:700;">${c.jaMeaning || ""} [${c.jaKana || ""}]</div>
            </button>
          `
            )
            .join("")}
        </div>
      </div>
    `;

    document.getElementById("challengeAudioBtn").addEventListener("click", () => {
      this.audio.playAnimalSound(target.id);
      this.audio.speak(target.word, true);
    });

    // Auto-play cue and speak target once
    setTimeout(() => {
      this.audio.playAnimalSound(target.id);
      this.audio.speak(target.word, true);
    }, 300);

    modalBody.querySelectorAll(".challenge-opt-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.dataset.id === target.id) {
          // Success! Trigger Frenzy!
          this.triggerFrenzy(20);
          this.closeChallengeModal();
        } else {
          // Incorrect
          btn.style.borderColor = "#ff0055";
          btn.style.color = "#ff0055";
          this.audio.speak("Try again", true);
        }
      });
    });

    this.dom.challengeModal.classList.add("active");
  }

  triggerFrenzy(durationSeconds = 20) {
    this.frenzyRemaining = durationSeconds;
    this.audio.playFrenzyStart();
    this.audio.speak("Hyper Overdrive Frenzy Activated!", true);
    this.dom.frenzyBanner.style.display = "block";
  }

  closeChallengeModal() {
    this.dom.challengeModal.classList.remove("active");
  }

  // --------------------------------------------------------------------------
  // Teacher Mode & Customization
  // --------------------------------------------------------------------------
  openTeacherModal() {
    this.renderTeacherView();
    this.dom.teacherModal.classList.add("active");
  }

  closeTeacherModal() {
    this.dom.teacherModal.classList.remove("active");
  }

  renderTeacherView() {
    const body = this.dom.teacherModal.querySelector(".modal-body");
    body.innerHTML = `
      <div class="teacher-tabs">
        <button class="teacher-tab-btn active" data-tab="words">Add / Edit Words</button>
        <button class="teacher-tab-btn" data-tab="student">Student Balance & Cheat</button>
        <button class="teacher-tab-btn" data-tab="backup">Save & Export JSON</button>
      </div>
      <div id="teacherTabContent" style="display:flex; flex-direction:column; gap:12px; margin-top:8px;"></div>
    `;

    const tabs = body.querySelectorAll(".teacher-tab-btn");
    tabs.forEach((t) => {
      t.addEventListener("click", () => {
        tabs.forEach((b) => b.classList.remove("active"));
        t.classList.add("active");
        this.renderTeacherSubTab(t.dataset.tab);
      });
    });

    this.renderTeacherSubTab("words");
  }

  renderTeacherSubTab(tab) {
    const container = document.getElementById("teacherTabContent");
    if (!container) return;

    if (tab === "words") {
      container.innerHTML = `
        <p style="font-size:0.8rem; color:var(--text-dim);">
          Add a new animal vocabulary word or edit existing ones. Changes take effect immediately!
        </p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
          <div class="teacher-form-group">
            <label class="teacher-label">English Word (e.g. WOLF)</label>
            <input type="text" id="newWord" class="teacher-input" placeholder="e.g. CHEETAH">
          </div>
          <div class="teacher-form-group">
            <label class="teacher-label">Cool Title (e.g. Mach Prowler)</label>
            <input type="text" id="newTitle" class="teacher-input" placeholder="e.g. Velocity Hunter">
          </div>
          <div class="teacher-form-group">
            <label class="teacher-label">Japanese Meaning (optional)</label>
            <input type="text" id="newJa" class="teacher-input" placeholder="e.g. チーター">
          </div>
          <div class="teacher-form-group">
            <label class="teacher-label">Tier / Level</label>
            <select id="newTier" class="teacher-select">
              <option value="1">Tier 1 (Basic / Recon)</option>
              <option value="2">Tier 2 (Predator Strike)</option>
              <option value="3">Tier 3 (Apex Titans)</option>
            </select>
          </div>
          <div class="teacher-form-group">
            <label class="teacher-label">Base Cost (AP)</label>
            <input type="number" id="newCost" class="teacher-input" value="15000">
          </div>
          <div class="teacher-form-group">
            <label class="teacher-label">Base AP/s Production</label>
            <input type="number" id="newPps" class="teacher-input" value="450">
          </div>
        </div>
        <div class="teacher-form-group">
          <label class="teacher-label">Tactical Description / Fun Fact</label>
          <input type="text" id="newFact" class="teacher-input" placeholder="e.g. Fastest land animal, running up to 70 mph!">
        </div>
        <div class="teacher-actions">
          <button id="addWordBtn" class="btn-primary">+ Add Animal Word</button>
          <button id="resetVocabBtn" class="btn-secondary">↺ Reset to Default Animals</button>
        </div>
      `;

      document.getElementById("addWordBtn").addEventListener("click", () => {
        const word = document.getElementById("newWord").value.trim().toUpperCase();
        const title = document.getElementById("newTitle").value.trim() || "Apex Scout";
        const ja = document.getElementById("newJa").value.trim();
        const tier = parseInt(document.getElementById("newTier").value, 10);
        const cost = parseInt(document.getElementById("newCost").value, 10) || 1000;
        const pps = parseInt(document.getElementById("newPps").value, 10) || 50;
        const fact = document.getElementById("newFact").value.trim() || "A fierce and powerful creature!";

        if (!word) {
          alert("Please enter a valid English word!");
          return;
        }

        const id = word.toLowerCase().replace(/[^a-z0-9]/g, "_");
        this.animals.push({
          id,
          word,
          title,
          tier,
          jaMeaning: ja || word,
          jaKana: ja || word,
          jaTitle: title,
          phonetic: `/${word.toLowerCase()}/`,
          baseCost: cost,
          basePps: pps,
          desc: `${title}. Produces ${pps} AP/s.`,
          jaDesc: `${ja || word}。毎秒${pps} APを生み出す。`,
          actionVerb: "STRIKE",
          jaVerb: "攻撃する",
          fact,
          jaFact: fact,
          svg: this.getGenericBeastSvg()
        });

        this.renderRoster();
        this.saveGame();
        alert(`Added ${word} successfully!`);
      });

      document.getElementById("resetVocabBtn").addEventListener("click", () => {
        if (confirm("Reset all vocabulary back to the default list?")) {
          this.animals = JSON.parse(JSON.stringify(window.APEX_DEFAULT_ANIMALS));
          this.renderRoster();
          this.saveGame();
          alert("Reset vocabulary to default.");
        }
      });
    } else if (tab === "student") {
      container.innerHTML = `
        <div style="background:rgba(0,240,255,0.08); border:1px solid var(--border-neon); border-radius:6px; padding:12px; margin-bottom:8px;">
          <h4 style="color:var(--cyan-glow); font-size:0.85rem; margin-bottom:6px; letter-spacing:1px;">🛡️ KEYBOARD PROTECTION & AI BOT SETTINGS</h4>
          <p style="font-size:0.75rem; color:var(--text-dim); margin-bottom:10px;">
            To prevent students from violently smashing the tablet's physical spacebar, you can customize the AI Auto-Strike speed or enable continuous hands-free mode.
          </p>
          <div style="display:flex; flex-direction:column; gap:8px;">
            <label style="display:flex; align-items:center; gap:8px; font-size:0.8rem; cursor:pointer; color:#fff;">
              <input type="checkbox" id="infiniteAiToggle" ${this.infiniteAiMode ? "checked" : ""}>
              <span><strong>Infinite AI Mode (No Cooldown)</strong> - Runs continuously to keep hands off the keyboard!</span>
            </label>
            <div style="display:flex; align-items:center; gap:10px; font-size:0.8rem; margin-top:4px;">
              <span style="color:var(--text-dim);">AI Firing Speed:</span>
              <select id="aiSpeedSelect" class="teacher-select" style="padding:4px 8px;">
                <option value="25" ${this.aiClicksPerSecond === 25 ? "selected" : ""}>25 Clicks/sec (Fast)</option>
                <option value="35" ${this.aiClicksPerSecond === 35 ? "selected" : ""}>35 Clicks/sec (Superhuman Default)</option>
                <option value="50" ${this.aiClicksPerSecond === 50 ? "selected" : ""}>50 Clicks/sec (Ludicrous Gatling)</option>
              </select>
            </div>
          </div>
        </div>

        <div style="background:rgba(255,230,0,0.08); border:1px solid rgba(255,230,0,0.3); border-radius:6px; padding:12px; margin-bottom:8px;">
          <h4 style="color:var(--gold); font-size:0.85rem; margin-bottom:6px; letter-spacing:1px;">🔊 AUDIO & SPEECH DIAGNOSTICS</h4>
          <p style="font-size:0.75rem; color:var(--text-dim); margin-bottom:8px;">
            Test sound effects, procedural animal sounds, and text-to-speech pronunciation:
          </p>
          <div class="teacher-actions">
            <button id="testAudioTeacherBtn" class="btn-primary">⚡ Test Sound & Voice</button>
            <button id="reunlockAudioBtn" class="btn-secondary">🎧 Force Re-Unlock Audio</button>
          </div>
        </div>

        <div style="border:1px solid var(--border-dim); border-radius:6px; padding:12px;">
          <h4 style="color:var(--text-main); font-size:0.85rem; margin-bottom:6px; letter-spacing:1px;">💎 STUDENT BALANCE & REWARDS</h4>
          <p style="font-size:0.75rem; color:var(--text-dim); margin-bottom:8px;">
            Quickly grant points to reward the student, or reset for a fresh class run:
          </p>
          <div class="teacher-actions">
            <button id="give10kBtn" class="btn-secondary">+ Give 10,000 AP (Starter)</button>
            <button id="give1mBtn" class="btn-secondary">+ Give 1,000,000 AP (Predator)</button>
            <button id="give100mBtn" class="btn-secondary">+ Give 100,000,000 AP (Titan)</button>
            <button id="wipeSaveBtn" class="btn-danger">⚠ Reset Student Save File</button>
          </div>
        </div>
      `;

      // AI Settings Listeners
      document.getElementById("infiniteAiToggle").addEventListener("change", (e) => {
        this.infiniteAiMode = e.target.checked;
        this.saveGame();
      });

      document.getElementById("aiSpeedSelect").addEventListener("change", (e) => {
        this.aiClicksPerSecond = parseInt(e.target.value, 10);
        this.dom.aiBotStatus.textContent = `READY // ${this.aiClicksPerSecond} CLICKS/SEC`;
        this.saveGame();
      });

      // Audio Diagnostic Listeners
      document.getElementById("testAudioTeacherBtn").addEventListener("click", () => {
        this.audio.testAudio();
      });

      document.getElementById("reunlockAudioBtn").addEventListener("click", () => {
        this.audio.unlock();
        this.audio.playUpgrade();
        alert("Audio context re-unlocked!");
      });

      // Balance Listeners
      document.getElementById("give10kBtn").addEventListener("click", () => {
        this.points += 10000;
        this.updateStatsDisplay();
      });
      document.getElementById("give1mBtn").addEventListener("click", () => {
        this.points += 1000000;
        this.updateStatsDisplay();
      });
      document.getElementById("give100mBtn").addEventListener("click", () => {
        this.points += 100000000;
        this.updateStatsDisplay();
      });
      document.getElementById("wipeSaveBtn").addEventListener("click", () => {
        if (confirm("Are you sure you want to completely erase the student's progress?")) {
          localStorage.removeItem("APEX_BEAST_SAVE");
          location.reload();
        }
      });
    } else if (tab === "backup") {
      const jsonSave = JSON.stringify(this.serializeGame(), null, 2);
      container.innerHTML = `
        <div class="teacher-form-group">
          <label class="teacher-label">Export / Import Save Data (JSON)</label>
          <textarea id="saveExportText" class="teacher-textarea" rows="8">${jsonSave}</textarea>
        </div>
        <div class="teacher-actions">
          <button id="copyJsonBtn" class="btn-primary">📋 Copy JSON to Clipboard</button>
          <button id="importJsonBtn" class="btn-secondary">📥 Import from Textarea</button>
        </div>
      `;

      document.getElementById("copyJsonBtn").addEventListener("click", () => {
        const text = document.getElementById("saveExportText").value;
        navigator.clipboard.writeText(text);
        alert("Copied save JSON to clipboard!");
      });

      document.getElementById("importJsonBtn").addEventListener("click", () => {
        try {
          const raw = document.getElementById("saveExportText").value;
          const parsed = JSON.parse(raw);
          this.deserializeGame(parsed);
          this.renderRoster();
          this.renderUpgrades();
          this.updateStatsDisplay();
          alert("Imported save data successfully!");
        } catch (e) {
          alert("Invalid JSON data!");
        }
      });
    }
  }

  getGenericBeastSvg() {
    return `<svg viewBox="0 0 100 100" class="beast-vector">
      <polygon points="50,15 85,45 70,85 30,85 15,45" fill="#15202e" stroke="#00f0ff" stroke-width="3"/>
      <circle cx="40" cy="50" r="5" fill="#ff0055"/>
      <circle cx="60" cy="50" r="5" fill="#ff0055"/>
      <polygon points="50,65 56,75 44,75" fill="#ffe600"/>
    </svg>`;
  }

  // --------------------------------------------------------------------------
  // Save & Load
  // --------------------------------------------------------------------------
  serializeGame() {
    return {
      points: this.points,
      totalPointsEarned: this.totalPointsEarned,
      totalClicks: this.totalClicks,
      spacebarClicks: this.spacebarClicks,
      ownedAnimals: this.ownedAnimals,
      purchasedUpgrades: Array.from(this.purchasedUpgrades),
      selectedAnimalId: this.selectedAnimalId,
      animals: this.animals,
      showJapanese: this.showJapanese,
      infiniteAiMode: this.infiniteAiMode,
      aiClicksPerSecond: this.aiClicksPerSecond
    };
  }

  deserializeGame(data) {
    if (!data) return;
    this.points = data.points || 0;
    this.totalPointsEarned = data.totalPointsEarned || 0;
    this.totalClicks = data.totalClicks || 0;
    this.spacebarClicks = data.spacebarClicks || 0;
    this.ownedAnimals = data.ownedAnimals || {};
    this.purchasedUpgrades = new Set(data.purchasedUpgrades || []);
    this.selectedAnimalId = data.selectedAnimalId || "dog";
    if (data.animals && Array.isArray(data.animals)) {
      this.animals = data.animals;
    }
    if (data.showJapanese !== undefined) {
      this.showJapanese = data.showJapanese;
    }
    if (data.infiniteAiMode !== undefined) {
      this.infiniteAiMode = data.infiniteAiMode;
    }
    if (data.aiClicksPerSecond !== undefined) {
      this.aiClicksPerSecond = data.aiClicksPerSecond;
    }
  }

  saveGame() {
    try {
      localStorage.setItem("APEX_BEAST_SAVE", JSON.stringify(this.serializeGame()));
    } catch (e) {
      console.warn("Save failed:", e);
    }
  }

  loadGame() {
    try {
      const raw = localStorage.getItem("APEX_BEAST_SAVE");
      if (raw) {
        this.deserializeGame(JSON.parse(raw));
      }
    } catch (e) {
      console.warn("Load failed:", e);
    }
  }

  // --------------------------------------------------------------------------
  // UI Display Helpers & Number Formatting
  // --------------------------------------------------------------------------
  updateStatsDisplay() {
    this.dom.pointsDisplay.textContent = this.formatNumber(Math.floor(this.points));
    this.dom.ppsDisplay.innerHTML = `
      ${this.formatNumber(this.pointsPerSecond)} / sec
      <span class="ja-inline ja-text" style="font-size:0.75rem; color:#00f0ff; margin-left:4px;">(毎秒)</span>
    `;

    // Update Player Rank with Japanese translation
    const currentRank = this.calculateRank();
    this.dom.rankTitle.innerHTML = `
      ${currentRank.title}
      <span class="ja-text" style="color:#00f0ff; font-size:0.85rem; margin-left:6px; font-weight:700;">(${currentRank.jaTitle || ""})</span>
    `;
    this.dom.rankBadge.textContent = currentRank.badge;
  }

  calculateRank() {
    const ranks = window.APEX_RANKS || [];
    let cur = ranks[0];
    for (let i = 0; i < ranks.length; i++) {
      if (this.totalPointsEarned >= ranks[i].threshold) {
        cur = ranks[i];
      }
    }
    return cur;
  }

  formatNumber(num) {
    if (num === null || num === undefined || isNaN(num)) return "0";
    if (num < 1000) return Math.floor(num).toLocaleString();

    const suffixes = [
      { v: 1e15, s: " QUAD" },
      { v: 1e12, s: " TRILLION" },
      { v: 1e9, s: " BILLION" },
      { v: 1e6, s: " MILLION" },
      { v: 1e3, s: "K" }
    ];

    for (let i = 0; i < suffixes.length; i++) {
      if (num >= suffixes[i].v) {
        const val = num / suffixes[i].v;
        return (val >= 100 ? Math.floor(val) : val.toFixed(1)) + suffixes[i].s;
      }
    }
    return Math.floor(num).toLocaleString();
  }

  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
}

// Start game when page loads
window.addEventListener("DOMContentLoaded", () => {
  window.game = new ApexBeastGame();
});
