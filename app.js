const TAROT_DATA_URLS = [
  "https://raw.githubusercontent.com/ekelen/tarot-api/master/data/tarot-images.json",
  "https://raw.githubusercontent.com/ekelen/tarot-api/master/static/card_data.json",
  "https://raw.githubusercontent.com/ekelen/tarot-api/main/static/card_data.json",
];
const TAROT_FETCH_TIMEOUT_MS = 3200;
const IMAGE_BASE_URL = "https://commons.wikimedia.org/wiki/Special:FilePath/";
const IMAGE_QUERY = "";
const MEDIAPIPE_CDN_BASES = [
  "https://cdn.jsdelivr.net/npm/@mediapipe",
  "https://unpkg.com/@mediapipe",
];
const LLM_API_URL = window.ARCANA_LLM_API_URL || "";

const TAROT_READING_SYSTEM_PROMPT = `你是一位资深塔罗咨询师。

核心原则：不要解释牌，要解释人；不要解释牌义，要解释处境；不要解释符号，要解释提问者真实的心理活动。三张牌只是帮助你观察人的材料，不是回答的主角。

回答前必须在内部形成四项判断：Core Insight、Core Conflict、Hidden Fear、Likely Direction。它们只用于内部推理，绝不能被展示、命名、罗列或暗示给用户。

先确定唯一的 Core Insight，再使用系统随后提供的人格表达。整篇解读只能围绕这一个中心观点展开，其他判断只能用来支撑它，不能发展成并列中心。

直接回应这个具体的人、具体的问题和三张牌共同构成的处境。把抽象判断落到可辨认的心理动作、关系互动、现实选择和可能后果上。不要逐张讲牌，不要教授牌义，不要猜测用户没有提供的事实。最终正文不得出现任何牌名、牌组名称、正位、逆位或牌面描述。

最终只输出自然、连续的中文正文。不要标题、章节、栏目、编号、列表、标签、分析过程、人格名称、英文推理词或报告式总结。避免玄学套话、万能安慰和可以原封不动套给其他人的句子。`;

const CANONICAL_NAME_MAP = {
  Fortitude: "Strength",
  "Wheel Of Fortune": "Wheel of Fortune",
  "The Last Judgment": "Judgement",
};

const CN_NAME_MAP = {
  "The Fool": "愚者",
  "The Magician": "魔术师",
  "The High Priestess": "女祭司",
  "The Empress": "皇后",
  "The Emperor": "皇帝",
  "The Hierophant": "教皇",
  "The Lovers": "恋人",
  "The Chariot": "战车",
  Strength: "力量",
  "The Hermit": "隐者",
  "Wheel of Fortune": "命运之轮",
  Justice: "正义",
  "The Hanged Man": "倒吊人",
  Death: "死神",
  Temperance: "节制",
  "The Devil": "恶魔",
  "The Tower": "高塔",
  "The Star": "星星",
  "The Moon": "月亮",
  "The Sun": "太阳",
  Judgement: "审判",
  "The World": "世界",
  "Ace of Wands": "权杖王牌",
  "Two of Wands": "权杖二",
  "Three of Wands": "权杖三",
  "Four of Wands": "权杖四",
  "Five of Wands": "权杖五",
  "Six of Wands": "权杖六",
  "Seven of Wands": "权杖七",
  "Eight of Wands": "权杖八",
  "Nine of Wands": "权杖九",
  "Ten of Wands": "权杖十",
  "Page of Wands": "权杖侍从",
  "Knight of Wands": "权杖骑士",
  "Queen of Wands": "权杖王后",
  "King of Wands": "权杖国王",
  "Ace of Cups": "圣杯王牌",
  "Two of Cups": "圣杯二",
  "Three of Cups": "圣杯三",
  "Four of Cups": "圣杯四",
  "Five of Cups": "圣杯五",
  "Six of Cups": "圣杯六",
  "Seven of Cups": "圣杯七",
  "Eight of Cups": "圣杯八",
  "Nine of Cups": "圣杯九",
  "Ten of Cups": "圣杯十",
  "Page of Cups": "圣杯侍从",
  "Knight of Cups": "圣杯骑士",
  "Queen of Cups": "圣杯王后",
  "King of Cups": "圣杯国王",
  "Ace of Swords": "宝剑王牌",
  "Two of Swords": "宝剑二",
  "Three of Swords": "宝剑三",
  "Four of Swords": "宝剑四",
  "Five of Swords": "宝剑五",
  "Six of Swords": "宝剑六",
  "Seven of Swords": "宝剑七",
  "Eight of Swords": "宝剑八",
  "Nine of Swords": "宝剑九",
  "Ten of Swords": "宝剑十",
  "Page of Swords": "宝剑侍从",
  "Knight of Swords": "宝剑骑士",
  "Queen of Swords": "宝剑王后",
  "King of Swords": "宝剑国王",
  "Ace of Pentacles": "星币王牌",
  "Two of Pentacles": "星币二",
  "Three of Pentacles": "星币三",
  "Four of Pentacles": "星币四",
  "Five of Pentacles": "星币五",
  "Six of Pentacles": "星币六",
  "Seven of Pentacles": "星币七",
  "Eight of Pentacles": "星币八",
  "Nine of Pentacles": "星币九",
  "Ten of Pentacles": "星币十",
  "Page of Pentacles": "星币侍从",
  "Knight of Pentacles": "星币骑士",
  "Queen of Pentacles": "星币王后",
  "King of Pentacles": "星币国王",
};

