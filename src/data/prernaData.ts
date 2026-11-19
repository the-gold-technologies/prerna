export interface LifeAreaDetail {
  id: string;
  number: string;
  title: string;
  iconName: string;
  tagline: string;
  vedicInsight: {
    focus: string;
    planetaryFactors: string[];
    whatItReveals: string;
  };
  psychologyInsight: {
    focus: string;
    therapeuticApproach: string[];
    whatItReveals: string;
  };
  keyTriggerQuestion: string;
  sampleGuidanceOutcome: string;
}

export const LIFE_AREAS: LifeAreaDetail[] = [
  {
    id: "career",
    number: "01",
    title: "Career",
    iconName: "Briefcase",
    tagline: "Vocational Alignment & Professional Fulfillment",
    vedicInsight: {
      focus: "10th House (Karma Bhava), Sun, Saturn & Mercury Transits",
      planetaryFactors: ["Dasha Period timing for promotions", "Amatyakaraka soul career significator", "D10 Dasamsa vocational chart"],
      whatItReveals: "Pinpoints your true vocational dharma, auspicious career shifts, high-status windows, and karmic work roadblocks."
    },
    psychologyInsight: {
      focus: "Career Counselling & Cognitive Alignment",
      therapeuticApproach: ["Strengths-based coaching", "Burnout & impostor syndrome deconstruction", "Executive decision-making therapy"],
      whatItReveals: "Aligns your core psychological temperament with sustainable leadership, addressing subconscious workplace resistance."
    },
    keyTriggerQuestion: "Why do I feel unfulfilled despite steady career milestones?",
    sampleGuidanceOutcome: "Clarity on whether you are built for enterprise leadership, autonomous creation, or mission-driven work with exact transit timelines."
  },
  {
    id: "relationship",
    number: "02",
    title: "Relationship",
    iconName: "Heart",
    tagline: "Attachment Dynamics & Emotional Harmony",
    vedicInsight: {
      focus: "7th House (Kalatra Bhava), Venus & Mars Energy",
      planetaryFactors: ["Synastry chart overlay", "Manglik dosha assessment & neutralizers", "Navamsa (D9) relationship blueprint"],
      whatItReveals: "Maps interpersonal attraction karmas, emotional vulnerability cycles, and ideal partner energetic archetypes."
    },
    psychologyInsight: {
      focus: "Attachment Theory & Interpersonal Neurobiology",
      therapeuticApproach: ["Anxious-avoidant pattern unraveling", "Non-violent communication framing", "Shadow projection integration"],
      whatItReveals: "Helps you heal core abandonment or enmeshment wounds so love becomes a sanctuary instead of a trigger loop."
    },
    keyTriggerQuestion: "Why do I keep attracting the same emotionally unavailable partners?",
    sampleGuidanceOutcome: "Break unconscious relational scripts while understanding current astrological cycles affecting interpersonal peace."
  },
  {
    id: "marriage",
    number: "03",
    title: "Marriage",
    iconName: "Gem",
    tagline: "Sacred Partnership, Timing & Long-Term Union",
    vedicInsight: {
      focus: "D9 Navamsa Chart, 7th & 8th House Dynamics, Jupiter's Grace",
      planetaryFactors: ["Vivaha Muhurta (auspicious timing windows)", "Ashtakoota 36-Guna compatibility depth", "Upapada Lagna stability indicators"],
      whatItReveals: "Forecasts marriage timing, lifelong compatibility rhythms, family harmony vectors, and karmic union longevity."
    },
    psychologyInsight: {
      focus: "Couples & Marital Systems Therapy",
      therapeuticApproach: ["Gottman method conflict de-escalation", "Shared value system co-creation", "Family-of-origin baggage resolution"],
      whatItReveals: "Builds enduring emotional intimacy, transparent financial alignment, and mutual psychological safety."
    },
    keyTriggerQuestion: "When will the right marital window open, and how can we sustain lifelong mutual reverence?",
    sampleGuidanceOutcome: "A deep dual-lens roadmap to marital timing and conscious communication tools before or during wedlock."
  },
  {
    id: "health",
    number: "04",
    title: "Health",
    iconName: "Activity",
    tagline: "Somatic Balance, Vitality & Holistic Wellness",
    vedicInsight: {
      focus: "6th House (Roga Bhava), 1st House (Tanu Bhava), Ayurvedic Dosha Map",
      planetaryFactors: ["Ayurvedic element balance (Vata, Pitta, Kapha)", "Planetary afflictions on somatic vitality", "Restorative transit remedies"],
      whatItReveals: "Identifies systemic constitutional tendencies, organ system vulnerabilities, and optimal seasonal detox rhythms."
    },
    psychologyInsight: {
      focus: "Somatic Psychology & Stress Neurobiology",
      therapeuticApproach: ["Nervous system regulation (Vagus nerve)", "Psychosomatic tension release", "Mindfulness-based stress reduction"],
      whatItReveals: "Connects suppressed emotions, chronic anxiety loops, and grief directly to physical exhaustion or bodily aches."
    },
    keyTriggerQuestion: "Why does chronic exhaustion persist even when medical tests return normal?",
    sampleGuidanceOutcome: "Holistic revitalization reconciling cosmic elemental cycles with somatic nervous-system regulation."
  },
  {
    id: "education",
    number: "05",
    title: "Education",
    iconName: "GraduationCap",
    tagline: "Intellectual Mastery, Cognitive Styles & Academic Path",
    vedicInsight: {
      focus: "4th House (Vidya), 5th House (Buddhi), Mercury & Jupiter Placement",
      planetaryFactors: ["D24 Siddhamsa higher learning potential", "Auspicious exam & competitive testing windows", "Memory & focus planetary catalysts"],
      whatItReveals: "Identifies your child's or your own innate learning temperament (analytical, philosophical, visual, or intuitive)."
    },
    psychologyInsight: {
      focus: "Cognitive Psychology & Adolescent Mentorship",
      therapeuticApproach: ["Attention focus & executive function coaching", "Exam anxiety neutralization", "Intrinsic motivation discovery"],
      whatItReveals: "Removes academic dread, peer comparison shame, and equips students with tailored study and cognitive focus strategies."
    },
    keyTriggerQuestion: "Which educational stream aligns naturally with my innate intellect and future prosperity?",
    sampleGuidanceOutcome: "Strategic clarity for field-of-study selection, exam preparation stamina, and intellectual fulfillment."
  },
  {
    id: "family",
    number: "06",
    title: "Family",
    iconName: "Users",
    tagline: "Ancestral Harmonies, Parenting & Household Equilibrium",
    vedicInsight: {
      focus: "2nd House (Kula), 4th House (Matru/Griha), Pitru Dosha & Lineage Karma",
      planetaryFactors: ["Ancestral karmic influences (Pitru Karma)", "Inter-generational planetary patterns", "Domestic peace planetary alignments"],
      whatItReveals: "Reveals ancestral burdens, familial communication bottlenecks, and home environment energetic imbalances."
    },
    psychologyInsight: {
      focus: "Family Systems & Generational Trauma Healing",
      therapeuticApproach: ["Internal Family Systems (IFS)", "Parent-child dynamic restructuring", "Healthy boundary formulation"],
      whatItReveals: "Breaks multi-generational guilt cycles, parental friction, and reclaims a peaceful emotional domestic sanctuary."
    },
    keyTriggerQuestion: "How do I release generational trauma without alienating the family I love?",
    sampleGuidanceOutcome: "Unshakable boundaries rooted in compassion, dissolving ancestral friction with timeless grace."
  },
  {
    id: "money",
    number: "07",
    title: "Money",
    iconName: "Coins",
    tagline: "Wealth Creation, Abundance Mindset & Financial Timing",
    vedicInsight: {
      focus: "2nd (Dhana) & 11th (Labha) Houses, Dhana Yogas & Jupiter Aspects",
      planetaryFactors: ["Lakshmi Yogas and wealth accumulators", "Periods of sudden windfalls vs. expenditure containment", "Indu Lagna wealth strength analysis"],
      whatItReveals: "Forecasts your personal wealth cycles, optimal investment windows, and inherited wealth or sudden gain windows."
    },
    psychologyInsight: {
      focus: "Financial Psychology & Scarcity Mindset Deconditioning",
      therapeuticApproach: ["Money story & scarcity deconstruction", "Impulsive spending behavioral modification", "Worthiness & pricing confidence therapy"],
      whatItReveals: "Deconstructs subconscious poverty oaths, guilt around prosperity, and unearned anxiety over financial security."
    },
    keyTriggerQuestion: "Why does money slip away no matter how hard I work or how much I earn?",
    sampleGuidanceOutcome: "A psychological and astrological blueprint for sustainable financial sovereignty and wealth peace."
  },
  {
    id: "property",
    number: "08",
    title: "Property",
    iconName: "Home",
    tagline: "Real Estate, Asset Acquisition & Sanctuary Living",
    vedicInsight: {
      focus: "4th House (Bhoomi Karaka Mars), Saturn Stability, Vastu Directions",
      planetaryFactors: ["Mars strength for land and immovable assets", "Auspicious property registration muhurtas", "Vastu directional alignment principles"],
      whatItReveals: "Reveals optimal years for purchasing ancestral land, residential homes, or commercial developments."
    },
    psychologyInsight: {
      focus: "Environmental Psychology & Sanctuary Grounding",
      therapeuticApproach: ["Home space energetic psychology", "Decision paralysis during major capital commitments", "Rootedness & safety cultivation"],
      whatItReveals: "Assesses how physical living spaces alter emotional wellbeing, focus, and domestic nervous system calm."
    },
    keyTriggerQuestion: "When is the most auspicious time to buy my dream property, and will it bring serenity?",
    sampleGuidanceOutcome: "Precise astrological windows for real estate acquisition paired with environmental peace design."
  },
  {
    id: "abroad",
    number: "09",
    title: "Abroad",
    iconName: "Compass",
    tagline: "Foreign Relocation, Global Settlement & Cultural Crossings",
    vedicInsight: {
      focus: "9th House (Long journeys), 12th House (Foreign residence), Rahu Placements",
      planetaryFactors: ["Rahu-Jupiter dasha foreign travel catalysts", "Permanent residency vs. temporary assignment indications", "Cross-continental directional alignment"],
      whatItReveals: "Identifies whether your prosperity multiplies across oceans and the precise astrological windows for visas and emigration."
    },
    psychologyInsight: {
      focus: "Acculturation Psychology & Cross-Border Identity Shift",
      therapeuticApproach: ["Expat grief & cultural displacement therapy", "Rootlessness vs. global belonging integration", "Long-distance family emotional tethering"],
      whatItReveals: "Provides emotional grounding during foreign relocation, neutralizing isolation and culture shock."
    },
    keyTriggerQuestion: "Should I permanently migrate abroad, or is my fortune meant to thrive in my homeland?",
    sampleGuidanceOutcome: "Decisive guidance on foreign visa/settlement windows and internal resilience strategies for life abroad."
  },
  {
    id: "growth",
    number: "10",
    title: "Life Success & Growth",
    iconName: "TrendingUp",
    tagline: "Holistic Expansion, Peak Potential & Soul Purpose",
    vedicInsight: {
      focus: "1st (Lagna), 9th (Dharma Bhava) & 10th (Karma) Dharma-Karma Adhipati Yogas",
      planetaryFactors: ["Atmakaraka (Soul's innermost yearning)", "Raja Yogas for public recognition and dignity", "Spiritual awakening planetary triggers"],
      whatItReveals: "Decodes your ultimate life destiny, legacy creation, and spiritual-material synchronicity."
    },
    psychologyInsight: {
      focus: "Humanistic & Transpersonal Psychology (Self-Actualization)",
      therapeuticApproach: ["Maslow's self-actualization pathway", "Logotherapy (meaning-centered living)", "Peak performance flow states"],
      whatItReveals: "Elevates you from mere survival to joyful flourishing, transcending fear of the unknown."
    },
    keyTriggerQuestion: "What is my highest soul potential, and how do I live with authentic presence every day?",
    sampleGuidanceOutcome: "Unification of ambition, inner tranquility, and deep meaningful contribution to the world."
  }
];

