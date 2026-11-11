# ⚡ APEX BEAST: English Vocabulary Clicker

A tactical, high-energy vocabulary clicker game engineered specifically for students who love spacebar/incremental games (like *Cookie Clicker* or weapon clickers) but struggle to engage with traditional English learning methods.

---

## 🤖 The "AI Auto-Strike" Feature (Hardware Saver)

To protect expensive tablet keyboards (like Microsoft Surface Type Covers or iPad Magic Keyboards) from aggressive spacebar mashing:

* **Superhuman Speed (35 Clicks/Second):** The student can activate **`🤖 AI AUTO-STRIKE`** (by tapping the on-screen button or pressing **`A`** on the keyboard).
* **Visually & Tactically Satisfying:** The on-screen spacebar chatters like a high-speed mechanical gatling gun, combo meters instantly max out, and numbers skyrocket faster than any human could ever tap. This creates a strong incentive for the student to let the "AI" do the clicking instead of physically battering the tablet!
* **12s Overdrive with 8s Cooldown:** Runs for a 12-second burst, followed by an 8-second visual recharge energy gauge.
* **Teacher "Infinite AI" Mode:** If you want the student completely hands-off the physical spacebar, open the **`⚙️ TEACHER`** menu -> **"Student Balance & Cheat"** -> check **"Infinite AI Mode (No Cooldown)"**. The AI will fire continuously with zero downtime!

---

## 🔊 Audio Cues & English Speech Synthesis

The audio system now provides both **acoustic animal cues** AND **clear English pronunciation**:

1. **Procedural Synthesized Animal Sound Cues:**
   * Every animal features its own synthesized sound cue generated in real time using the browser's Web Audio API (100% offline, zero external MP3s needed):
     * **Dog:** Rapid double bark
     * **Cat:** Feline purr & meow sweep
     * **Bird / Eagle / Falcon:** High-velocity avian chirps and supersonic raptor screeches
     * **Fish:** Hydro bubble splash
     * **Frog:** Low resonant ribbit croak
     * **Wolf:** Ascending pack howl
     * **Bear / Lion / Tiger:** Guttural predator roars and seismic bass rumbles
     * **Snake:** High-pass venomous hiss
     * **Shark / Crocodile:** Serrated hydraulic jaw chomp
     * **Dragon:** Deep sub-bass inferno blast
2. **Clear English Pronunciation (Web Speech API):**
   * Speaks the animal word clearly whenever clicked, bought, or tested.
   * Completely overhauled for iOS / iPad Safari and Windows Surface to prevent audio suspension or garbage-collection lockups.
3. **"🔊 TEST AUDIO" Button:**
   * Located right in the top header so you can instantly verify that sound effects and speech synthesis are working on the device with one tap.

---

## 📱 iPad & Surface Portability (100% Mobile Optimized)

* **iPad Standalone App (No Safari Address Bar):**
  1. Open `animal-clicker/index.html` in Safari on the iPad (via local network, cloud file, or GitHub Pages/local web server).
  2. Tap the Safari **Share** icon (the square with an arrow pointing up).
  3. Tap **"Add to Home Screen"**.
  4. Launching it from the Home Screen opens it in **Full-Screen App Mode** with no browser bars or distractions!
* **Touch-Optimized:**
  * Multi-touch drumming supported (tap with multiple fingers).
  * Double-tap zoom disabled (`touch-action: manipulation`).
  * iOS selection magnifier disabled (`-webkit-touch-callout: none`).
  * Auto-resuming AudioContext on touch for iOS WebKit policy compliance.

---

## 📚 English Educational Progression & Complete Japanese (日本語) Support

The entire game features **100% comprehensive bilingual Japanese support** designed specifically for Japanese ESL students who struggle with reading English:

* **Instant Japanese Visibility (`日本語: ON` by default):**
  * Toggling the **`🌐 日本語: ON / OFF`** button in the header instantly displays or hides clear Japanese helper tags across the entire interface.
* **Readable Kanji + Furigana + Katakana Readings:**
  * **Animals:** Every creature prominently displays the English word (e.g. `WOLF`), its Katakana reading (`[ウルフ]`), and its Kanji meaning (`狼 (おおかみ)`).
  * **Verbs & Adjectives:** All upgrades feature clear Japanese definitions (e.g., `BARK / ほえる (動詞)`, `FIERCE / 獰猛な (形容詞)`, `SWIFT / すばやい`).
  * **UI & Buttons:** Every button, tab, meter, and counter includes Japanese subtitles (e.g., `BUY +1 (かう)`, `AI AUTO-STRIKE (AI自動連打)`, `TIER 1 (レベル1: 基本)`).
  * **Descriptions & Trivia:** Both the animal descriptions and fun facts have full Japanese explanations in friendly, high-contrast, rounded typography (`M PLUS Rounded 1c`).
  * **Word Frenzy Intercept:** Golden beast challenges display Japanese hints on every answer option so the student can make direct visual connections without getting frustrated.

---

## 🛠️ How to Customize / Add New Words

### Option A: In-Game Teacher Panel (Easiest, No Coding Required)
1. Click the red **`⚙️ TEACHER`** button in the top-right header.
2. In the **"Add / Edit Words"** tab:
   * Enter the English word (e.g., `CHEETAH` or `PENGUIN`).
   * Enter a cool title (e.g., `Mach Prowler` or `Sub-Zero Diver`).
   * Choose the Tier (1, 2, or 3), cost, and AP/sec production.
   * Add a fun tactical trivia fact.
   * Click **`+ Add Animal Word`**. It appears in the roster immediately!
3. In the **"Student Balance & Cheat"** tab:
   * Toggle **"Infinite AI Mode"** or set the AI firing speed (25, 35, or 50 clicks/sec).
   * Test or re-unlock audio.
   * Grant bonus points (10k, 1M, 100M AP) as rewards.
4. In the **"Save & Export JSON"** tab:
   * Back up the student's progress or copy/paste custom vocabulary packs.

### Option B: Editing `animals-data.js` Directly
Open `animals-data.js` in any text editor. Add or modify animal objects:
```javascript
{
  id: "cheetah",
  word: "CHEETAH",
  title: "Hyper-Velocity Prowler",
  tier: 2,
  phonetic: "/ˈtʃiː.tə/",
  jaMeaning: "チーター",
  baseCost: 1500000,
  basePps: 25000,
  desc: "Fastest land predator on Earth.",
  actionVerb: "SPRINT",
  fact: "Cheetahs can accelerate from 0 to 60 mph in just 3 seconds!",
  svg: `...`
}
```

---

## 🚀 How to Launch

* **On PC / Surface:** Double-click [`Launch_Animal_Clicker.html`](../Launch_Animal_Clicker.html) in the `Activities` folder, or open [`animal-clicker/index.html`](index.html) in Edge/Chrome/Firefox.
* **On iPad:** Open `index.html` in Safari and tap **"Add to Home Screen"** for full-screen mode.