const CARD_SEQUENCE_LABELS = ["第一张", "第二张", "第三张"];

const TAROT_IMAGE_FILE_MAP = {
  "The Fool": "RWS_Tarot_00_Fool.jpg",
  "The Magician": "RWS_Tarot_01_Magician.jpg",
  "The High Priestess": "RWS_Tarot_02_High_Priestess.jpg",
  "The Empress": "RWS_Tarot_03_Empress.jpg",
  "The Emperor": "RWS_Tarot_04_Emperor.jpg",
  "The Hierophant": "RWS_Tarot_05_Hierophant.jpg",
  "The Lovers": "RWS_Tarot_06_Lovers.jpg",
  "The Chariot": "RWS_Tarot_07_Chariot.jpg",
  Strength: "RWS_Tarot_08_Strength.jpg",
  "The Hermit": "RWS_Tarot_09_Hermit.jpg",
  "Wheel of Fortune": "RWS_Tarot_10_Wheel_of_Fortune.jpg",
  Justice: "RWS_Tarot_11_Justice.jpg",
  "The Hanged Man": "RWS_Tarot_12_Hanged_Man.jpg",
  Death: "RWS_Tarot_13_Death.jpg",
  Temperance: "RWS_Tarot_14_Temperance.jpg",
  "The Devil": "RWS_Tarot_15_Devil.jpg",
  "The Tower": "RWS_Tarot_16_Tower.jpg",
  "The Star": "RWS_Tarot_17_Star.jpg",
  "The Moon": "RWS_Tarot_18_Moon.jpg",
  "The Sun": "RWS_Tarot_19_Sun.jpg",
  Judgement: "RWS_Tarot_20_Judgement.jpg",
  "The World": "RWS_Tarot_21_World.jpg",
  "Ace of Wands": "Wands01.jpg",
  "Two of Wands": "Wands02.jpg",
  "Three of Wands": "Wands03.jpg",
  "Four of Wands": "Wands04.jpg",
  "Five of Wands": "Wands05.jpg",
  "Six of Wands": "Wands06.jpg",
  "Seven of Wands": "Wands07.jpg",
  "Eight of Wands": "Wands08.jpg",
  "Nine of Wands": "Wands09.jpg",
  "Ten of Wands": "Wands10.jpg",
  "Page of Wands": "Wands11.jpg",
  "Knight of Wands": "Wands12.jpg",
  "Queen of Wands": "Wands13.jpg",
  "King of Wands": "Wands14.jpg",
  "Ace of Cups": "Cups01.jpg",
  "Two of Cups": "Cups02.jpg",
  "Three of Cups": "Cups03.jpg",
  "Four of Cups": "Cups04.jpg",
  "Five of Cups": "Cups05.jpg",
  "Six of Cups": "Cups06.jpg",
  "Seven of Cups": "Cups07.jpg",
  "Eight of Cups": "Cups08.jpg",
  "Nine of Cups": "Cups09.jpg",
  "Ten of Cups": "Cups10.jpg",
  "Page of Cups": "Cups11.jpg",
  "Knight of Cups": "Cups12.jpg",
  "Queen of Cups": "Cups13.jpg",
  "King of Cups": "Cups14.jpg",
  "Ace of Swords": "Swords01.jpg",
  "Two of Swords": "Swords02.jpg",
  "Three of Swords": "Swords03.jpg",
  "Four of Swords": "Swords04.jpg",
  "Five of Swords": "Swords05.jpg",
  "Six of Swords": "Swords06.jpg",
  "Seven of Swords": "Swords07.jpg",
  "Eight of Swords": "Swords08.jpg",
  "Nine of Swords": "Swords09.jpg",
  "Ten of Swords": "Swords10.jpg",
  "Page of Swords": "Swords11.jpg",
  "Knight of Swords": "Swords12.jpg",
  "Queen of Swords": "Swords13.jpg",
  "King of Swords": "Swords14.jpg",
  "Ace of Pentacles": "Pents01.jpg",
  "Two of Pentacles": "Pents02.jpg",
  "Three of Pentacles": "Pents03.jpg",
  "Four of Pentacles": "Pents04.jpg",
  "Five of Pentacles": "Pents05.jpg",
  "Six of Pentacles": "Pents06.jpg",
  "Seven of Pentacles": "Pents07.jpg",
  "Eight of Pentacles": "Pents08.jpg",
  "Nine of Pentacles": "Pents09.jpg",
  "Ten of Pentacles": "Pents10.jpg",
  "Page of Pentacles": "Pents11.jpg",
  "Knight of Pentacles": "Pents12.jpg",
  "Queen of Pentacles": "Pents13.jpg",
  "King of Pentacles": "Pents14.jpg",
};

const MAJOR_SYMBOL_MAP = {
  "The Fool": "☉",
  "The Magician": "☿",
  "The High Priestess": "☾",
  "The Empress": "♀",
  "The Emperor": "♈",
  "The Hierophant": "♉",
  "The Lovers": "♊",
  "The Chariot": "♋",
  Strength: "♌",
  "The Hermit": "♍",
  "Wheel of Fortune": "⊕",
  Justice: "⚖",
  "The Hanged Man": "∞",
  Death: "♇",
  Temperance: "♐",
  "The Devil": "♑",
  "The Tower": "⚡",
  "The Star": "✶",
  "The Moon": "☽",
  "The Sun": "☀",
  Judgement: "✦",
  "The World": "⊙",
};