export const THREE_PILLARS = [
  {
    id: "astrology",
    number: "01",
    title: "Astrology",
    subtitle: "The Cosmic Blueprint & Timing",
    badge: "Vedic Cosmic Science",
    accentColor: "from-[#d4af37]/20 to-[#d4af37]/5",
    borderColor: "border-[#d4af37]/40",
    textColor: "text-[#fae8a4]",
    description:
      "Ancient Vedic astrology provides an objective cosmological map of your innate tendencies, karmic debts, and auspicious timing cycles.",
    features: [
      { name: "Birth Chart (Kundli)", desc: "Calculated with exact planetary positions at your precise moment of arrival." },
      { name: "Planetary Insights & Dashas", desc: "Understand current planetary seasons governing love, fortune, and challenges." },
      { name: "Compatibility Analysis", desc: "Synastry and deep energetic alignment for relationships and partnerships." },
      { name: "Personalised Horoscopes", desc: "Actionable foresight to navigate personal and professional inflection points." }
    ]
  },
  {
    id: "psychology",
    number: "02",
    title: "Psychology",
    subtitle: "The Emotional Mind & Cognitive Clarity",
    badge: "Evidence-Based Guidance",
    accentColor: "from-[#e07a5f]/20 to-[#e07a5f]/5",
    borderColor: "border-[#e07a5f]/40",
    textColor: "text-[#fbc4b0]",
    description:
      "Modern therapeutic frameworks uncover unconscious behavioral patterns, emotional triggers, and relational attachment scripts.",
    features: [
      { name: "Self-Assessment Diagnostic", desc: "Scientific psychometric questionnaires decoding cognitive styles." },
      { name: "Personality & Shadow Work", desc: "Unpack suppressed desires, defenses, and conscious self-worth." },
      { name: "Emotional Pattern Deconstruction", desc: "Identify recurring anxiety loops, burnout triggers, and grief." },
      { name: "Relationship Scripts", desc: "Transform attachment dynamics from reactive friction to mutual security." }
    ]
  },
  {
    id: "spirituality",
    number: "03",
    title: "Spirituality",
    subtitle: "Inner Stillness & Transpersonal Balance",
    badge: "Sacred Inner Alignment",
    accentColor: "from-[#5e8b7e]/25 to-[#5e8b7e]/5",
    borderColor: "border-[#5e8b7e]/40",
    textColor: "text-[#a7d7c5]",
    description:
      "The grounding bridge that transmutes insights into daily peace through mindfulness, elemental grounding, sound healing, and breath.",
    features: [
      { name: "Holistic Energy Healing", desc: "Balance the subtle energetic meridians and constitutional doshas." },
      { name: "Elemental & Sound Insights", desc: "Harness acoustic frequencies, mantras, and nature elements for restoration." },
      { name: "Mindfulness & Breathwork", desc: "Daily rituals to anchor nervous system calm amidst chaotic modern life." },
      { name: "Inner Peace & Purpose", desc: "Connect with your sacred center beyond transient titles and worldly pressures." }
    ]
  }
];

