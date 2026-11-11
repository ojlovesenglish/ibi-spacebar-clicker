// ============================================================================
// APEX BEAST: English Vocabulary Clicker
// Vocabulary & Game Data Configuration (Complete English + Japanese Bilingual)
// ============================================================================
// Teachers: You can edit or add new animals, upgrades, and vocabulary words below.
// Each animal represents a purchasable unit that produces Animal Power (AP) per second.
// Tier 1: Basic English Animals (Foundational 3-4 letter words)
// Tier 2: Intermediate English Animals (Common wild & predator animals)
// Tier 3: Advanced & Exotic Animals (Apex predators & mythic beasts)
// ============================================================================

const DEFAULT_ANIMALS = [
  // --------------------------------------------------------------------------
  // TIER 1: RECON SQUAD (Basic English Animals / レベル1: 基本の動物)
  // --------------------------------------------------------------------------
  {
    id: "dog",
    word: "DOG",
    title: "Cyber Hound",
    tier: 1,
    phonetic: "/dɔːɡ/",
    jaMeaning: "犬 (いぬ)",
    jaKana: "ドッグ",
    jaTitle: "サイバーハウンド (番犬)",
    category: "Canine",
    baseCost: 15,
    basePps: 1,
    desc: "Loyal scout hound. High reflex barks generate steady power.",
    jaDesc: "忠実な偵察犬。すばやい吠え声で安定したパワーを生み出す。",
    actionVerb: "BARK",
    jaVerb: "吠える (ほえる)",
    fact: "Dogs have an extraordinary sense of smell — up to 100,000 times stronger than humans!",
    jaFact: "犬の嗅覚（きゅうかく）は人間の最大10万倍すぐれています！",
    color: "#00f0ff",
    svg: `<svg viewBox="0 0 100 100" class="beast-vector">
      <path d="M25 35 L35 15 L45 30 L55 30 L65 15 L75 35 L70 65 L50 78 L30 65 Z" fill="#122533" stroke="#00f0ff" stroke-width="3" stroke-linejoin="round"/>
      <polygon points="35,15 25,35 38,32" fill="#00f0ff" opacity="0.6"/>
      <polygon points="65,15 75,35 62,32" fill="#00f0ff" opacity="0.6"/>
      <polygon points="36,44 44,48 37,52" fill="#00f0ff"/>
      <polygon points="64,44 56,48 63,52" fill="#00f0ff"/>
      <polygon points="46,62 54,62 50,68" fill="#ff0055"/>
      <line x1="50" y1="68" x2="50" y2="74" stroke="#ff0055" stroke-width="2"/>
      <path d="M42 74 Q50 78 58 74" fill="none" stroke="#00f0ff" stroke-width="2"/>
      <circle cx="50" cy="50" r="3" fill="#00f0ff"/>
    </svg>`
  },
  {
    id: "cat",
    word: "CAT",
    title: "Shadow Prowler",
    tier: 1,
    phonetic: "/kæt/",
    jaMeaning: "猫 (ねこ)",
    jaKana: "キャット",
    jaTitle: "シャドウプロウラー (黒猫)",
    category: "Feline",
    baseCost: 100,
    basePps: 5,
    desc: "Silent cyber-feline. Stalks undetected through dark alleyways.",
    jaDesc: "足音を立てないサイバー猫。暗がりから静かに忍び寄る。",
    actionVerb: "POUNCE",
    jaVerb: "飛びかかる",
    fact: "Cats can jump up to six times their height in a single leap!",
    jaFact: "猫は自分の背丈の約6倍の高さまでジャンプできます！",
    color: "#b026ff",
    svg: `<svg viewBox="0 0 100 100" class="beast-vector">
      <path d="M20 20 L35 40 L65 40 L80 20 L75 55 L50 82 L25 55 Z" fill="#1e1233" stroke="#b026ff" stroke-width="3" stroke-linejoin="round"/>
      <polygon points="20,20 35,40 26,42" fill="#b026ff" opacity="0.7"/>
      <polygon points="80,20 65,40 74,42" fill="#b026ff" opacity="0.7"/>
      <path d="M32 48 Q40 44 44 50 Q36 54 32 48" fill="#00ff88"/>
      <line x1="38" y1="45" x2="38" y2="52" stroke="#0a0c13" stroke-width="2"/>
      <path d="M68 48 Q60 44 56 50 Q64 54 68 48" fill="#00ff88"/>
      <line x1="62" y1="45" x2="62" y2="52" stroke="#0a0c13" stroke-width="2"/>
      <polygon points="47,62 53,62 50,66" fill="#ff0055"/>
      <line x1="22" y1="60" x2="38" y2="62" stroke="#b026ff" stroke-width="2"/>
      <line x1="20" y1="68" x2="38" y2="66" stroke="#b026ff" stroke-width="2"/>
      <line x1="78" y1="60" x2="62" y2="62" stroke="#b026ff" stroke-width="2"/>
      <line x1="80" y1="68" x2="62" y2="66" stroke="#b026ff" stroke-width="2"/>
    </svg>`
  },
  {
    id: "bird",
    word: "BIRD",
    title: "Sky Scout",
    tier: 1,
    phonetic: "/bɜːrd/",
    jaMeaning: "鳥 (とり)",
    jaKana: "バード",
    jaTitle: "スカイスカウト (偵察鳥)",
    category: "Avian",
    baseCost: 500,
    basePps: 20,
    desc: "Light reconnaissance avian unit with sonic radar wings.",
    jaDesc: "超音波レーダーの翼を持つ、軽快な空中偵察ユニット。",
    actionVerb: "FLY",
    jaVerb: "飛ぶ (とぶ)",
    fact: "Birds have hollow bones which make them lightweight enough for supersonic flight!",
    jaFact: "鳥の骨の中は空洞になっていて、空を飛ぶためにとても軽いです！",
    color: "#00e5ff",
    svg: `<svg viewBox="0 0 100 100" class="beast-vector">
      <path d="M50 15 L65 35 L88 38 L65 52 L75 80 L50 65 L25 80 L35 52 L12 38 L35 35 Z" fill="#0e2330" stroke="#00e5ff" stroke-width="3" stroke-linejoin="round"/>
      <polygon points="50,15 56,32 44,32" fill="#00e5ff"/>
      <polygon points="50,38 60,48 50,58 40,48" fill="#ffaa00"/>
      <polygon points="46,42 54,42 50,56" fill="#ffd000"/>
      <circle cx="43" cy="36" r="3" fill="#ff0055"/>
      <circle cx="57" cy="36" r="3" fill="#ff0055"/>
      <line x1="20" y1="42" x2="35" y2="48" stroke="#00e5ff" stroke-width="2"/>
      <line x1="80" y1="42" x2="65" y2="48" stroke="#00e5ff" stroke-width="2"/>
    </svg>`
  },
  {
    id: "fish",
    word: "FISH",
    title: "Hydro Dart",
    tier: 1,
    phonetic: "/fɪʃ/",
    jaMeaning: "魚 (さかな)",
    jaKana: "フィッシュ",
    jaTitle: "ハイドロダート (魚雷魚)",
    category: "Aquatic",
    baseCost: 1800,
    basePps: 70,
    desc: "High-velocity hydro-glider capable of deep water currents.",
    jaDesc: "深海の流れを猛スピードで泳ぎ抜ける水中グライダー。",
    actionVerb: "SWIM",
    jaVerb: "泳ぐ (およぐ)",
    fact: "Fish use specialized gill organs to breathe oxygen directly underwater!",
    jaFact: "魚はエラを使って水中の酸素を吸って呼吸しています！",
    color: "#00ffaa",
    svg: `<svg viewBox="0 0 100 100" class="beast-vector">
      <path d="M15 50 Q35 25 70 35 L88 20 L80 50 L88 80 L70 65 Q35 75 15 50 Z" fill="#0a2a22" stroke="#00ffaa" stroke-width="3" stroke-linejoin="round"/>
      <polygon points="45,30 58,15 62,32" fill="#00ffaa" opacity="0.6"/>
      <circle cx="30" cy="46" r="5" fill="#0a0c13" stroke="#00ffaa" stroke-width="2"/>
      <circle cx="30" cy="46" r="2" fill="#ffaa00"/>
      <path d="M45 40 Q52 50 45 60" fill="none" stroke="#00ffaa" stroke-width="2"/>
      <path d="M55 38 Q62 50 55 62" fill="none" stroke="#00ffaa" stroke-width="2"/>
      <line x1="68" y1="42" x2="80" y2="46" stroke="#00ffaa" stroke-width="2"/>
      <line x1="68" y1="58" x2="80" y2="54" stroke="#00ffaa" stroke-width="2"/>
    </svg>`
  },
  {
    id: "frog",
    word: "FROG",
    title: "Toxic Hopper",
    tier: 1,
    phonetic: "/frɔːɡ/",
    jaMeaning: "蛙 (かえる)",
    jaKana: "フロッグ",
    jaTitle: "トキシックホッパー (毒蛙)",
    category: "Amphibian",
    baseCost: 6500,
    basePps: 220,
    desc: "Bio-luminescent amphibian equipped with kinetic leap coils.",
    jaDesc: "強力なジャンプ力と蛍光色のバイオ毒を持つ両生類。",
    actionVerb: "JUMP",
    jaVerb: "跳ぶ (とぶ・ジャンプ)",
    fact: "Some poison dart frogs have enough venom to defeat 10 predators with one touch!",
    jaFact: "ヤドクガエルは1匹で10匹の敵をたおせるほど強い毒を持っています！",
    color: "#39ff14",
    svg: `<svg viewBox="0 0 100 100" class="beast-vector">
      <path d="M30 45 Q50 30 70 45 Q85 65 75 80 Q50 88 25 80 Q15 65 30 45 Z" fill="#142e12" stroke="#39ff14" stroke-width="3"/>
      <circle cx="35" cy="35" r="14" fill="#0d200c" stroke="#39ff14" stroke-width="3"/>
      <circle cx="65" cy="35" r="14" fill="#0d200c" stroke="#39ff14" stroke-width="3"/>
      <circle cx="35" cy="35" r="7" fill="#ffe600"/>
      <circle cx="65" cy="35" r="7" fill="#ffe600"/>
      <line x1="32" y1="35" x2="38" y2="35" stroke="#0a0c13" stroke-width="3"/>
      <line x1="62" y1="35" x2="68" y2="35" stroke="#0a0c13" stroke-width="3"/>
      <circle cx="45" cy="55" r="4" fill="#39ff14"/>
      <circle cx="58" cy="62" r="5" fill="#39ff14"/>
      <circle cx="38" cy="68" r="3" fill="#39ff14"/>
      <path d="M36 74 Q50 82 64 74" fill="none" stroke="#39ff14" stroke-width="2"/>
    </svg>`
  },

  // --------------------------------------------------------------------------
  // TIER 2: PREDATOR STRIKE (Intermediate Wild Animals / レベル2: 野生・肉食獣)
  // --------------------------------------------------------------------------
  {
    id: "wolf",
    word: "WOLF",
    title: "Frost Fang",
    tier: 2,
    phonetic: "/wʊlf/",
    jaMeaning: "狼 (おおかみ)",
    jaKana: "ウルフ",
    jaTitle: "フロストファング (氷牙狼)",
    category: "Predator",
    baseCost: 24000,
    basePps: 680,
    desc: "Apex pack hunter. Telepathic howl coordinates squad attacks.",
    jaDesc: "群れを率いる頂点ハンター。遠吠えで仲間と連携して攻撃する。",
    actionVerb: "HOWL",
    jaVerb: "遠吠えする (とおぼえ)",
    fact: "Wolves can run up to 38 miles per hour and communicate over miles with a single howl!",
    jaFact: "狼は時速60kmで走り、遠吠えは何キロ先までも届きます！",
    color: "#64b5f6",
    svg: `<svg viewBox="0 0 100 100" class="beast-vector">
      <path d="M22 25 L38 35 L42 12 L50 28 L58 12 L62 35 L78 25 L68 55 L50 85 L32 55 Z" fill="#141e2e" stroke="#64b5f6" stroke-width="3" stroke-linejoin="round"/>
      <polygon points="42,12 36,36 46,32" fill="#64b5f6" opacity="0.8"/>
      <polygon points="58,12 64,36 54,32" fill="#64b5f6" opacity="0.8"/>
      <polygon points="36,46 44,48 38,54" fill="#00f3ff"/>
      <polygon points="64,46 56,48 62,54" fill="#00f3ff"/>
      <polygon points="46,65 54,65 50,72" fill="#0a0c13" stroke="#64b5f6" stroke-width="2"/>
      <polygon points="44,72 47,80 49,72" fill="#ffffff"/>
      <polygon points="56,72 53,80 51,72" fill="#ffffff"/>
      <line x1="50" y1="40" x2="50" y2="60" stroke="#64b5f6" stroke-width="2"/>
    </svg>`
  },
  {
    id: "bear",
    word: "BEAR",
    title: "Grizzly Brawler",
    tier: 2,
    phonetic: "/ber/",
    jaMeaning: "熊 (くま)",
    jaKana: "ベアー",
    jaTitle: "グリズリーブロウラー (巨熊)",
    category: "Heavy Predator",
    baseCost: 85000,
    basePps: 2100,
    desc: "Colossal frontline heavy unit. Crushes defensive barriers with claw strikes.",
    jaDesc: "巨大な前線重戦士。鋭い爪の一撃で強固な防壁も粉砕する。",
    actionVerb: "SMASH",
    jaVerb: "叩き壊す (粉砕)",
    fact: "A grizzly bear's bite force can shatter an iron bowling ball!",
    jaFact: "グリズリーの噛む力はボウリングの球を砕くほど強烈です！",
    color: "#ff9100",
    svg: `<svg viewBox="0 0 100 100" class="beast-vector">
      <circle cx="28" cy="28" r="14" fill="#2d1708" stroke="#ff9100" stroke-width="3"/>
      <circle cx="72" cy="28" r="14" fill="#2d1708" stroke="#ff9100" stroke-width="3"/>
      <path d="M25 40 L75 40 L85 65 L70 88 L30 88 L15 65 Z" fill="#201107" stroke="#ff9100" stroke-width="3"/>
      <ellipse cx="50" cy="65" rx="18" ry="14" fill="#3a1e0b" stroke="#ff9100" stroke-width="2"/>
      <polygon points="44,60 56,60 50,68" fill="#ff9100"/>
      <rect x="34" y="44" width="8" height="6" fill="#ffe600"/>
      <rect x="58" y="44" width="8" height="6" fill="#ffe600"/>
      <line x1="68" y1="52" x2="78" y2="72" stroke="#ff0055" stroke-width="3"/>
      <line x1="72" y1="50" x2="82" y2="70" stroke="#ff0055" stroke-width="3"/>
    </svg>`
  },
  {
    id: "snake",
    word: "SNAKE",
    title: "Viper Coil",
    tier: 2,
    phonetic: "/sneɪk/",
    jaMeaning: "蛇 (へび)",
    jaKana: "スネーク",
    jaTitle: "ヴァイパーコイル (毒蛇)",
    category: "Reptile",
    baseCost: 280000,
    basePps: 5800,
    desc: "Sub-surface stealth viper. Injects paralyzing neurotoxins in milliseconds.",
    jaDesc: "音もなく近づくステルス蛇。一瞬で強力な神経毒を撃ち込む。",
    actionVerb: "STRIKE",
    jaVerb: "攻撃する (奇襲)",
    fact: "Snakes smell through the air by tasting particles with their forked tongues!",
    jaFact: "蛇は二又に分かれた舌で空気中のにおいを感じ取っています！",
    color: "#00ff66",
    svg: `<svg viewBox="0 0 100 100" class="beast-vector">
      <path d="M50 15 L75 35 L65 55 L75 75 L50 88 L25 75 L35 55 L25 35 Z" fill="#0d2616" stroke="#00ff66" stroke-width="3"/>
      <path d="M25 35 Q10 48 20 62 L32 54" fill="#00ff66" opacity="0.4"/>
      <path d="M75 35 Q90 48 80 62 L68 54" fill="#00ff66" opacity="0.4"/>
      <polygon points="40,38 46,42 42,46" fill="#ff0055"/>
      <polygon points="60,38 54,42 58,46" fill="#ff0055"/>
      <path d="M50 68 L50 84 L44 92 M50 84 L56 92" fill="none" stroke="#ff0055" stroke-width="3"/>
      <polygon points="44,64 47,72 49,64" fill="#ffffff"/>
      <polygon points="56,64 53,72 51,64" fill="#ffffff"/>
    </svg>`
  },
  {
    id: "shark",
    word: "SHARK",
    title: "Ocean Apex",
    tier: 2,
    phonetic: "/ʃɑːrk/",
    jaMeaning: "鮫 (さめ)",
    jaKana: "シャーク",
    jaTitle: "オーシャンエイペックス (海洋覇者)",
    category: "Aquatic Apex",
    baseCost: 950000,
    basePps: 16000,
    desc: "Undisputed oceanic sovereign. Senses electrical brainwaves across entire oceans.",
    jaDesc: "海の頂点捕食者。獲物のわずかな生体電気を遠くから察知する。",
    actionVerb: "BITE",
    jaVerb: "噛みつく (かみつく)",
    fact: "Sharks have existed for over 400 million years — older than trees and dinosaurs!",
    jaFact: "サメは恐竜や木よりも古い、4億年以上前から地球に生きています！",
    color: "#00d4ff",
    svg: `<svg viewBox="0 0 100 100" class="beast-vector">
      <path d="M50 10 L62 35 L90 55 L65 65 L75 90 L50 75 L25 90 L35 65 L10 55 L38 35 Z" fill="#0a1c2e" stroke="#00d4ff" stroke-width="3" stroke-linejoin="round"/>
      <polygon points="50,10 60,32 50,38 40,32" fill="#00d4ff"/>
      <line x1="38" y1="52" x2="42" y2="60" stroke="#00d4ff" stroke-width="2"/>
      <line x1="44" y1="50" x2="48" y2="58" stroke="#00d4ff" stroke-width="2"/>
      <line x1="56" y1="50" x2="52" y2="58" stroke="#00d4ff" stroke-width="2"/>
      <line x1="62" y1="52" x2="58" y2="60" stroke="#00d4ff" stroke-width="2"/>
      <circle cx="34" cy="45" r="4" fill="#ff0055"/>
      <circle cx="66" cy="45" r="4" fill="#ff0055"/>
      <polygon points="44,66 47,72 50,66 53,72 56,66" fill="#ffffff"/>
    </svg>`
  },
  {
    id: "eagle",
    word: "EAGLE",
    title: "Thunder Talon",
    tier: 2,
    phonetic: "/ˈiː.ɡəl/",
    jaMeaning: "鷲 (わし)",
    jaKana: "イーグル",
    jaTitle: "サンダータロン (雷光の猛禽)",
    category: "Sky Monarch",
    baseCost: 3200000,
    basePps: 42000,
    desc: "High-altitude interceptor. Dives at lightning velocity with titanium talons.",
    jaDesc: "大空を支配する迎撃鳥。雷のようなスピードで急降下し爪で仕留める。",
    actionVerb: "SOAR",
    jaVerb: "空高く飛ぶ (舞い上がる)",
    fact: "An eagle's vision is 4 to 8 times stronger than an average human with 20/20 sight!",
    jaFact: "ワシの視力は人間の4〜8倍も良く、数キロ先の獲物を見つけられます！",
    color: "#ffd600",
    svg: `<svg viewBox="0 0 100 100" class="beast-vector">
      <path d="M50 15 L72 35 L95 40 L70 58 L85 88 L50 72 L15 88 L30 58 L5 40 L28 35 Z" fill="#292205" stroke="#ffd600" stroke-width="3" stroke-linejoin="round"/>
      <polygon points="50,15 58,35 50,42 42,35" fill="#ffd600"/>
      <polygon points="36,40 44,42 40,46" fill="#00f3ff"/>
      <polygon points="64,40 56,42 60,46" fill="#00f3ff"/>
      <path d="M44 48 L56 48 L54 62 Q50 72 46 64 Z" fill="#ffd600" stroke="#ff9100" stroke-width="2"/>
      <line x1="20" y1="48" x2="32" y2="52" stroke="#ffd600" stroke-width="2"/>
      <line x1="80" y1="48" x2="68" y2="52" stroke="#ffd600" stroke-width="2"/>
    </svg>`
  },
  {
    id: "tiger",
    word: "TIGER",
    title: "Laser Striker",
    tier: 2,
    phonetic: "/ˈtaɪ.ɡər/",
    jaMeaning: "虎 (とら)",
    jaKana: "タイガー",
    jaTitle: "レーザーストライカー (密林の猛虎)",
    category: "Apex Feline",
    baseCost: 11000000,
    basePps: 115000,
    desc: "Ferocious jungle assassin. Illuminated neon stripes scramble enemy targeting.",
    jaDesc: "密林の暗殺猛獣。発光するシマ模様で敵の照準を狂わせる。",
    actionVerb: "HUNT",
    jaVerb: "狩る (かる)",
    fact: "No two tigers have the same stripes — each pattern is completely unique like a fingerprint!",
    jaFact: "トラの縞模様（しまもよう）は指紋のように、1頭1頭すべて違います！",
    color: "#ff5500",
    svg: `<svg viewBox="0 0 100 100" class="beast-vector">
      <path d="M20 22 L36 34 L64 34 L80 22 L76 56 L50 86 L24 56 Z" fill="#2a1204" stroke="#ff5500" stroke-width="3" stroke-linejoin="round"/>
      <polygon points="50,22 46,38 54,38" fill="#ffaa00"/>
      <polygon points="28,42 38,45 28,48" fill="#ff5500"/>
      <polygon points="72,42 62,45 72,48" fill="#ff5500"/>
      <polygon points="26,54 36,56 28,60" fill="#ff5500"/>
      <polygon points="74,54 64,56 72,60" fill="#ff5500"/>
      <polygon points="34,44 42,46 36,52" fill="#00ffcc"/>
      <polygon points="66,44 58,46 64,52" fill="#00ffcc"/>
      <polygon points="46,64 54,64 50,70" fill="#ff0055"/>
      <polygon points="42,70 45,78 47,70" fill="#ffffff"/>
      <polygon points="58,70 55,78 53,70" fill="#ffffff"/>
    </svg>`
  },
  {
    id: "lion",
    word: "LION",
    title: "Beast Monarch",
    tier: 2,
    phonetic: "/ˈlaɪ.ən/",
    jaMeaning: "獅子・ライオン",
    jaKana: "ライオン",
    jaTitle: "ビーストモナーク (百獣の王)",
    category: "Apex Sovereign",
    baseCost: 35000000,
    basePps: 310000,
    desc: "The King of Beasts. Its supersonic roar paralyzes all lesser creatures with fear.",
    jaDesc: "百獣の王。その超音速の咆哮はすべての敵の動きを止める。",
    actionVerb: "ROAR",
    jaVerb: "咆哮する (ほえる)",
    fact: "A lion's mighty roar can be heard from up to 5 miles (8 kilometers) away!",
    jaFact: "ライオンの強烈な雄叫びは、なんと約8キロメートル先まで届きます！",
    color: "#ffaa00",
    svg: `<svg viewBox="0 0 100 100" class="beast-vector">
      <path d="M50 8 L60 22 L78 12 L75 28 L92 28 L82 44 L95 55 L80 65 L88 80 L70 82 L65 95 L50 88 L35 95 L30 82 L12 80 L20 65 L5 55 L18 44 L8 28 L25 28 L22 12 L40 22 Z" fill="#2d1d03" stroke="#ffaa00" stroke-width="3" stroke-linejoin="round"/>
      <polygon points="32,40 68,40 64,72 50,82 36,72" fill="#170f03" stroke="#ffaa00" stroke-width="2"/>
      <polygon points="38,48 46,50 40,56" fill="#ffd700"/>
      <polygon points="62,48 54,50 60,56" fill="#ffd700"/>
      <polygon points="46,62 54,62 50,68" fill="#ff0055"/>
      <line x1="50" y1="68" x2="50" y2="76" stroke="#ffaa00" stroke-width="2"/>
    </svg>`
  },

  // --------------------------------------------------------------------------
  // TIER 3: APEX TITANS (Advanced & Exotic Animals / レベル3: 最強の巨獣)
  // --------------------------------------------------------------------------
  {
    id: "gorilla",
    word: "GORILLA",
    title: "Titan Primus",
    tier: 3,
    phonetic: "/ɡəˈrɪl.ə/",
    jaMeaning: "ゴリラ",
    jaKana: "ゴリラ",
    jaTitle: "タイタンプライマス (銀背の巨兵)",
    category: "Titan Beast",
    baseCost: 120000000,
    basePps: 890000,
    desc: "Massive cyber-enhanced silverback. Punches ground to trigger kinetic shockwaves.",
    jaDesc: "サイバー強化された大柄なシルバーバック。地面を叩いて衝撃波を起こす。",
    actionVerb: "SMASH",
    jaVerb: "叩きつける (強打)",
    fact: "Gorillas are exceptionally intelligent and share approximately 98% of their DNA with humans!",
    jaFact: "ゴリラは非常に賢く、人間とDNAが約98%も同じです！",
    color: "#9c27b0",
    svg: `<svg viewBox="0 0 100 100" class="beast-vector">
      <path d="M30 18 L70 18 L82 38 L88 72 L70 90 L30 90 L12 72 L18 38 Z" fill="#1b0e24" stroke="#9c27b0" stroke-width="3"/>
      <polygon points="38,18 62,18 58,32 42,32" fill="#9c27b0" opacity="0.6"/>
      <line x1="28" y1="42" x2="72" y2="42" stroke="#9c27b0" stroke-width="4"/>
      <rect x="34" y="46" width="8" height="6" fill="#ff0055"/>
      <rect x="58" y="46" width="8" height="6" fill="#ff0055"/>
      <ellipse cx="50" cy="62" rx="10" ry="6" fill="#0c0510" stroke="#9c27b0" stroke-width="2"/>
      <circle cx="46" cy="62" r="2.5" fill="#9c27b0"/>
      <circle cx="54" cy="62" r="2.5" fill="#9c27b0"/>
      <path d="M36 76 Q50 84 64 76" fill="none" stroke="#9c27b0" stroke-width="3"/>
    </svg>`
  },
  {
    id: "crocodile",
    word: "CROCODILE",
    title: "Armored Reaper",
    tier: 3,
    phonetic: "/ˈkrɒk.ə.daɪl/",
    jaMeaning: "鰐 (わに)",
    jaKana: "クロコダイル",
    jaTitle: "アーマードリーパー (古代重鰐)",
    category: "Ancient Predator",
    baseCost: 450000000,
    basePps: 2600000,
    desc: "Living dinosaur with armored scutes and the world's most devastating death-roll bite.",
    jaDesc: "重装甲の生きた恐竜。敵をデスロールで引き裂く地球最強のアゴを持つ。",
    actionVerb: "CLAMP",
    jaVerb: "挟み込む (噛み締め)",
    fact: "A crocodile's jaw clamping pressure is over 3,700 pounds per square inch!",
    jaFact: "ワニの噛む力は1平方インチあたり約1.6トンで動物界最強です！",
    color: "#00e676",
    svg: `<svg viewBox="0 0 100 100" class="beast-vector">
      <path d="M50 10 L70 30 L85 60 L60 85 L50 92 L40 85 L15 60 L30 30 Z" fill="#082012" stroke="#00e676" stroke-width="3"/>
      <polygon points="50,10 54,25 46,25" fill="#00e676"/>
      <polygon points="50,32 56,48 44,48" fill="#00e676"/>
      <polygon points="50,55 58,72 42,72" fill="#00e676"/>
      <circle cx="34" cy="42" r="6" fill="#ffe600"/>
      <circle cx="66" cy="42" r="6" fill="#ffe600"/>
      <line x1="34" y1="38" x2="34" y2="46" stroke="#000000" stroke-width="2"/>
      <line x1="66" y1="38" x2="66" y2="46" stroke="#000000" stroke-width="2"/>
      <polyline points="28,62 34,68 40,62 46,68 50,62 54,68 60,62 66,68 72,62" fill="none" stroke="#ffffff" stroke-width="2"/>
    </svg>`
  },
  {
    id: "rhino",
    word: "RHINO",
    title: "Heavy Juggernaut",
    tier: 3,
    phonetic: "/ˈraɪ.noʊ/",
    jaMeaning: "犀 (さい)",
    jaKana: "ライノ",
    jaTitle: "ヘビージャガーノート (鉄壁の角)",
    category: "Armored Titan",
    baseCost: 1500000000,
    basePps: 7800000,
    desc: "Armored battering ram. Reinforced horn charges obliterate reinforced steel gates.",
    jaDesc: "装甲の破城槌。頑丈な巨大角の突進は鋼鉄の防壁をも吹き飛ばす。",
    actionVerb: "CHARGE",
    jaVerb: "突進する (とっしん)",
    fact: "A rhinoceros horn is composed purely of keratin — the exact same protein as human fingernails!",
    jaFact: "サイの角は骨ではなく、人間の爪と同じ成分（ケラチン）でできています！",
    color: "#78909c",
    svg: `<svg viewBox="0 0 100 100" class="beast-vector">
      <path d="M25 35 L40 20 L60 20 L75 35 L70 75 L50 88 L30 75 Z" fill="#1b242a" stroke="#78909c" stroke-width="3"/>
      <polygon points="50,22 58,58 42,58" fill="#00f3ff" stroke="#ffffff" stroke-width="2"/>
      <polygon points="50,60 55,70 45,70" fill="#00f3ff"/>
      <path d="M30 45 L42 50" stroke="#78909c" stroke-width="2"/>
      <path d="M70 45 L58 50" stroke="#78909c" stroke-width="2"/>
      <circle cx="34" cy="50" r="3.5" fill="#ff0055"/>
      <circle cx="66" cy="50" r="3.5" fill="#ff0055"/>
      <polygon points="40,20 32,10 44,15" fill="#78909c"/>
      <polygon points="60,20 68,10 56,15" fill="#78909c"/>
    </svg>`
  },
  {
    id: "falcon",
    word: "FALCON",
    title: "Mach Hyper-Wing",
    tier: 3,
    phonetic: "/ˈfæl.kən/",
    jaMeaning: "隼 (はやぶさ)",
    jaKana: "ファルコン",
    jaTitle: "マッハハイパーウィング (音速の鷹)",
    category: "Supersonic Avian",
    baseCost: 5200000000,
    basePps: 24000000,
    desc: "Fastest organism on Earth. Dives beyond 390 km/h with precision laser tracking.",
    jaDesc: "地球最速の生物。時速390km以上の急降下でターゲットを一撃で捉える。",
    actionVerb: "DIVE",
    jaVerb: "急降下する (きゅうこうか)",
    fact: "The peregrine falcon can dive at speeds exceeding 240 miles per hour (390 km/h)!",
    jaFact: "ハヤブサは獲物を捕まえるとき、新幹線より速い時速390kmで急降下します！",
    color: "#00e5ff",
    svg: `<svg viewBox="0 0 100 100" class="beast-vector">
      <path d="M50 10 L68 28 L98 24 L78 52 L92 90 L50 70 L8 90 L22 52 L2 24 L32 28 Z" fill="#061c28" stroke="#00e5ff" stroke-width="3" stroke-linejoin="round"/>
      <polygon points="50,10 57,32 43,32" fill="#00e5ff"/>
      <polygon points="46,38 54,38 50,56" fill="#ffaa00" stroke="#ffd000" stroke-width="1.5"/>
      <path d="M38 34 Q50 30 62 34 L58 40 Q50 36 42 40 Z" fill="#ff0055"/>
      <line x1="26" y1="44" x2="40" y2="50" stroke="#00e5ff" stroke-width="2"/>
      <line x1="74" y1="44" x2="60" y2="50" stroke="#00e5ff" stroke-width="2"/>
    </svg>`
  },
  {
    id: "octopus",
    word: "OCTOPUS",
    title: "Kraken Neural",
    tier: 3,
    phonetic: "/ˈɒk.tə.pəs/",
    jaMeaning: "蛸 (たこ)",
    jaKana: "オクトパス",
    jaTitle: "クラーケンニューラル (海魔)",
    category: "Cephalopod",
    baseCost: 19000000000,
    basePps: 76000000,
    desc: "Nine brains, three hearts. Color-shifting camouflage and tentacle multi-tasking.",
    jaDesc: "9つの脳と3つの心臓。変色迷彩と8本の触手で同時に複数の獲物を制圧する。",
    actionVerb: "GRASP",
    jaVerb: "つかみ取る (捕縛)",
    fact: "Octopuses have blue blood, 3 hearts, and each tentacle has its own independent mini-brain!",
    jaFact: "タコの血は青色で、心臓が3つ、8本の足それぞれに独立した脳があります！",
    color: "#e040fb",
    svg: `<svg viewBox="0 0 100 100" class="beast-vector">
      <path d="M30 40 Q25 15 50 15 Q75 15 70 40 Q75 55 50 60 Q25 55 30 40 Z" fill="#24072b" stroke="#e040fb" stroke-width="3"/>
      <path d="M35 58 Q20 70 12 90 Q22 88 32 72" fill="none" stroke="#e040fb" stroke-width="3"/>
      <path d="M42 60 Q32 75 28 94 Q38 88 44 72" fill="none" stroke="#e040fb" stroke-width="3"/>
      <path d="M50 60 Q50 80 50 96 Q56 86 54 70" fill="none" stroke="#e040fb" stroke-width="3"/>
      <path d="M58 60 Q68 75 72 94 Q62 88 56 72" fill="none" stroke="#e040fb" stroke-width="3"/>
      <path d="M65 58 Q80 70 88 90 Q78 88 68 72" fill="none" stroke="#e040fb" stroke-width="3"/>
      <ellipse cx="38" cy="45" rx="5" ry="3" fill="#00ffff"/>
      <ellipse cx="62" cy="45" rx="5" ry="3" fill="#00ffff"/>
      <line x1="34" y1="45" x2="42" y2="45" stroke="#000" stroke-width="2"/>
      <line x1="58" y1="45" x2="66" y2="45" stroke="#000" stroke-width="2"/>
    </svg>`
  },
  {
    id: "komodo-dragon",
    word: "KOMODO DRAGON",
    title: "Venom Drake",
    tier: 3,
    phonetic: "/kəˈmoʊ.doʊ ˈdræɡ.ən/",
    jaMeaning: "コモドオオトカゲ",
    jaKana: "コモドドラゴン",
    jaTitle: "ヴェノムドレイク (大蜥蜴)",
    category: "Apex Monitor",
    baseCost: 70000000000,
    basePps: 240000000,
    desc: "Earth's heaviest lizard. Anti-coagulant saliva and bone-crushing jaws.",
    jaDesc: "地球上最大のトカゲ。血液を固まらせない特殊な毒と強靭なアゴで仕留める。",
    actionVerb: "STALK",
    jaVerb: "忍び寄る (追跡)",
    fact: "Komodo dragons can grow up to 10 feet long (3 meters) and consume 80% of their body weight in one meal!",
    jaFact: "コモドドラゴンは全長3mにもなり、自分の体重の80%もの肉を一気に食べられます！",
    color: "#76ff03",
    svg: `<svg viewBox="0 0 100 100" class="beast-vector">
      <path d="M50 15 L78 30 L85 60 L65 85 L50 90 L35 85 L15 60 L22 30 Z" fill="#142605" stroke="#76ff03" stroke-width="3"/>
      <polygon points="50,15 58,35 50,42 42,35" fill="#76ff03" opacity="0.7"/>
      <polygon points="34,42 42,46 36,52" fill="#ffeb3b"/>
      <polygon points="66,42 58,46 64,52" fill="#ffeb3b"/>
      <path d="M50 68 L50 90 L42 98 M50 90 L58 98" fill="none" stroke="#ffeb3b" stroke-width="3"/>
      <circle cx="32" cy="60" r="3" fill="#76ff03"/>
      <circle cx="68" cy="60" r="3" fill="#76ff03"/>
    </svg>`
  },
  {
    id: "orca",
    word: "ORCA",
    title: "Abyssal Sovereign",
    tier: 3,
    phonetic: "/ˈɔːr.kə/",
    jaMeaning: "鯱・シャチ",
    jaKana: "オルカ",
    jaTitle: "アビサルソブリン (深海の王者)",
    category: "Ocean Ruler",
    baseCost: 260000000000,
    basePps: 800000000,
    desc: "Undisputed apex marine predator. Hunts blue whales and great whites in tactical formations.",
    jaDesc: "海の真の支配者。高い知能と連携フォーメーションで巨大クジラやサメをも圧倒する。",
    actionVerb: "BREACH",
    jaVerb: "跳び上がる (豪快ジャンプ)",
    fact: "Orcas are actually the largest member of the dolphin family and have no natural predators anywhere!",
    jaFact: "シャチは実はイルカの最大の仲間で、海に天敵がまったく存在しません！",
    color: "#ffffff",
    svg: `<svg viewBox="0 0 100 100" class="beast-vector">
      <path d="M50 12 L72 32 L92 55 L70 70 L80 92 L50 78 L20 92 L30 70 L8 55 L28 32 Z" fill="#080c14" stroke="#ffffff" stroke-width="3"/>
      <polygon points="50,12 62,38 50,46 38,38" fill="#ffffff"/>
      <ellipse cx="34" cy="46" rx="8" ry="4" fill="#ffffff" transform="rotate(-20 34 46)"/>
      <ellipse cx="66" cy="46" rx="8" ry="4" fill="#ffffff" transform="rotate(20 66 46)"/>
      <circle cx="34" cy="46" r="2.5" fill="#00f3ff"/>
      <circle cx="66" cy="46" r="2.5" fill="#00f3ff"/>
      <polygon points="44,66 56,66 50,78" fill="#ffffff"/>
    </svg>`
  },
  {
    id: "mammoth",
    word: "MAMMOTH",
    title: "Glacial Behemoth",
    tier: 3,
    phonetic: "/ˈmæm.əθ/",
    jaMeaning: "マンモス",
    jaKana: "マンモス",
    jaTitle: "グレイシャルビヒモス (氷河の巨獣)",
    category: "Ancient Titan",
    baseCost: 1000000000000,
    basePps: 2800000000,
    desc: "Resurrected ice-age Colossus. Twin curved tusk batteries shatter glaciers with seismic force.",
    jaDesc: "氷河期から蘇った巨像。巨大な湾曲した牙で氷山も粉砕する。",
    actionVerb: "TRAMPLE",
    jaVerb: "踏みつぶす (蹂躙)",
    fact: "Woolly mammoths lived alongside ancient humans and had curved tusks over 13 feet (4 meters) long!",
    jaFact: "マンモスの牙（きば）はなんと4メートル以上もあり、昔の人類と一緒に暮らしていました！",
    color: "#b0bec5",
    svg: `<svg viewBox="0 0 100 100" class="beast-vector">
      <path d="M30 25 Q50 10 70 25 L85 55 L72 82 L50 90 L28 82 L15 55 Z" fill="#1b1c20" stroke="#b0bec5" stroke-width="3"/>
      <path d="M32 35 Q50 25 68 35" fill="none" stroke="#b0bec5" stroke-width="2"/>
      <path d="M32 65 Q10 70 10 40 Q10 25 22 25" fill="none" stroke="#ffd000" stroke-width="4"/>
      <path d="M68 65 Q90 70 90 40 Q90 25 78 25" fill="none" stroke="#ffd000" stroke-width="4"/>
      <path d="M46 55 Q44 75 42 92 Q50 95 54 90 Q52 75 54 55" fill="#0d0e12" stroke="#b0bec5" stroke-width="2"/>
      <circle cx="36" cy="46" r="3.5" fill="#00f0ff"/>
      <circle cx="64" cy="46" r="3.5" fill="#00f0ff"/>
    </svg>`
  },
  {
    id: "dragon",
    word: "DRAGON",
    title: "Mythic Apex Prime",
    tier: 3,
    phonetic: "/ˈdræɡ.ən/",
    jaMeaning: "竜・ドラゴン",
    jaKana: "ドラゴン",
    jaTitle: "ミシックエイペックス (神話の頂点)",
    category: "Mythic Apex",
    baseCost: 5000000000000,
    basePps: 12000000000,
    desc: "The ultimate mythical apex predator. Plasma breath burns hotter than the core of a star.",
    jaDesc: "神話上の究極の頂点捕食者。超高熱のプラズマブレスはすべてを灰燼に帰す。",
    actionVerb: "INCINERATE",
    jaVerb: "焼き尽くす (消滅)",
    fact: "Dragons are the universal apex legend across every ancient human culture on Earth!",
    jaFact: "ドラゴンは世界中のほぼすべての古代文明に登場する最強の伝説の生物です！",
    color: "#ff0055",
    svg: `<svg viewBox="0 0 100 100" class="beast-vector">
      <path d="M50 15 L62 25 L82 8 L72 32 L94 28 L80 48 L96 65 L76 72 L85 92 L50 78 L15 92 L24 72 L4 65 L20 48 L6 28 L28 32 L18 8 L38 25 Z" fill="#2d0511" stroke="#ff0055" stroke-width="3" stroke-linejoin="round"/>
      <polygon points="18,8 24,25 15,22" fill="#ff0055"/>
      <polygon points="82,8 76,25 85,22" fill="#ff0055"/>
      <polygon points="50,15 56,32 44,32" fill="#ffe600"/>
      <polygon points="34,42 44,44 38,52" fill="#ffe600"/>
      <polygon points="66,42 56,44 62,52" fill="#ffe600"/>
      <polygon points="44,66 56,66 50,78" fill="#ffe600" stroke="#ff0055" stroke-width="2"/>
      <polygon points="42,66 45,72 47,66" fill="#ffffff"/>
      <polygon points="58,66 55,72 53,66" fill="#ffffff"/>
      <circle cx="50" cy="50" r="4" fill="#ff0055"/>
    </svg>`
  }
];