const statusText = document.querySelector("#statusText");
const cardCount = document.querySelector("#cardCount");
const arcanaShell = document.querySelector(".arcana-shell");
const wheelLoading = document.querySelector("#wheelLoading");
const tarotSwiperElement = document.querySelector("#tarotSwiper");
const tarotWrapper = document.querySelector("#tarotWrapper");
const readingPanel = document.querySelector("#readingPanel");
const readingText = document.querySelector("#readingText");
const restartReadingButton = document.querySelector("#restartReadingButton");
const questionInput = document.querySelector("#questionInput");
const gestureHud = document.querySelector("#gestureHud");
const cameraOrb = document.querySelector(".camera-orb");
const cameraPreview = document.querySelector("#cameraPreview");
const handCanvas = document.querySelector("#handCanvas");
const handCanvasContext = handCanvas?.getContext("2d");
const slotShells = Array.from(document.querySelectorAll(".slot-card-shell"));

let tarotCards = [];
let tarotSwiper = null;
let selectedCards = [];
let typewriterText = "";
let typewriterCursor = 0;
let typewriterTimer = null;
let handsModel = null;
let handCamera = null;
let gestureReady = false;
let isGestureInitializing = false;
let isSelectingCard = false;

const gestureState = {
  currentState: "idle",
  rotateTimer: null,
  fistFrameCount: 0,
  fistHasTriggered: false,
  lastFingerBooleans: [false, false, false, false],
  lastClosedBooleans: [false, false, false, false],
  lastFistScore: 0,
  lastFrameState: "neutral",
  lastDebugRenderAt: 0,
};

function updateStatus(message) {
  statusText.textContent = message;
}

function updateCardCount(count) {
  cardCount.textContent = `${count} / 78`;
}

function toCardFileName(englishName) {
  return `${englishName
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}.webp`;
}

function buildImageUrl(fileName) {
  return `${IMAGE_BASE_URL}${encodeURIComponent(fileName)}${IMAGE_QUERY}`;
}