export const CORE_UNDERSTANDINGS = [
  {
    title: "Personality",
    icon: "UserCheck",
    theme: "Who You Truly Are",
    confusion: "Feeling fragmented or wearing exhausting masks to please society and family.",
    clarity: "A crystalline synthesis of your astrological ascendant and psychological archetypes.",
    stat: "Uncover Innate Essence"
  },
  {
    title: "Relationships",
    icon: "HeartHandshake",
    theme: "Why You Connect & Clash",
    confusion: "Repeating painful communication breakdowns and emotional distancing.",
    clarity: "Decode synastry energies alongside attachment styles to nurture conscious partnership.",
    stat: "Resolve Toxic Cycles"
  },
  {
    title: "Life Direction",
    icon: "Compass",
    theme: "Your True North",
    confusion: "Paralysis by infinite options or drifting aimlessly without conviction.",
    clarity: "Uncover your soul's 10th house dharma and career timeline to move forward with certainty.",
    stat: "Chart Your Dharma"
  },
  {
    title: "Emotional Patterns",
    icon: "Waves",
    theme: "Inner Weather Mastery",
    confusion: "Being hijacked by sudden mood swings, chronic dread, or unresolved resentment.",
    clarity: "Trace subconscious roots to emotional triggers and learn somatic grounding rituals.",
    stat: "Attain Emotional Sovereignty"
  },
  {
    title: "Personal Growth",
    icon: "Sparkles",
    theme: "The Evolution of Soul",
    confusion: "Plateauing despite consuming endless self-help books and seminars.",
    clarity: "Tailored 1-on-1 psychospiritual transformation that integrates wisdom into lived habit.",
    stat: "Sustained Self-Actualization"
  }
];