// ----------------------------------------------------------------------------
// UPGRADES & TACTICAL ARSENAL (Action Verbs, Adjectives & Tech Mods)
// ----------------------------------------------------------------------------
const DEFAULT_UPGRADES = [
  // ACTION VERBS (どうさの言葉・動詞)
  {
    id: "verb_bark",
    name: "BARK (Action Verb)",
    jaName: "BARK / ほえる (動詞)",
    target: "dog",
    multiplier: 2,
    cost: 100,
    desc: "Canine vocal strike. Dogs produce 2x power.",
    jaDesc: "犬の鳴き声攻撃。DOGの生産パワーが2倍！",
    wordCategory: "Verb",
    jaCategory: "動詞",
    vocabularyNote: "Bark = To make the characteristic loud cry of a dog.",
    jaVocab: "Bark = 犬がワンワンと吠えること。"
  },
  {
    id: "verb_pounce",
    name: "POUNCE (Action Verb)",
    jaName: "POUNCE / とびかかる (動詞)",
    target: "cat",
    multiplier: 2,
    cost: 500,
    desc: "Silent ambush leap. Cats produce 2x power.",
    jaDesc: "静かな奇襲ジャンプ。CATの生産パワーが2倍！",
    wordCategory: "Verb",
    jaCategory: "動詞",
    vocabularyNote: "Pounce = To spring or swoop suddenly so as to catch prey.",
    jaVocab: "Pounce = えものにサッと飛びかかること。"
  },
  {
    id: "verb_fly",
    name: "FLY (Action Verb)",
    jaName: "FLY / とぶ (動詞)",
    target: "bird",
    multiplier: 2,
    cost: 2500,
    desc: "Aero-glide physics. Birds produce 2x power.",
    jaDesc: "滑空飛行モード。BIRDの生産パワーが2倍！",
    wordCategory: "Verb",
    jaCategory: "動詞",
    vocabularyNote: "Fly = To move through the air using wings.",
    jaVocab: "Fly = つばさを使って空を飛ぶこと。"
  },
  {
    id: "verb_swim",
    name: "SWIM (Action Verb)",
    jaName: "SWIM / およぐ (動詞)",
    target: "fish",
    multiplier: 2,
    cost: 9000,
    desc: "Hydro-dynamic propulsion. Fish produce 2x power.",
    jaDesc: "水中推進力アップ。FISHの生産パワーが2倍！",
    wordCategory: "Verb",
    jaCategory: "動詞",
    vocabularyNote: "Swim = To propel oneself through water by bodily movements.",
    jaVocab: "Swim = 体をうごかして水中を進むこと。"
  },
  {
    id: "verb_howl",
    name: "HOWL (Action Verb)",
    jaName: "HOWL / とおぼえする (動詞)",
    target: "wolf",
    multiplier: 2,
    cost: 120000,
    desc: "Pack synchronization wave. Wolves produce 2x power.",
    jaDesc: "群れを呼ぶ遠吠え。WOLFの生産パワーが2倍！",
    wordCategory: "Verb",
    jaCategory: "動詞",
    vocabularyNote: "Howl = A long, loud, mournful cry uttered by dogs or wolves.",
    jaVocab: "Howl = 狼や犬が長く遠くまで吠えること。"
  },
  {
    id: "verb_bite",
    name: "BITE (Action Verb)",
    jaName: "BITE / かみつく (動詞)",
    target: "shark",
    multiplier: 2,
    cost: 4800000,
    desc: "Hydraulic jaw snap. Sharks produce 2x power.",
    jaDesc: "強力なアゴで一撃。SHARKの生産パワーが2倍！",
    wordCategory: "Verb",
    jaCategory: "動詞",
    vocabularyNote: "Bite = To grip or pierce something with the teeth.",
    jaVocab: "Bite = 歯で強くかみつくこと。"
  },
  {
    id: "verb_hunt",
    name: "HUNT (Action Verb)",
    jaName: "HUNT / かる・狩猟 (動詞)",
    target: "tiger",
    multiplier: 2,
    cost: 55000000,
    desc: "Apex predator tracking instinct. Tigers produce 2x power.",
    jaDesc: "獲物を追跡する本能。TIGERの生産パワーが2倍！",
    wordCategory: "Verb",
    jaCategory: "動詞",
    vocabularyNote: "Hunt = To chase and search for game or other wild animals.",
    jaVocab: "Hunt = えものを追いかけて捕まえること。"
  },
  {
    id: "verb_roar",
    name: "ROAR (Action Verb)",
    jaName: "ROAR / ほえる・咆哮 (動詞)",
    target: "lion",
    multiplier: 2,
    cost: 175000000,
    desc: "Decibel shockwave. Lions produce 2x power.",
    jaDesc: "百獣の王の雄叫び。LIONの生産パワーが2倍！",
    wordCategory: "Verb",
    jaCategory: "動詞",
    vocabularyNote: "Roar = A full, deep, prolonged cry uttered by a lion or other large wild animal.",
    jaVocab: "Roar = ライオンなどの野獣が大きく吠えること。"
  },
  {
    id: "verb_dive",
    name: "DIVE (Action Verb)",
    jaName: "DIVE / きゅうこうか・飛び込む (動詞)",
    target: "falcon",
    multiplier: 2,
    cost: 26000000000,
    desc: "Mach supersonic descent. Falcons produce 2x power.",
    jaDesc: "超音速のダイブ攻撃。FALCONの生産パワーが2倍！",
    wordCategory: "Verb",
    jaCategory: "動詞",
    vocabularyNote: "Dive = To plunge headfirst through the air or water.",
    jaVocab: "Dive = 空や水中に勢いよく飛び込むこと。"
  },

  // ADJECTIVES (ようすの言葉・形容詞)
  {
    id: "adj_swift",
    name: "SWIFT (Adjective)",
    jaName: "SWIFT / すばやい (形容詞)",
    target: "global",
    multiplier: 1.15,
    cost: 1000,
    desc: "Moving with great speed. All animals produce +15% power.",
    jaDesc: "電光石火のスピード。全動物のパワー+15%",
    wordCategory: "Adjective",
    jaCategory: "形容詞",
    vocabularyNote: "Swift = Happening quickly or moving with great speed.",
    jaVocab: "Swift = 動きがとてもすばやいこと。"
  },
  {
    id: "adj_fierce",
    name: "FIERCE (Adjective)",
    jaName: "FIERCE / どうもうな (形容詞)",
    target: "click",
    multiplier: 2,
    cost: 5000,
    desc: "Having an aggressive and savage nature. Clicks yield 2x power.",
    jaDesc: "激しい攻撃性。タップ/クリックのパワーが2倍！",
    wordCategory: "Adjective",
    jaCategory: "形容詞",
    vocabularyNote: "Fierce = Having or displaying an intense or aggressive aggressiveness.",
    jaVocab: "Fierce = どうもうで激しく強いようす。"
  },
  {
    id: "adj_armored",
    name: "ARMORED (Adjective)",
    jaName: "ARMORED / よろいをまとった (形容詞)",
    target: "global",
    multiplier: 1.25,
    cost: 50000,
    desc: "Reinforced with protective battle plating. All units +25% power.",
    jaDesc: "頑丈な装甲プレート。全動物のパワー+25%",
    wordCategory: "Adjective",
    jaCategory: "形容詞",
    vocabularyNote: "Armored = Protected by armor against enemy strikes.",
    jaVocab: "Armored = よろいや装甲で守られていること。"
  },
  {
    id: "adj_nocturnal",
    name: "NOCTURNAL (Adjective)",
    jaName: "NOCTURNAL / やこうせいの (形容詞)",
    target: "global",
    multiplier: 1.3,
    cost: 250000,
    desc: "Active primarily in dark night operations. All units +30% power.",
    jaDesc: "暗闇での夜間作戦。全動物のパワー+30%",
    wordCategory: "Adjective",
    jaCategory: "形容詞",
    vocabularyNote: "Nocturnal = Active during the night rather than the day.",
    jaVocab: "Nocturnal = 昼ではなく夜に活動すること。"
  },
  {
    id: "adj_venomous",
    name: "VENOMOUS (Adjective)",
    jaName: "VENOMOUS / どくをもつ (形容詞)",
    target: "click",
    multiplier: 2.5,
    cost: 1500000,
    desc: "Capable of injecting deadly toxins. Clicks yield 2.5x power.",
    jaDesc: "致命的な毒を注入。タップパワーが2.5倍！",
    wordCategory: "Adjective",
    jaCategory: "形容詞",
    vocabularyNote: "Venomous = Capable of injecting poison through a bite or sting.",
    jaVocab: "Venomous = かんだり刺したりして毒を出すこと。"
  },
  {
    id: "adj_savage",
    name: "SAVAGE (Adjective)",
    jaName: "SAVAGE / やせいてきな (形容詞)",
    target: "global",
    multiplier: 1.5,
    cost: 20000000,
    desc: "Untamed, wild, and fiercely powerful. All units +50% power.",
    jaDesc: "荒々しい野生の力。全動物のパワー+50%",
    wordCategory: "Adjective",
    jaCategory: "形容詞",
    vocabularyNote: "Savage = Fierce, violent, and uncontrolled in battle.",
    jaVocab: "Savage = 野生でとても凶暴で強いこと。"
  },
  {
    id: "adj_apex",
    name: "APEX (Adjective)",
    jaName: "APEX / ちょうてんの (形容詞)",
    target: "global",
    multiplier: 2.0,
    cost: 500000000,
    desc: "Top of the food chain with no natural predators. DOUBLE ALL PRODUCTION!",
    jaDesc: "生態系の頂点捕食者。全動物のパワーが2倍！",
    wordCategory: "Adjective",
    jaCategory: "形容詞",
    vocabularyNote: "Apex = The highest point or top rank (e.g. Apex Predator).",
    jaVocab: "Apex = いちばん上のてっぺん・頂点のこと。"
  },

  // TECH & INPUT MODS (特殊メカ強化)
  {
    id: "mod_spacebar_1",
    name: "SPACEBAR OVERDRIVE I",
    jaName: "SPACEBAR 連打強化 I",
    target: "spacebar",
    multiplier: 2,
    cost: 300,
    desc: "Mechanical switch hyper-relay. Spacebar clicks hit for 2x power!",
    jaDesc: "メカニカルスイッチ強化。スペースキーのパワーが2倍！",
    wordCategory: "Tech Mod",
    jaCategory: "特殊メカ"
  },
  {
    id: "mod_spacebar_2",
    name: "SPACEBAR OVERDRIVE II",
    jaName: "SPACEBAR 連打強化 II",
    target: "spacebar",
    multiplier: 3,
    cost: 15000,
    desc: "Gold-plated sensory triggers. Spacebar clicks hit for 3x power!",
    jaDesc: "金メッキ高速トリガー。スペースキーのパワーが3倍！",
    wordCategory: "Tech Mod",
    jaCategory: "特殊メカ"
  },
  {
    id: "mod_spacebar_3",
    name: "HYPER-SPACEBAR APEX",
    jaName: "HYPER-SPACEBAR APEX",
    target: "spacebar",
    multiplier: 5,
    cost: 1000000,
    desc: "Sub-atomic kinetic relay. Spacebar clicks hit for 5x power!",
    jaDesc: "亜原子キネティック回路。スペースキーのパワーが5倍！",
    wordCategory: "Tech Mod",
    jaCategory: "特殊メカ"
  }
];