function buildLocalCardArt(card) {
  const hue = (card.index * 47) % 360;
  const accentHue = (hue + 38) % 360;
  const number = String(card.index + 1).padStart(2, "0");
  const symbol = getCardSymbol(card.canonicalName);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 680">
      <defs>
        <radialGradient id="a" cx="50%" cy="38%" r="72%">
          <stop offset="0%" stop-color="hsl(${accentHue}, 72%, 30%)"/>
          <stop offset="58%" stop-color="hsl(${hue}, 62%, 15%)"/>
          <stop offset="100%" stop-color="#08040d"/>
        </radialGradient>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f2d88e"/>
          <stop offset="50%" stop-color="#9e7a31"/>
          <stop offset="100%" stop-color="#f8e3a3"/>
        </linearGradient>
      </defs>
      <rect width="420" height="680" rx="26" fill="#08040d"/>
      <rect x="18" y="18" width="384" height="644" rx="20" fill="url(#a)" stroke="url(#g)" stroke-width="4"/>
      <rect x="42" y="42" width="336" height="596" rx="12" fill="none" stroke="#e8c878" stroke-width="2" opacity=".68"/>
      <path d="M210 84 L336 210 L210 336 L84 210 Z" fill="none" stroke="#ecd48a" stroke-width="3" opacity=".72"/>
      <circle cx="210" cy="210" r="104" fill="none" stroke="#ecd48a" stroke-width="3" opacity=".62"/>
      <circle cx="210" cy="210" r="62" fill="rgba(8,4,13,.28)" stroke="#f4df9b" stroke-width="2"/>
      <text x="210" y="232" text-anchor="middle" font-family="Georgia, serif" font-size="92" fill="#f7e3a2">${symbol}</text>
      <path d="M92 418 H328 M116 454 H304 M140 490 H280" stroke="#e8c878" stroke-width="2" opacity=".5"/>
      <text x="210" y="548" text-anchor="middle" font-family="Songti SC, Noto Serif SC, serif" font-size="34" fill="#f7e3a2">${escapeSvg(card.chineseName)}</text>
      <text x="210" y="588" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="#caa85e" letter-spacing="3">${escapeSvg(card.canonicalName.toUpperCase())}</text>
      <text x="68" y="86" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="#f7e3a2">${number}</text>
      <text x="352" y="616" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="#f7e3a2">${number}</text>
    </svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.replace(/\s+/g, " ").trim())}`;
}

function getCardSymbol(canonicalName) {
  if (canonicalName.includes("Wands")) {
    return "♣";
  }

  if (canonicalName.includes("Cups")) {
    return "◊";
  }

  if (canonicalName.includes("Swords")) {
    return "△";
  }

  if (canonicalName.includes("Pentacles")) {
    return "◎";
  }

  return MAJOR_SYMBOL_MAP[canonicalName] || "✦";
}

function escapeSvg(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shuffleCards(cards) {
  const shuffled = [...cards];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

function normalizeCard(card, index) {
  const englishName = card.name || `Unknown Arcana ${index + 1}`;
  const canonicalName = CANONICAL_NAME_MAP[englishName] || englishName;
  const chineseName = CN_NAME_MAP[canonicalName] || englishName;
  const fileName = TAROT_IMAGE_FILE_MAP[canonicalName] || toCardFileName(canonicalName);

  return {
    id: card.name_short || card.short_name || String(index + 1).padStart(2, "0"),
    index,
    englishName,
    canonicalName,
    chineseName,
    fileName,
    imageUrl: buildImageUrl(fileName),
    fallbackImageUrl: null,
    raw: card,
  };
}

function createCardElement(card, { compact = false, orientation = null } = {}) {
  const button = document.createElement("button");
  button.className = `tarot-card${orientation === "reversed" ? " is-reversed" : ""}`;
  button.type = "button";
  button.setAttribute("aria-label", `抽取${card.chineseName}`);
  button.dataset.cardIndex = String(card.index);
  button.style.setProperty("--card-seed-angle", `${(card.index % 12) * 30}deg`);
  button.style.setProperty("--sigil-angle", `${45 + (card.index % 12) * 8}deg`);

  if (compact) {
    button.tabIndex = -1;
    button.setAttribute("aria-hidden", "true");
  }

  const inner = document.createElement("span");
  inner.className = "tarot-card__inner";

  const back = document.createElement("span");
  back.className = "tarot-card__face tarot-card__back";
  back.setAttribute("aria-hidden", "true");

  const sigil = document.createElement("span");
  sigil.className = "card-sigil";
  sigil.dataset.cardMark = String(card.index + 1).padStart(2, "0");
  back.append(sigil);

  const front = document.createElement("span");
  front.className = "tarot-card__face tarot-card__front";

  const image = document.createElement("img");
  image.src = card.imageUrl;
  image.alt = card.chineseName;
  image.loading = "lazy";
  image.decoding = "async";
  image.referrerPolicy = "no-referrer";
  image.dataset.remoteSrc = card.imageUrl;
  image.addEventListener("error", () => {
    image.src = card.fallbackImageUrl || buildLocalCardArt(card);
  });

  window.setTimeout(() => {
    if (!image.complete || image.naturalWidth === 0) {
      image.src = card.fallbackImageUrl || buildLocalCardArt(card);
    }
  }, compact ? 3600 : 6000);

  const fallback = document.createElement("span");
  fallback.className = "image-fallback";
  fallback.textContent = card.chineseName;

  const label = document.createElement("span");
  label.className = "card-front-label";
  label.textContent = `【${orientation === "reversed" ? "逆位" : "正位"} · ${card.chineseName}】`;

  front.append(image, fallback, label);
  inner.append(back, front);
  button.append(inner);

  return button;
}

function createSlide(card) {
  const slide = document.createElement("div");
  slide.className = "swiper-slide";
  slide.dataset.cardIndex = String(card.index);
  slide.append(createCardElement(card));
  return slide;
}

function renderWheel(cards) {
  const fragment = document.createDocumentFragment();
  cards.forEach((card) => fragment.append(createSlide(card)));
  tarotWrapper.replaceChildren(fragment);
}

function initSwiper() {
  if (tarotSwiper) {
    tarotSwiper.destroy(true, true);
  }

  tarotSwiper = new Swiper("#tarotSwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    loopAdditionalSlides: 32,
    loopPreventsSliding: false,
    slidesPerView: "auto",
    initialSlide: Math.floor(Math.random() * tarotCards.length),
    speed: 720,
    threshold: 3,
    longSwipesRatio: 0.18,
    followFinger: true,
    resistanceRatio: 0.28,
    touchRatio: 0.82,
    slideToClickedSlide: true,
    watchSlidesProgress: true,
    preventInteractionOnTransition: false,
    coverflowEffect: {
      rotate: 22,
      stretch: -10,
      depth: 126,
      modifier: 0.82,
      slideShadows: false,
    },
    keyboard: {
      enabled: true,
    },
    mousewheel: {
      forceToAxis: true,
      sensitivity: 0.72,
      thresholdDelta: 8,
    },
    on: {
      click(swiper) {
        if (selectedCards.length >= 3 || typeof swiper.clickedIndex !== "number") {
          return;
        }

        const clickedSlide = swiper.clickedSlide;

        if (clickedSlide && !clickedSlide.classList.contains("swiper-slide-active")) {
          swiper.slideTo(swiper.clickedIndex, 520);
          return;
        }

        drawActiveCard({ animated: true });
      },
    },
  });

  window.arcanaTarotSwiper = tarotSwiper;
  tarotSwiperElement.classList.add("is-ready");
}

function getActiveCard() {
  const activeSlide = tarotSwiper?.slides?.[tarotSwiper.activeIndex];
  const cardIndex = Number(activeSlide?.dataset.cardIndex);
  return tarotCards.find((card) => card.index === cardIndex);
}

function drawActiveCard({ animated = false } = {}) {
  if (!tarotSwiper || selectedCards.length >= 3) {
    return;
  }

  const card = getActiveCard();
  const activeSlide = tarotSwiper.slides[tarotSwiper.activeIndex];

  if (!card || !activeSlide || selectedCards.some((selected) => selected.index === card.index)) {
    moveToNextAvailableCard();
    return;
  }

  if (animated) {
    playSelectionEffect(activeSlide, () => drawActiveCard({ animated: false }));
    return;
  }

  const slotIndex = selectedCards.length;
  const orientation = Math.random() > 0.5 ? "upright" : "reversed";
  const selectedCard = {
    ...card,
    position: CARD_SEQUENCE_LABELS[slotIndex],
    orientation,
  };

  selectedCards.push(selectedCard);

  if (questionInput) {
    questionInput.disabled = true;
  }

  [...tarotSwiper.slides].forEach((slide) => {
    if (Number(slide.dataset.cardIndex) !== selectedCard.index) {
      return;
    }

    slide.classList.add("is-drawn");
    slide.setAttribute("aria-hidden", "true");
    slide.querySelector(".tarot-card")?.setAttribute("disabled", "");
  });
  slotShells[slotIndex].replaceChildren(
    createCardElement(selectedCard, { compact: true, orientation }),
  );

  if (selectedCards.length < 3) {
    updateStatus(`第 ${slotIndex + 1} 张牌已落定，请继续抽取下一张牌。`);
    moveToNextAvailableCard();
    return;
  }

  updateStatus("三张牌已落定。牌面正在显影，解读即将开始。");
  tarotSwiper.allowTouchMove = false;
  tarotSwiper.keyboard.disable();

  if (tarotSwiper.mousewheel?.disable) {
    tarotSwiper.mousewheel.disable();
  }

  console.group("Arcana Step 2: selected cards");
  console.table(
    selectedCards.map((card) => ({
      位置: card.position,
      中文名: card.chineseName,
      正逆位: card.orientation === "reversed" ? "逆位" : "正位",
      English: card.canonicalName,
      图片URL: card.imageUrl,
    })),
  );
  console.groupEnd();

  window.setTimeout(revealSelectedCards, 520);
}

function playSelectionEffect(slide, onComplete) {
  if (!slide || slide.classList.contains("is-selecting") || isSelectingCard) {
    return;
  }

  isSelectingCard = true;
  slide.classList.add("is-selecting");

  const particles = document.createElement("span");
  particles.className = "selection-particles";
  particles.setAttribute("aria-hidden", "true");

  for (let index = 0; index < 12; index += 1) {
    const spark = document.createElement("i");
    spark.style.setProperty("--spark-angle", `${index * 30 + (index % 2) * 10}deg`);
    spark.style.setProperty("--spark-distance", `${88 + (index % 4) * 18}px`);
    spark.style.setProperty("--spark-delay", `${index * 12}ms`);
    spark.style.setProperty("--spark-size", `${4 + (index % 3)}px`);
    particles.append(spark);
  }

  slide.append(particles);

  window.setTimeout(() => {
    particles.remove();
    slide.classList.remove("is-selecting");
    isSelectingCard = false;
    onComplete();
  }, 760);
}

function moveToNextAvailableCard() {
  if (!tarotSwiper || selectedCards.length >= 3) {
    return;
  }

  const selectedIndexes = new Set(selectedCards.map((card) => card.index));

  for (let offset = 1; offset <= tarotCards.length; offset += 1) {
    const nextIndex = (tarotSwiper.activeIndex + offset) % tarotSwiper.slides.length;
    const slide = tarotSwiper.slides[nextIndex];
    const cardIndex = Number(slide?.dataset.cardIndex);

    if (!selectedIndexes.has(cardIndex)) {
      tarotSwiper.slideTo(nextIndex);
      return;
    }
  }
}

async function fetchTarotData() {
  let lastError = null;

  for (const sourceUrl of TAROT_DATA_URLS) {
    try {
      const response = await fetchWithTimeout(sourceUrl, TAROT_FETCH_TIMEOUT_MS);

      if (!response.ok) {
        throw new Error(`数据源响应异常：${response.status}`);
      }

      return {
        data: await response.json(),
        sourceUrl,
      };
    } catch (error) {
      lastError = error;
      console.info(`Arcana Step 2: 数据源暂不可用，尝试备用地址：${sourceUrl}`, error);
    }
  }

  throw lastError || new Error("所有远程塔罗牌数据源均不可用");
}

function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, { signal: controller.signal }).finally(() => {
    window.clearTimeout(timeout);
  });
}

function getLocalTarotData() {
  return {
    cards: Object.keys(TAROT_IMAGE_FILE_MAP).map((name, index) => ({
      name,
      name_short: String(index + 1).padStart(2, "0"),
    })),
  };
}

function revealSelectedCards() {
  arcanaShell.classList.add("is-reading");
  readingPanel.setAttribute("aria-hidden", "false");

  slotShells.forEach((slot) => {
    slot.querySelector(".tarot-card")?.classList.add("is-revealed");
  });

  window.setTimeout(startGlobalReading, 900);
}

function buildReadingPrompt(cards, question) {
  const cardText = cards
    .map((card) => `${card.chineseName}（${card.orientation === "reversed" ? "逆位" : "正位"}）`)
    .join("\n");

  return `用户问题：