export const DISCOVERY_STAGES = [
  {
    step: "1",
    title: "Know Yourself",
    subtitle: "The Raw Blueprint",
    description: "Map your birth chart coordinates and establish baseline psychological archetypes.",
    tools: ["Vedic Kundli Baseline", "Pythagorean Life Path", "Temperament Diagnostic"],
    deliverable: "Core Identity Blueprint"
  },
  {
    step: "2",
    title: "Understand Your Patterns",
    subtitle: "The Karmic Loops",
    description: "Deconstruct why certain failures, emotional reactions, and relationship loops recur.",
    tools: ["Planetary Dasha Cycles", "Subconscious Script Analysis", "Somatic Stress Mapping"],
    deliverable: "Pattern Deconstruction Matrix"
  },
  {
    step: "3",
    title: "Relationships",
    subtitle: "The Mirror of Others",
    description: "Analyze the energetic exchange and relational bonds with partners, parents, and peers.",
    tools: ["Synastry Planetary Map", "Attachment Style Audit", "Boundary Construction Guide"],
    deliverable: "Conscious Relationship Framework"
  },
  {
    step: "4",
    title: "Strengths",
    subtitle: "Your Innate Power",
    description: "Illuminate hidden talents, cognitive advantages, and your authentic life superpower.",
    tools: ["Atmakaraka & 5th House Talents", "Cognitive Strengths Inventory", "Creative Energy Assessment"],
    deliverable: "Empowerment & Dharma Dossier"
  },
  {
    step: "5",
    title: "Life Direction",
    subtitle: "The Timed Roadmap",
    description: "Synthesize vocational ambitions with planetary transit windows for peak impact.",
    tools: ["10th House Karma Transit", "Executive Life Planning", "Muhurta Timing Strategy"],
    deliverable: "Strategic Life Progression Plan"
  },
  {
    step: "6",
    title: "Purpose & Peace",
    subtitle: "The Living Synthesis",
    description: "Anchor lifelong serenity through meditation, daily rituals, and 1-on-1 consultation.",
    tools: ["Personalised Mantra & Sound", "Daily Peace Rituals", "1-on-1 Integration Guidance"],
    deliverable: "Lifelong Inner Sanctuary"
  }
];