// ----------------------------------------------------------------------------
// ACHIEVEMENTS & RANKS
// ----------------------------------------------------------------------------
const RANKS = [
  { threshold: 0, title: "CADET RECRUIT", jaTitle: "見習いテイマー", badge: "⭐" },
  { threshold: 500, title: "SCOUT TAMER", jaTitle: "偵察ハンター", badge: "🥉" },
  { threshold: 10000, title: "BEAST RANGER", jaTitle: "野獣レンジャー", badge: "🥈" },
  { threshold: 250000, title: "PACK COMMANDER", jaTitle: "群れの指揮官", badge: "🥇" },
  { threshold: 5000000, title: "APEX STRIKER", jaTitle: "頂点ストライカー", badge: "💎" },
  { threshold: 100000000, title: "TITAN TAMER", jaTitle: "巨獣の支配者", badge: "👑" },
  { threshold: 5000000000, title: "MYTHIC WARLORD", jaTitle: "伝説の覇王", badge: "⚡" },
  { threshold: 100000000000, title: "BEAST GOD", jaTitle: "幻獣神", badge: "🌌" }
];

// Make available globally
window.APEX_DEFAULT_ANIMALS = DEFAULT_ANIMALS;
window.APEX_DEFAULT_UPGRADES = DEFAULT_UPGRADES;
window.APEX_RANKS = RANKS;