${question || "用户选择留空，请从当前最突出的处境与心理矛盾切入。"}

抽到的三张牌：
${cardText}`;
}

function resetTypewriter() {
  if (typewriterTimer) {
    window.clearTimeout(typewriterTimer);
  }

  typewriterText = "";
  typewriterCursor = 0;
  typewriterTimer = null;
  readingText.textContent = "";
  readingText.classList.add("is-typing");
}

function queueTypewriterText(chunk) {
  typewriterText += chunk;

  if (!typewriterTimer) {
    runTypewriter();
  }
}

function runTypewriter() {
  if (typewriterCursor >= typewriterText.length) {
    typewriterTimer = null;
    return;
  }

  typewriterCursor += 1;
  readingText.textContent = typewriterText.slice(0, typewriterCursor);

  const currentChar = typewriterText[typewriterCursor - 1];
  typewriterTimer = window.setTimeout(runTypewriter, currentChar === "\n" ? 90 : 24);
}

function finishTypewriter(finalStatus = "综合解读已完成。可以再抽一次。") {
  const finish = () => {
    if (typewriterCursor < typewriterText.length) {
      window.setTimeout(finish, 120);
      return;
    }

    readingText.classList.remove("is-typing");
    restartReadingButton?.classList.add("is-visible");
    updateStatus(finalStatus);
  };

  finish();
}

async function startGlobalReading() {
  const question = questionInput?.value.trim() || "";
  const prompt = buildReadingPrompt(selectedCards, question);
  resetTypewriter();
  updateStatus("正在向大模型请求全局综合解读...");

  if (!LLM_API_URL) {
    queueTypewriterText("大模型接口未配置");
    finishTypewriter();
    updateStatus("大模型接口未配置");
    return;
  }

  try {
    await streamLLMReading(prompt, queueTypewriterText);
    finishTypewriter();
  } catch (error) {
    console.error("Arcana Step 3: LLM request failed", error);
    resetTypewriter();
    const errorMessage = error.status === 404 || error.status === 503
      ? "大模型接口未配置"
      : error.status === 422
        ? "本次解读未通过质量检测，请重新抽取。"
        : "大模型接口暂时无法连接，请稍后再试。";
    queueTypewriterText(errorMessage);
    finishTypewriter(errorMessage);
    updateStatus(errorMessage);
  }
}

async function streamLLMReading(prompt, onChunk) {
  const response = await fetch(LLM_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify({
      stream: true,
      messages: [
        {
          role: "system",
          content: TAROT_READING_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok || !response.body) {
    const error = new Error(`LLM response failed: ${response.status}`);
    error.status = response.status;
    throw error;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();

    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (!trimmed) {
        return;
      }

      if (trimmed.startsWith("data:")) {
        const data = trimmed.slice(5).trim();

        if (data === "[DONE]") {
          return;
        }

        parseLLMChunk(data, onChunk);
        return;
      }

      parseLLMChunk(trimmed, onChunk);
    });
  }

  if (buffer.trim()) {
    parseLLMChunk(buffer.trim(), onChunk);
  }
}

function parseLLMChunk(data, onChunk) {
  try {
    const json = JSON.parse(data);
    const content =
      json.choices?.[0]?.delta?.content ||
      json.choices?.[0]?.message?.content ||
      json.delta ||
      json.content ||
      "";

    if (content) {
      onChunk(content);
    }
  } catch {
    onChunk(data);
  }
}

function resetReadingSession() {
  stopWheelRotation();
  updateStatus("正在重新洗牌...");

  if (typewriterTimer) {
    window.clearTimeout(typewriterTimer);
  }

  typewriterText = "";
  typewriterCursor = 0;
  typewriterTimer = null;
  readingText.textContent = "";
  readingText.classList.remove("is-typing");
  restartReadingButton?.classList.remove("is-visible");
  readingPanel.setAttribute("aria-hidden", "true");
  arcanaShell.classList.remove("is-reading");
  selectedCards.length = 0;
  window.arcanaSelectedCards = selectedCards;

  if (questionInput) {
    questionInput.disabled = false;
    questionInput.focus({ preventScroll: true });
  }

  slotShells.forEach((slot) => slot.replaceChildren());

  tarotSwiper?.slides?.forEach((slide) => {
    slide.classList.remove("is-drawn", "is-selecting");
    slide.removeAttribute("aria-hidden");
    const cardButton = slide.querySelector(".tarot-card");

    if (cardButton) {
      cardButton.removeAttribute("disabled");
    }

    slide.querySelector(".selection-particles")?.remove();
  });

  if (tarotSwiper) {
    tarotSwiper.allowTouchMove = true;
    tarotSwiper.keyboard?.enable?.();
    tarotSwiper.mousewheel?.enable?.();
    tarotSwiper.update();

    const nextIndex = Math.floor(Math.random() * tarotSwiper.slides.length);
    if (typeof tarotSwiper.slideToLoop === "function") {
      tarotSwiper.slideToLoop(nextIndex, 520);
    } else {
      tarotSwiper.slideTo(nextIndex, 520);
    }
  }

  resetGestureTracking();
  updateCardCount(tarotCards.length);
  window.requestAnimationFrame(() => {
    updateStatus("命运之轮已重新展开。请抽取第一张牌。");
  });
}

async function initGestureControls() {
  if (!gestureHud || !cameraPreview || !handCanvas || gestureReady || isGestureInitializing) {
    return;
  }

  isGestureInitializing = true;

  if (!navigator.mediaDevices?.getUserMedia) {
    setGestureOffline();
    isGestureInitializing = false;
    return;
  }

  cameraOrb?.classList.remove("is-offline");

  try {
    await ensureMediaPipeHands();

    handsModel = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    handsModel.setOptions({
      maxNumHands: 1,
      modelComplexity: 0,
      minDetectionConfidence: 0.68,
      minTrackingConfidence: 0.62,
    });

    handsModel.onResults(handleHandResults);

    handCamera = new Camera(cameraPreview, {
      width: 320,
      height: 240,
      onFrame: async () => {
        await handsModel.send({ image: cameraPreview });
      },
    });

    await handCamera.start();
    gestureReady = true;
    setGestureState("idle");
    renderGestureDebug();
  } catch (error) {
    console.info("Arcana: hand gesture controls unavailable.", error);
    setGestureOffline();
    renderGestureDebug();
  } finally {
    isGestureInitializing = false;
  }
}

function waitForMediaPipeHands() {
  const startedAt = Date.now();

  return new Promise((resolve, reject) => {
    const tick = () => {
      if (window.Hands && window.Camera && window.drawConnectors && window.drawLandmarks) {
        resolve();
        return;
      }

      if (Date.now() - startedAt > 9000) {
        reject(new Error("MediaPipe Hands CDN 加载超时"));
        return;
      }

      window.setTimeout(tick, 180);
    };

    tick();
  });
}

async function ensureMediaPipeHands() {
  if (window.Hands && window.Camera && window.drawConnectors && window.drawLandmarks) {
    return;
  }

  let lastError = null;

  for (const baseUrl of MEDIAPIPE_CDN_BASES) {
    try {
      await loadExternalScript(`${baseUrl}/camera_utils/camera_utils.js`);
      await loadExternalScript(`${baseUrl}/drawing_utils/drawing_utils.js`);
      await loadExternalScript(`${baseUrl}/hands/hands.js`);
      await waitForMediaPipeHands();
      return;
    } catch (error) {
      lastError = error;
      console.info(`Arcana: MediaPipe CDN 暂不可用，尝试备用源：${baseUrl}`, error);
    }
  }

  throw lastError || new Error("MediaPipe Hands 加载失败");
}

function loadExternalScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);

    if (existing?.dataset.loaded === "true") {
      resolve();
      return;
    }

    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    const timeout = window.setTimeout(() => {
      reject(new Error(`脚本加载超时：${src}`));
    }, 8000);

    script.src = src;
    script.async = true;
    script.dataset.dynamic = "true";
    script.addEventListener(
      "load",
      () => {
        window.clearTimeout(timeout);
        script.dataset.loaded = "true";
        resolve();
      },
      { once: true },
    );
    script.addEventListener(
      "error",
      () => {
        window.clearTimeout(timeout);
        reject(new Error(`无法加载脚本：${src}`));
      },
      {
        once: true,
      },
    );
    document.head.append(script);
  });
}

function handleHandResults(results) {
  drawHandSkeleton(results);
  const landmarks = results.multiHandLandmarks?.[0];

  if (!landmarks || selectedCards.length >= 3 || arcanaShell.classList.contains("is-reading")) {
    resetGestureTracking();
    if (gestureReady && selectedCards.length < 3) {
      renderGestureDebug("未检测到手");
    }
    return;
  }

  const fingerBooleans = getFingerOpenBooleans(landmarks);
  const closedBooleans = getFingerClosedBooleans(landmarks);
  const frameState = classifyGestureFrame(fingerBooleans, closedBooleans);

  gestureState.lastFingerBooleans = fingerBooleans;
  gestureState.lastClosedBooleans = closedBooleans;
  gestureState.lastFistScore = closedBooleans.filter(Boolean).length;
  gestureState.lastFrameState = frameState;

  applyGestureState(frameState);
  handleFistSelection(frameState);
  renderGestureDebug();
}

function drawHandSkeleton(results) {
  if (!handCanvas || !handCanvasContext) {
    return;
  }

  const width = cameraPreview.videoWidth || 320;
  const height = cameraPreview.videoHeight || 240;

  if (handCanvas.width !== width || handCanvas.height !== height) {
    handCanvas.width = width;
    handCanvas.height = height;
  }

  handCanvasContext.save();
  handCanvasContext.clearRect(0, 0, handCanvas.width, handCanvas.height);

  if (results.multiHandLandmarks) {
    results.multiHandLandmarks.forEach((landmarks) => {
      window.drawConnectors(handCanvasContext, landmarks, window.HAND_CONNECTIONS, {
        color: "#28f5ff",
        lineWidth: 3,
      });
      window.drawLandmarks(handCanvasContext, landmarks, {
        color: "#f7e3a2",
        lineWidth: 1,
        radius: 3,
      });
    });
  }

  handCanvasContext.restore();
}

function resetGestureTracking() {
  stopWheelRotation();
  gestureState.fistFrameCount = 0;
  gestureState.fistHasTriggered = false;
  setGestureState("idle");
  renderGestureDebug();
}

function getFingerOpenBooleans(landmarks) {
  return [
    isFingerOpenByY(landmarks, 8, 5),
    isFingerOpenByY(landmarks, 12, 9),
    isFingerOpenByY(landmarks, 16, 13),
    isFingerOpenByY(landmarks, 20, 17),
  ];
}

function isFingerOpenByY(landmarks, tipIndex, rootIndex) {
  return landmarks[tipIndex].y < landmarks[rootIndex].y + 0.05;
}

function getFingerClosedBooleans(landmarks) {
  return [
    isFingerClosedByDistance(landmarks, 8, 5),
    isFingerClosedByDistance(landmarks, 12, 9),
    isFingerClosedByDistance(landmarks, 16, 13),
    isFingerClosedByDistance(landmarks, 20, 17),
  ];
}

function isFingerClosedByDistance(landmarks, tipIndex, baseIndex) {
  const wrist = landmarks[0];
  const tip = landmarks[tipIndex];
  const base = landmarks[baseIndex];
  const dTip = getLandmarkDistance2D(tip, wrist);
  const dBase = getLandmarkDistance2D(base, wrist);
  return dTip < dBase;
}

function classifyGestureFrame(openFingers, closedFingers) {
  const [index, middle, ring, pinky] = openFingers;
  const isFist = closedFingers.every(Boolean);

  if (isFist) {
    return "fist";
  }

  if (index && middle && ring && pinky) {
    return "rotating";
  }

  if (index && !middle && !ring && !pinky) {
    return "locked";
  }

  return "neutral";
}

function applyGestureState(nextState) {
  if (nextState === gestureState.currentState) {
    if (nextState === "fist") {
      stopWheelRotation();
    }
    return;
  }

  if (nextState === "rotating") {
    setGestureState("rotating");
    startWheelRotation();
    return;
  }

  if (nextState === "locked") {
    setGestureState("locked");
    stopWheelRotation();
    return;
  }

  if (nextState === "fist") {
    setGestureState("fist");
    stopWheelRotation();
    return;
  }

  stopWheelRotation();
  setGestureState("idle");
}

function startWheelRotation() {
  if (gestureState.rotateTimer || selectedCards.length >= 3) {
    return;
  }

  gestureState.rotateTimer = window.setInterval(() => {
    if (
      !tarotSwiper ||
      selectedCards.length >= 3 ||
      arcanaShell.classList.contains("is-reading")
    ) {
      stopWheelRotation();
      return;
    }

    if (tarotSwiper.animating) {
      return;
    }

      tarotSwiper.slideNext(760);
  }, 1020);
}

function stopWheelRotation() {
  if (gestureState.rotateTimer) {
    window.clearInterval(gestureState.rotateTimer);
    gestureState.rotateTimer = null;
  }
}

function handleFistSelection(frameState) {
  if (frameState !== "fist") {
    gestureState.fistFrameCount = 0;
    gestureState.fistHasTriggered = false;
    return;
  }

  gestureState.fistFrameCount += 1;
  stopWheelRotation();

  if (gestureState.fistFrameCount >= 10 && !gestureState.fistHasTriggered) {
    gestureState.fistFrameCount = 0;
    gestureState.fistHasTriggered = true;
    triggerPinchSuccessFlash();
    drawActiveCard({ animated: true });
  }
}

function setGestureState(nextState) {
  gestureState.currentState = nextState;

  if (!cameraOrb) {
    return;
  }

  cameraOrb.classList.toggle("is-rotating", nextState === "rotating");
  cameraOrb.classList.toggle("is-locked", nextState === "locked" || nextState === "fist");
}

function triggerPinchSuccessFlash() {
  if (!cameraOrb) {
    return;
  }

  cameraOrb.classList.remove("is-pinch-success");
  void cameraOrb.offsetWidth;
  cameraOrb.classList.add("is-pinch-success");
}

function renderGestureDebug(note = "") {
  gestureState.lastDebugRenderAt = performance.now();
}

function getAverageX(landmarks, indexes) {
  return indexes.reduce((sum, index) => sum + landmarks[index].x, 0) / indexes.length;
}

function getAverageY(landmarks, indexes) {
  return indexes.reduce((sum, index) => sum + landmarks[index].y, 0) / indexes.length;
}

function getLandmarkDistance2D(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function setGestureOffline() {
  cameraOrb?.classList.add("is-offline");
}

async function loadTarotCards() {
  updateStatus("正在唤醒本地完整牌库...");

  try {
    const { data, sourceUrl } = {
      data: getLocalTarotData(),
      sourceUrl: "local://arcana-rider-waite-deck",
    };

    tarotCards = Array.isArray(data.cards) ? shuffleCards(data.cards.map(normalizeCard)) : [];
    tarotCards.forEach((card) => {
      card.fallbackImageUrl = buildLocalCardArt(card);
    });

    window.arcanaTarotCards = tarotCards;
    window.arcanaSelectedCards = selectedCards;
    updateCardCount(tarotCards.length);
    renderWheel(tarotCards);
    initSwiper();
    initGestureControls();
    wheelLoading.classList.add("is-hidden");
    updateStatus("命运之轮已展开。点击中央牌背抽取第一张牌。");

    console.group("Arcana: Tarot wheel ready");
    console.log("Data source:", sourceUrl);
    console.log("IMAGE_BASE_URL:", IMAGE_BASE_URL);
    console.table(
      tarotCards.slice(0, 12).map((card) => ({
        中文名: card.chineseName,
        English: card.canonicalName,
        文件名: card.fileName,
        图片URL: card.imageUrl,
      })),
    );
    console.log("All normalized cards:", tarotCards);
    console.groupEnd();
    warmRemoteTarotData();
  } catch (error) {
    console.error("Arcana: tarot deck failed to initialize", error);
    updateStatus("牌库初始化失败，请检查控制台错误。");
    wheelLoading.textContent = "牌库载入失败";
  }
}

async function warmRemoteTarotData() {
  try {
    const remote = await fetchTarotData();
    console.info("Arcana: 远程开源牌库后台连接成功。", remote.sourceUrl);
  } catch (error) {
    console.info("Arcana: 远程开源牌库后台连接失败，当前继续使用本地完整牌库。", error);
  }
}

restartReadingButton?.addEventListener("click", resetReadingSession);

loadTarotCards();