export const TRIGGERING_QUESTIONS = [
  {
    id: "q1",
    question: "Why do certain painful relationship patterns repeat no matter what I try?",
    preview: "It's rarely bad luck — it's an unintegrated astrological synastry meeting an unconscious attachment wound.",
    fullAnswer:
      "Vedic astrology reveals your 7th house and Venus-Rahu alignments, highlighting which energetic lessons your soul is drawn to resolve. Concurrently, psychological therapy identifies early attachment conditioning where love was paired with anxiety. When both are seen together in PRERNA, the cycle breaks permanently."
  },
  {
    id: "q2",
    question: "Am I on the right career path, or am I living someone else's dream?",
    preview: "External accomplishments often mask an internal spiritual bankruptcy.",
    fullAnswer:
      "By analyzing your 10th House of Karma, Amatyakaraka planet, and current Dasha timelines, we distinguish between high-income societal expectation versus genuine vocational dharma. Psychological counselling then removes fear of transition, paving a safe bridge to your true calling."
  },
  {
    id: "q3",
    question: "Why do I feel an unexplainable void even when everything looks fine on paper?",
    preview: "The soul demands alignment that material comfort alone cannot satisfy.",
    fullAnswer:
      "This spiritual friction often coincides with major planetary transitions like Saturn's Sade Sati or Ketu periods, signaling a necessary inward turn. PRERNA provides mindfulness, somatic grounding, and transpersonal therapy to turn emptiness into sacred presence."
  },
  {
    id: "q4",
    question: "Is this the right time to relocate abroad, buy property, or start a new venture?",
    preview: "Timing in life is not accidental; it ebbs and flows in cosmic rhythm.",
    fullAnswer:
      "Action taken during discordant planetary cycles requires tenfold effort with meager results. PRERNA calculates your auspicious Muhurta and dasha windows across all 10 life areas so you invest energy precisely when the universe supports expansion."
  }
];

export const REPORT_CHAPTERS = [
  { no: "01", title: "Personal Birth & Astrological Data", desc: "Precise planetary longitude, degrees, houses, and divisional charts (D1 & D9)." },
  { no: "02", title: "Planetary & Zodiac Insights", desc: "Detailed breakdown of ruling planets, current Mahadasha, and sub-period influences." },
  { no: "03", title: "Relationship Analysis & Synastry", desc: "Relational tendencies, emotional attachment dynamics, and partner compatibility vectors." },
  { no: "04", title: "Major Life Areas Overview", desc: "Holistic status check across health, finances, family harmony, and spiritual evolution." },
  { no: "05", title: "Career & Growth Trajectory", desc: "Vocational peaks, optimal transition windows, and enterprise leadership archetypes." },
  { no: "06", title: "Money, Family & Education", desc: "Wealth retention yogas, ancestral harmony recommendations, and learning styles." },
  { no: "07", title: "Personalised Recommendations", desc: "Practical behavioral habits, communication modifications, and cognitive tools." },
  { no: "08", title: "Balancing & Healing Techniques", desc: "Somatic grounding, elemental alignment, Vedic gemstones, and sound therapies." },
  { no: "09", title: "Weekly Horoscope & Ongoing Insights", desc: "Real-time planetary transit notifications and dynamic personal evolution prompts." }
];

// Pythagorean Numerology Core Helper
export function calculatePythagoreanNumerology(name: string, dobString: string) {
  // 1. Life Path Number from DOB (YYYY-MM-DD)
  const dobClean = dobString.replace(/\D/g, "");
  let lifePath = 0;
  if (dobClean.length >= 8) {
    const year = dobClean.slice(0, 4);
    const month = dobClean.slice(4, 6);
    const day = dobClean.slice(6, 8);

    const reduceNum = (val: string): number => {
      let sum = val.split("").reduce((acc, c) => acc + parseInt(c, 10), 0);
      while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
        sum = sum
          .toString()
          .split("")
          .reduce((acc, c) => acc + parseInt(c, 10), 0);
      }
      return sum;
    };

    const rYear = reduceNum(year);
    const rMonth = reduceNum(month);
    const rDay = reduceNum(day);

    let total = rYear + rMonth + rDay;
    while (total > 9 && total !== 11 && total !== 22 && total !== 33) {
      total = total
        .toString()
        .split("")
        .reduce((acc, c) => acc + parseInt(c, 10), 0);
    }
    lifePath = total;
  } else {
    lifePath = 7; // default
  }

  // 2. Pythagorean Letter Chart
  const pythagoreanMap: Record<string, number> = {
    a: 1, j: 1, s: 1,
    b: 2, k: 2, t: 2,
    c: 3, l: 3, u: 3,
    d: 4, m: 4, v: 4,
    e: 5, n: 5, w: 5,
    f: 6, o: 6, x: 6,
    g: 7, p: 7, y: 7,
    h: 8, q: 8, z: 8,
    i: 9, r: 9
  };

  const vowels = new Set(["a", "e", "i", "o", "u"]);
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, "");

  let destinySum = 0;
  let soulUrgeSum = 0;

  for (const char of cleanName) {
    const val = pythagoreanMap[char] || 0;
    destinySum += val;
    if (vowels.has(char)) {
      soulUrgeSum += val;
    }
  }

  const reduceToSingleOrMaster = (n: number): number => {
    while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
      n = n
        .toString()
        .split("")
        .reduce((acc, c) => acc + parseInt(c, 10), 0);
    }
    return n;
  };

  const destinyNumber = cleanName.length > 0 ? reduceToSingleOrMaster(destinySum) : 1;
  const soulUrgeNumber = soulUrgeSum > 0 ? reduceToSingleOrMaster(soulUrgeSum) : 3;

  // Archetypes for Life Path Numbers
  const archetypes: Record<number, {
    title: string;
    rulingPlanet: string;
    element: string;
    tagline: string;
    essence: string;
    strengths: string[];
    shadow: string;
    careerGuidance: string;
    spiritualPractice: string;
  }> = {
    1: {
      title: "The Pioneer & Visionary Leader",
      rulingPlanet: "Sun (Surya)",
      element: "Fire",
      tagline: "Originality, Independence & Fearless Willpower",
      essence: "You carry the primal spark of inception. Your destiny is to carve untrodden paths where others hesitate.",
      strengths: ["Unyielding drive", "Decisive executive clarity", "Natural trailblazer charisma"],
      shadow: "Impatience with slower minds, fear of vulnerability, risk of burnout through stubborn self-reliance.",
      careerGuidance: "Entrepreneurship, high-stakes leadership, architecture of innovative platforms.",
      spiritualPractice: "Surya Namaskar at dawn and silent contemplation to ground fiery ego into calm presence."
    },
    2: {
      title: "The Peacemaker & Intuitive Diplomat",
      rulingPlanet: "Moon (Chandra)",
      element: "Water",
      tagline: "Empathy, Harmony & Subconscious Depth",
      essence: "You perceive emotional currents before words are spoken. You unite opposites into synergistic grace.",
      strengths: ["Profound psychological empathy", "Master mediator", "Sensory & aesthetic subtlety"],
      shadow: "People-pleasing, over-absorption of collective sadness, passivity when firm confrontation is required.",
      careerGuidance: "Psychotherapy, diplomacy, strategic counsel, creative arts and healing sciences.",
      spiritualPractice: "Chandra meditation near still water, heart-chakra breathwork, and energetic boundary shields."
    },
    3: {
      title: "The Creative Catalyst & Expressive Sage",
      rulingPlanet: "Jupiter (Guru)",
      element: "Air / Ether",
      tagline: "Joyful Expression, Wisdom & Magnetic Optimism",
      essence: "You channel creative electricity into the world, inspiring others through prose, voice, and radiant light.",
      strengths: ["Inspiring articulation", "Boundless optimism", "Rapid creative synthesis"],
      shadow: "Scattered creative focus, fear of deep melancholy, superficial distraction when bored.",
      careerGuidance: "Writing, performance, brand vision, transformative mentorship, cultural synthesis.",
      spiritualPractice: "Vocal mantra chanting, expressive journaling, and grounding barefoot in fertile soil."
    },
    4: {
      title: "The Master Architect & Bedrock",
      rulingPlanet: "Rahu / Uranus",
      element: "Earth",
      tagline: "Precision, Relentless Discipline & Structural Integrity",
      essence: "You convert intangible visions into timeless physical reality. You build systems that outlast generations.",
      strengths: ["Unshakable reliability", "Organizational genius", "Methodical persistence"],
      shadow: "Rigidity in times of chaos, skepticism toward the mystical, overworking to feel secure.",
      careerGuidance: "Systems engineering, asset management, architecture, operational infrastructure.",
      spiritualPractice: "Walking meditations in old-growth forests, grounding breathwork, and learning to surrender control."
    },
    5: {
      title: "The Dynamic Explorer & Alchemist",
      rulingPlanet: "Mercury (Budha)",
      element: "Air",
      tagline: "Freedom, Versatility & Transformational Velocity",
      essence: "You are the cosmic nomad, learning through diverse cultures, sudden pivot points, and sensual curiosity.",
      strengths: ["Lightning cognitive adaptability", "Fearless reinvention", "Magnetic communicator"],
      shadow: "Restlessness, commitment anxiety, escapism when discipline is demanded.",
      careerGuidance: "Global journalism, international relations, venture capital, investigative analysis.",
      spiritualPractice: "Breath retention (Pranayama) to calm an over-stimulated nervous system and sensory fasts."
    },
    6: {
      title: "The Sacred Guardian & Nurturing Healer",
      rulingPlanet: "Venus (Shukra)",
      element: "Earth / Water",
      tagline: "Devotion, Aesthetic Grace & Community Sanctuary",
      essence: "You infuse sacred beauty, moral dignity, and compassionate holding into homes, teams, and communities.",
      strengths: ["Radical maternal/paternal shelter", "Aesthetic discernment", "Harmonious conflict resolution"],
      shadow: "Martyr syndrome, meddling disguised as help, chronic self-neglect in service of others.",
      careerGuidance: "Family counselling, medicine, sustainable community design, elevated hospitality.",
      spiritualPractice: "Sound bath with Tibetan singing bowls, devotional Bhakti practices, and self-compassion meditation."
    },
    7: {
      title: "The Mystical Seeker & Truth Analyst",
      rulingPlanet: "Ketu / Neptune",
      element: "Water / Ether",
      tagline: "Esoteric Wisdom, Deep Solitude & Scientific Penetration",
      essence: "You look past the illusion of the material world. You require deep solitude to commune with ultimate truth.",
      strengths: ["Piercing intellectual insight", "Occult & metaphysical intuition", "Immunity to shallow flattery"],
      shadow: "Emotional cynicism, aloof isolation, struggling to express tender feelings in romance.",
      careerGuidance: "Esoteric philosophy, psychoanalysis, deep tech R&D, spiritual teaching, investigative science.",
      spiritualPractice: "Silent Vipassana meditation, nocturnal star-gazing, and Third Eye (Ajna) focus."
    },
    8: {
      title: "The Sovereign Manifestor & Powerhouse",
      rulingPlanet: "Saturn (Shani)",
      element: "Earth / Fire",
      tagline: "Authority, Karmic Justice & Material-Spiritual Mastery",
      essence: "You understand the laws of cause and effect, material stewardship, and enduring worldly power.",
      strengths: ["High-stakes governance", "Karmic fairness", "Resource stewardship & wealth accumulation"],
      shadow: "Authoritarian control, measuring self-worth solely through net worth, fear of powerlessness.",
      careerGuidance: "Institutional leadership, sovereign funds, judicial law, heavy infrastructure, ethical capitalism.",
      spiritualPractice: "Karma yoga (selfless service without attachment to fruits) and humbling pranams before nature."
    },
    9: {
      title: "The Universal Humanitarian & Bodhisattva",
      rulingPlanet: "Mars (Mangala) / Sun",
      element: "Fire / Ether",
      tagline: "Transcendent Compassion, Global Healing & Completion",
      essence: "You represent the culmination of all life numbers. Your heart beats for the liberation of the collective.",
      strengths: ["Universal empathy without prejudice", "Soulful artistry", "Uncompromising ethical compass"],
      shadow: "Carrying the grief of the entire world, difficulty with personal boundaries, dramatic disillusionment.",
      careerGuidance: "Non-profit foundations, international policy, creative masterpieces, spiritual guidance.",
      spiritualPractice: "Tonglen compassion meditation (breathing in suffering, breathing out golden healing light)."
    },
    11: {
      title: "The Master Illuminator (Master Number 11)",
      rulingPlanet: "Moon & Neptune",
      element: "Ether",
      tagline: "Spiritual Channel, High Frequency & Visionary Revelation",
      essence: "A direct antenna to the cosmic mind. You transmit profound intuitive revelations to awaken human consciousness.",
      strengths: ["Clairvoyant intuition", "Charismatic spiritual presence", "Transformational catalyst for others"],
      shadow: "Extreme nervous sensitivity, overwhelming anxiety, self-doubt when overwhelmed by sensory input.",
      careerGuidance: "Spiritual mentorship, visionary author, avant-garde design, transpersonal psychology.",
      spiritualPractice: "Daily aura shielding, grounding with black tourmaline, and silent contemplation in sacred spaces."
    },
    22: {
      title: "The Master Builder (Master Number 22)",
      rulingPlanet: "Saturn & Uranus",
      element: "Earth & Ether",
      tagline: "Manifesting the Impossible into Global Infrastructure",
      essence: "The highest practical power. You can take the grandest spiritual ideals and turn them into tangible planetary institutions.",
      strengths: ["Monumental vision execution", "Unmatched organizational scope", "Incorruptible integrity"],
      shadow: "Crushing weight of self-imposed responsibility, fear of disappointing the world.",
      careerGuidance: "Global foundations, architectural wonders, educational revolutions, sustainable ecosystems.",
      spiritualPractice: "Root-to-Crown chakra alignment, surrender rituals, and deep restorative sleep rituals."
    },
    33: {
      title: "The Master Teacher & Avatar of Grace (Master Number 33)",
      rulingPlanet: "Jupiter & Venus",
      element: "Pure Light",
      tagline: "Christ/Krishna Consciousness, Pure Compassion & Divine Upliftment",
      essence: "The rarest frequency. You exist to selflessly uplift human suffering through total devotion to love and spiritual truth.",
      strengths: ["Radiant Christ-like empathy", "Instant healing presence", "Profound spiritual wisdom"],
      shadow: "Martyrdom, emotional overwhelm by human suffering, feeling alienated from worldly games.",
      careerGuidance: "Spiritual sanctuary leadership, world healing, sacred music, universal mentorship.",
      spiritualPractice: "Maha-Mritunjaya mantra, universal prayer, and total surrender to the Supreme Grace."
    }
  };

  const archetype = archetypes[lifePath] || archetypes[7];

  return {
    lifePathNumber: lifePath,
    destinyNumber,
    soulUrgeNumber,
    archetype
  };
}
