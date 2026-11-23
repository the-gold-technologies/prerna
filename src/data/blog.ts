/* Starter articles for the PRERNA journal. Replace or extend from the CMS later. */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export type Category = "Astrology" | "Psychology" | "Spirituality";

export type Post = {
  slug: string;
  title: string;
  category: Category;
  excerpt: string;
  image: string;
  imageAlt: string;
  date: string; // ISO
  readMinutes: number;
  body: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "what-your-moon-sign-says-about-your-emotions",
    title: "What your Moon sign says about your emotions",
    category: "Astrology",
    excerpt:
      "In Vedic astrology the Moon, not the Sun, describes your mind. Here is how your Moon sign shapes the way you feel, react and recover.",
    image: "/images/night-sky.jpg",
    imageAlt: "A violet night sky full of stars above a mountain ridge",
    date: "2026-11-18",
    readMinutes: 10,
    body: [
      {
        type: "p",
        text: "Most people know their Sun sign. In Jyotisha, the ancient Vedic system of astrology, the Moon sign (Chandra Rashi) often matters far more for your day-to-day emotional life. While the Sun describes your core soul purpose, external vitality, and the father archetype, the Moon represents the receptive consciousness: Manas, the emotional mind, sensory perception, and your subconscious reflexes.",
      },
      {
        type: "p",
        text: "Because the Moon moves through the entire zodiac in roughly twenty-seven days—spending approximately two and a half days in each sign—it offers a far more intimate, fluid, and personalized map of your inner weather than the slower-moving outer planets ever could.",
      },
      { type: "h2", text: "Why the Moon, not the Sun" },
      {
        type: "p",
        text: "In classical Sanskrit texts, Chandra is called the karaka (significator) of the mother, the ocean, memory, nourishment, and psychological peace. When you encounter stress, heartbreak, unexpected changes, or quiet moments alone before sleep, it is not your Sun sign that reacts—it is your Moon sign.",
      },
      {
        type: "p",
        text: "Understanding your Moon sign helps you understand how you self-soothe, what makes you feel safe in relationships, and why certain environments restore you while others deplete your energy within minutes.",
      },
      { type: "h2", text: "How the four elements process emotion" },
      {
        type: "p",
        text: "The twelve signs of the zodiac fall into four elemental groups, each processing emotional reality through a distinct physiological and psychological lens:",
      },
      {
        type: "list",
        items: [
          "Fire Moons (Aries, Leo, Sagittarius): Emotions ignite swiftly and burn bright. You process feelings through physical movement, creative expression, and immediate action. You recover quickly, provided you do not suppress your initial flame.",
          "Earth Moons (Taurus, Virgo, Capricorn): Emotions need time, practical grounding, and tangible reassurance. You process feelings by organizing your physical space, establishing steady routines, and seeking long-term security before opening up.",
          "Air Moons (Gemini, Libra, Aquarius): Emotions are processed through intellect, dialogue, and cognitive spaciousness. You feel safe when you can articulate your experience, exchange ideas, and find perspective from a calm mental distance.",
          "Water Moons (Cancer, Scorpio, Pisces): Emotions are vast, oceanic, and deeply somatic. You absorb the psychic atmosphere of rooms and companions. You need quiet retreat, water, and gentle creative release to unburden what you feel.",
        ],
      },
      {
        type: "quote",
        text: "Knowing your Moon is not about labelling your feelings. It is about meeting yourself with patience.",
      },
      { type: "h2", text: "Dignities: Exaltation and debilitation" },
      {
        type: "p",
        text: "In Vedic astrology, the Moon is considered exalted in Taurus (Vrishabha), especially within the gentle, fertile lunar mansion of Rohini. Here, the fluid, ever-changing nature of the Moon finds a stable, lush earthen container. An exalted Moon tends to have an inherent ability to nurture itself, enjoy sensory beauty without desperation, and maintain a quiet inner reservoir of calm.",
      },
      {
        type: "p",
        text: "Conversely, the Moon is in debilitation in Scorpio (Vrishchika). This does not mean bad luck; rather, it indicates an intense emotional landscape where feelings run subterranean and transformative. A Scorpio Moon often experiences life at extreme emotional depth, learning through life's trials how to transmute vulnerability into profound psychological resilience and healing power.",
      },
      { type: "h2", text: "Where psychology meets the chart" },
      {
        type: "p",
        text: "When modern somatic psychology observes how trauma and emotional memory reside in the nervous system, it mirrors what Vedic sages observed thousands of years ago. A Water Moon who feels drained after a crowded gathering is not being 'oversensitive'—their nervous system is biologically wired to register subtle emotional micro-expressions.",
      },
      {
        type: "p",
        text: "Similarly, a Capricorn Moon who becomes quiet, detached, and pragmatic during times of crisis is not being 'cold'—they are instinctively conserving psychological energy to protect those they love. Seeing this pattern removes guilt and opens the door to self-compassion.",
      },
      { type: "h2", text: "Daily lunar grounding practices" },
      {
        type: "p",
        text: "To harmonize your natal Moon sign and maintain emotional equanimity, consider these simple, time-tested practices:",
      },
      {
        type: "list",
        items: [
          "Drink warm water from a pure silver or ceramic vessel in the morning to calm emotional agitation.",
          "Observe the phases of the Moon, taking extra rest on Amavasya (new moon) and meditating on Purnima (full moon).",
          "Spend five minutes each evening journaling unedited thoughts onto paper, letting your emotional mind empty before resting.",
          "Practice Chandra Bhedana pranayama (left nostril breathing) when mental chatter and anxiety run high.",
        ],
      },
    ],
  },
  {
    slug: "understanding-your-patterns-in-relationships",
    title: "Why the same relationship patterns keep returning",
    category: "Psychology",
    excerpt:
      "If you keep meeting the same kind of partner, or the same kind of argument, it is rarely bad luck. Here is what is usually happening underneath.",
    image: "/images/connection.jpg",
    imageAlt: "Two hands reaching towards each other",
    date: "2026-11-11",
    readMinutes: 11,
    body: [
      {
        type: "p",
        text: "Many people arrive at counselling or an astrology consultation with the exact same quiet, exhausted question: 'Why does this keep happening to me?' Different partner, different city, different job—yet after six months, the exact same argument erupts, the same cold distance sets in, or the same painful ending unfolds.",
      },
      {
        type: "p",
        text: "Psychology calls this the repetition compulsion: our subconscious drive to replay unresolved childhood emotional dynamics in our adult relationships, hoping that this time we will achieve a different, redemptive conclusion. It is rarely bad luck; it is an unconscious compass pointing directly toward what still needs to heal.",
      },
      { type: "h2", text: "Patterns are learned, not chosen" },
      {
        type: "p",
        text: "Our earliest relationships teach our nervous system what closeness feels like. If love in your early family came paired with unpredictability, criticism, or silent withdrawals, your nervous system learns that volatility equals connection. Later in adulthood, when you meet an emotionally stable, consistent, and genuinely peaceful person, you may unconsciously find them 'boring' or feel a lack of 'chemistry.'",
      },
      {
        type: "p",
        text: "What we call intense romantic chemistry is often our nervous system recognizing a familiar blueprint of unresolved tension. We are drawn not to what is objectively healthiest for us, but to what feels most like home.",
      },
      { type: "h2", text: "The three classic relationship loops" },
      {
        type: "list",
        items: [
          "The Pursuer-Distancer Dance: One partner feels an anxious spike of insecurity and reaches forward with demands, texts, or questions; the other partner feels overwhelmed, claustrophobic, and steps backward. Each partner's defensive reaction reinforces the other's deepest fear.",
          "The Over-Functioner and Under-Functioner: One partner assumes the role of household manager, emotional caretaker, and planner, while secretly building resentment that no one anticipates their needs. The other partner abdicates responsibility, feeling micromanaged and inadequate.",
          "The Availability Paradox: Being chronically drawn to partners who are emotionally unavailable, married, geographically distant, or inconsistent. This dynamic safely allows you to crave deep intimacy without having to face the terrifying vulnerability of real commitment.",
        ],
      },
      {
        type: "quote",
        text: "You cannot change a pattern you cannot see. Seeing it clearly is already change.",
      },
      {
        type: "h2",
        text: "The astrological mirror: Venus, Mars, and the 7th house",
      },
      {
        type: "p",
        text: "In Vedic astrology, relationships are examined through the 7th house of your birth chart (the house of partnerships), alongside Venus (Shukra, the karaka of love, devotion, and beauty) and Mars (Mangala, the planet of personal will, boundaries, and passion).",
      },
      {
        type: "p",
        text: "When Rahu (the north node of obsession) sits in the 7th house, there is often a tendency to project idealized fantasies onto partners, leading to sudden disillusionment. When Ketu sits in the 7th house, there may be a chronic feeling of detachment or an unconscious belief that relationships are fleeting and inherently disappointing.",
      },
      {
        type: "p",
        text: "Knowing your planetary placements does not lock you into a rigid destiny; it illuminates your emotional blind spots so that you can choose conscious awareness over automated repetition.",
      },
      { type: "h2", text: "Practical steps to break the cycle" },
      {
        type: "p",
        text: "Breaking a generational relationship pattern requires gentle, steady work across mind, body, and conversation:",
      },
      {
        type: "list",
        items: [
          "Notice the physical sensation in your body before you react: a tight throat, a hollow stomach, or clenched fists are early indicators of an activated trigger.",
          "Take a mandatory 90-second pause before responding during heated arguments to allow the amygdala's fight-or-flight flood to recede.",
          "Replace accusatory 'You always' statements with vulnerable 'I feel anxious when' statements.",
          "Ask yourself: 'Am I reacting to what my partner just said, or to what happened to me twenty years ago?'",
        ],
      },
    ],
  },
  {
    slug: "a-beginners-guide-to-mindful-breathing",
    title: "A beginner's guide to mindful breathing",
    category: "Spirituality",
    excerpt:
      "Five minutes, no equipment, no experience needed. A simple breathing practice to steady the mind before a hard conversation or a long day.",
    image: "/images/meditation.jpg",
    imageAlt: "A person meditating at sunrise",
    date: "2026-11-04",
    readMinutes: 9,
    body: [
      {
        type: "p",
        text: "Breath is the only vital function of the human autonomic nervous system that operates entirely automatically yet can be commandeered consciously at any given moment. You cannot command your liver to filter or your gallbladder to release, but you can deliberately double the length of your exhalation.",
      },
      {
        type: "p",
        text: "In the Yogic and Vedic traditions, breath is known as Prana: the subtle life-force energy that bridges the physical body (Annamaya Kosha) with the mental and emotional body (Manomaya Kosha). When the breath is shallow, fast, and chest-driven, the mind races with anxiety. When the breath becomes slow, smooth, and diaphragmatic, the brain receives an irrefutable biological signal that survival is secure.",
      },
      { type: "h2", text: "The physiological science of the exhale" },
      {
        type: "p",
        text: "Every time you inhale, your diaphragm moves down, creating more space in the chest cavity and causing the heart to expand slightly. To maintain circulation, the brain sends a signal via the sympathetic nervous system to increase the heart rate slightly. Every time you exhale, the diaphragm moves up, compressing the heart cavity slightly, causing the vagus nerve to release acetylcholine and slow the heart rate down.",
      },
      {
        type: "p",
        text: "This phenomenon, known as Respiratory Sinus Arrhythmia, proves that a deliberately lengthened exhalation is an instantaneous chemical brake on anxiety and stress hormones.",
      },
      { type: "h2", text: "The 4-2-6 Grounding Practice" },
      {
        type: "p",
        text: "You need no incense, special clothing, or years of meditation experience to practice this sequence. Five minutes in a chair is all that is required:",
      },
      {
        type: "list",
        items: [
          "Sit comfortably with your spine upright, shoulders dropped away from the ears, and both feet flat on the floor.",
          "Inhale smoothly through the nose for a mental count of four, feeling the belly and lower ribs expand outward.",
          "Pause gently at the top of the breath for a quiet count of two, keeping your throat relaxed.",
          "Exhale slowly and steadily through the nose for an extended count of six, feeling the navel gently draw back toward the spine.",
          "Repeat for ten to fifteen cycles, letting each breath feel softer and quieter than the last.",
        ],
      },
      {
        type: "quote",
        text: "A longer out-breath is a quiet message to the body: you can rest now.",
      },
      { type: "h2", text: "What to do when thoughts intrude" },
      {
        type: "p",
        text: "Beginners often mistakenly believe that successful breathwork requires a completely empty mind. In truth, the mind was built to think, generate associations, and scan for danger. When a distracting thought arises—such as an unfinished email or a memory—do not fight it or label yourself a failure.",
      },
      {
        type: "p",
        text: "Simply acknowledge the thought with kindness: 'Thinking is happening.' Then gently escort your attention back to the physical sensation of cool air entering the tip of your nostrils and warm air exiting. Each time you bring wandering attention back, you strengthen mental resilience, exactly like lifting a weight in physical training.",
      },
      { type: "h2", text: "Daily ritual integration" },
      {
        type: "p",
        text: "Do not wait for a full-blown panic attack to practice mindful breathing. Integrate sixty seconds of diaphragmatic breathing into natural daily transitions: while your morning tea steeps, right before you start your car's engine, or as you step into bed at night.",
      },
    ],
  },
  {
    slug: "dashas-explained-the-seasons-of-your-life",
    title: "Dashas explained: the seasons of your life",
    category: "Astrology",
    excerpt:
      "Why do some years feel like effortless growth and others like slow uphill work? Vedic astrology answers with the dasha system.",
    image: "/images/sunrise-water.jpg",
    imageAlt: "A person with open arms at sunrise, reflected in still water",
    date: "2026-10-28",
    readMinutes: 12,
    body: [
      {
        type: "p",
        text: "One of the most profound, distinctive, and accurate concepts in Vedic astrology (Jyotisha) is the system of Dashas: planetary time-cycles that govern distinct chapters of your life. While Western astrology relies predominantly on transits (where the planets are moving in the sky right now), Vedic astrology recognizes that transits can only deliver what your current planetary season is primed to harvest.",
      },
      {
        type: "p",
        text: "The most widely respected system, the Vimshottari Dasha, is calibrated to an ideal human lifespan of 120 years, systematically dividing this journey across the nine primary grahas (planets).",
      },
      { type: "h2", text: "How your personal dasha sequence is calculated" },
      {
        type: "p",
        text: "Your entire dasha timeline is anchored to one single astronomical point: the exact degree of the Moon at the moment of your birth. The 360-degree zodiac is divided into twenty-seven Nakshatras (lunar mansions), each spanning exactly 13 degrees and 20 minutes. Each nakshatra is governed by one of the nine planets.",
      },
      {
        type: "p",
        text: "Whichever nakshatra your Moon occupied at birth determines which planet rules your first chapter, and how much of that period remained at your arrival. From that moment onward, the planets follow a strictly fixed, ancient sequence:",
      },
      {
        type: "list",
        items: [
          "Ketu: 7 years of spiritual detachment, introspection, and shedding of ego.",
          "Venus (Shukra): 20 years of artistic expansion, romance, luxury, and relational diplomacy.",
          "Sun (Surya): 6 years of authority, career consolidation, and spiritual illumination.",
          "Moon (Chandra): 10 years of emotional depth, domestic life, motherhood, and sensitivity.",
          "Mars (Mangala): 7 years of decisive courage, physical vitality, property, and initiative.",
          "Rahu: 18 years of intense worldly ambition, foreign connections, and unconventional growth.",
          "Jupiter (Guru): 16 years of wisdom, teaching, children, prosperity, and dharmic alignment.",
          "Saturn (Shani): 19 years of discipline, endurance, structural reorganization, and patience.",
          "Mercury (Budha): 17 years of intellectual curiosity, commerce, communication, and learning.",
        ],
      },
      {
        type: "quote",
        text: "Timing is not destiny. It is weather, and you can dress for the weather.",
      },
      { type: "h2", text: "Sub-periods and the Dasha Sandhi transition" },
      {
        type: "p",
        text: "Each major Mahadasha is further divided into nine sub-periods called Antardashas (or Bhuktis). For example, during a 16-year Jupiter Mahadasha, you will cycle through Jupiter-Jupiter, Jupiter-Saturn, Jupiter-Mercury, and so forth. This nested architecture explains why you can experience moments of career acceleration or quiet reflection within a broader period of study.",
      },
      {
        type: "p",
        text: "The final stretch of any Mahadasha—known as Dasha Sandhi—is particularly important. As the ruling planet prepares to hand over the reins to the next planet, life often feels disorienting. Old priorities crumble, old relationships gracefully exit, and an unfamiliar inner urge begins to emerge. Recognizing Dasha Sandhi prevents panic and allows you to prepare for the incoming season.",
      },
      { type: "h2", text: "Reading a period without fatalism" },
      {
        type: "p",
        text: "A Saturn Mahadasha is not a cosmic punishment, and a Venus Mahadasha is not a guaranteed lottery win. How a dasha manifests depends entirely on the functional role that planet plays in your unique birth chart: which houses it rules, where it resides, and which aspects it receives.",
      },
      {
        type: "p",
        text: "When you know your dasha, you stop fighting the cosmic seasons. If you are in a Saturn period, you focus on slow, ethical, unglamorous building. If you are in a Mercury period, you write, learn, and trade. Knowing your season allows you to work with time rather than against it.",
      },
    ],
  },
  {
    slug: "how-to-quiet-an-anxious-mind",
    title: "How to quiet an anxious mind without fighting it",
    category: "Psychology",
    excerpt:
      "Anxiety gets louder when we argue with it. These gentle, practical techniques help you turn the volume down instead.",
    image: "/images/journaling.jpg",
    imageAlt: "A fountain pen writing notes in a journal",
    date: "2026-10-21",
    readMinutes: 10,
    body: [
      {
        type: "p",
        text: "Anxiety is one of the most misunderstood emotions in contemporary life. We treat it like an enemy intruder to be fought, suppressed, or medicated away at all costs. Yet from an evolutionary perspective, anxiety is simply an overzealous internal alarm system. It is your brain's ancient survival machinery attempting to protect you from perceived future harm.",
      },
      {
        type: "p",
        text: "The paradox of anxiety is that the harder you fight it, the louder it screams. Telling yourself 'Stop worrying right now!' signals to your nervous system that an emergency is indeed occurring, causing adrenaline and cortisol to spike even higher.",
      },
      { type: "h2", text: "The anatomy of cognitive spiraling" },
      {
        type: "p",
        text: "When anxiety takes over, the rational prefrontal cortex goes partially offline while the primitive amygdala takes the wheel. The mind immediately begins fabricating catastrophic worst-case scenarios, confusing possibilities with probabilities. Just because an airplane might encounter turbulence does not mean it is falling out of the sky; just because an email sounded brief does not mean you are about to be dismissed.",
      },
      { type: "h2", text: "Three evidence-based de-escalation tools" },
      {
        type: "list",
        items: [
          "Name the Feeling with Distance: Instead of saying 'I am anxious,' practice saying 'I notice that my nervous system is experiencing anxiety right now.' This simple linguistic shift moves you from being engulfed by the emotion to becoming the calm observer of it.",
          "The 5-4-3-2-1 Somatic Orientation: Force your sensory cortex to re-engage with your immediate physical environment. Name 5 things you can see, 4 things you can physically touch, 3 sounds you can hear, 2 scents you can smell, and 1 taste. Anxiety lives exclusively in an imaginary future; the physical senses live only in the present.",
          "The Structured Worry Container: Keep a designated notebook. When racing thoughts arrive, write them down uncensored. On paper, abstract fears become concrete and finite. You can then ask: 'Is there a tangible action I can take about this in the next fifteen minutes? If not, I set it aside until tomorrow.'",
        ],
      },
      {
        type: "quote",
        text: "You are not your anxious thoughts. You are the calm sky through which the weather passes.",
      },
      {
        type: "h2",
        text: "Vedic insights on mental turbulence (Chitta Vritti)",
      },
      {
        type: "p",
        text: "In the Yoga Sutras of Patanjali, the primary purpose of self-inquiry is defined as 'Chitta Vritti Nirodha'—the quieting of the fluctuations of the mind-stuff. Vedic astrology attributes high mental anxiety to imbalances between Mercury (Budha, rapid analytical thinking) and the Moon (Chandra, emotional security), often exacerbated by transits of Rahu or Saturn.",
      },
      {
        type: "p",
        text: "Ayurveda categorizes acute anxiety as an aggravation of Vata dosha: the cold, dry, light, and mobile air element. To soothe Vata, you must feed the body warm, oily, grounding foods, massage the feet with warm sesame oil before bed, and walk barefoot on morning soil.",
      },
      { type: "h2", text: "When to seek professional support" },
      {
        type: "p",
        text: "While self-regulation practices are immensely helpful for everyday stress, chronic panic attacks, insomnia lasting weeks, or intrusive dread are signs that your nervous system needs the gentle, structured support of a licensed counsellor. Healing happens best in connection.",
      },
    ],
  },
  {
    slug: "the-healing-power-of-sound",
    title: "The healing power of sound",
    category: "Spirituality",
    excerpt:
      "From temple bells to singing bowls, sound has always been used to calm the mind. A short introduction to sound as a daily practice.",
    image: "/images/sound-healing.jpg",
    imageAlt: "Singing bowls arranged for a sound healing session",
    date: "2026-10-14",
    readMinutes: 9,
    body: [
      {
        type: "p",
        text: "Long before the word 'mindfulness' entered the modern lexicon, the Vedic sages discovered a foundational truth: Nada Brahma—Creation is sound. Everything in the manifest universe, from the subatomic spin of electrons to the orbital cycles of celestial spheres, is in a perpetual state of vibrational resonance.",
      },
      {
        type: "p",
        text: "Sound is the most direct sensory pathway to the human nervous system. While light must be processed through complex optical pathways, acoustic vibrations physically strike the eardrum, resonate through the skull bones, and vibrate every cellular fluid in the body.",
      },
      { type: "h2", text: "The neuroscience of sonic entrainment" },
      {
        type: "p",
        text: "When you listen to steady, rhythmic, low-frequency tones—such as a bronze Tibetan singing bowl, a drone on a tanpura, or a resonant gong—your brainwaves naturally begin to mirror that frequency through a clinical phenomenon known as brainwave entrainment.",
      },
      {
        type: "p",
        text: "Fast, anxious Beta brainwaves (14–30 Hz) gradually slow down into relaxed Alpha waves (8–13 Hz), and eventually enter deep meditative Theta states (4–7 Hz). In Theta states, the body initiates cellular repair, chronic muscular guarding softens, and the parasympathetic immune response strengthens.",
      },
      { type: "h2", text: "Sacred acoustic instruments" },
      {
        type: "list",
        items: [
          "Tibetan Bronze Bowls: Cast from traditional alloy compositions, they produce complex harmonic overtones that disrupt rigid mental loops and induce deep somatic release.",
          "Temple Bells (Ghanta): Engineered with specific metal ratios to produce a sharp acoustic spike followed by a lingering 7-second overtone that clears mental fog.",
          "The Tanpura: The continuous four-string drone in Indian classical music that provides a steady tonic ground (Sa-Pa), giving the listener a safe psychological anchor.",
          "The Human Voice: The most powerful instrument of all. Chanting and humming vibrate the vagus nerve in the throat, sending instantaneous safety signals to the heart.",
        ],
      },
      {
        type: "quote",
        text: "Silence after sound is one of the most peaceful places the human mind can find.",
      },
      { type: "h2", text: "Three simple sound rituals at home" },
      {
        type: "p",
        text: "You do not need expensive crystal bowls to incorporate sound healing into your daily routine:",
      },
      {
        type: "list",
        items: [
          "Practice Bhramari Pranayama (Humming Bee Breath): Inhale through the nose, close your ears with your thumbs, and hum steadily on a low note for the entire exhalation. Practice for five minutes before sleep to eliminate insomnia.",
          "Chant the Primordial A-U-M: Feel the 'Ah' vibrate in the lower belly, the 'Oo' vibrate in the chest and heart, and the 'Mmm' vibrate in the crown of the head.",
          "Savor the Silence: When a song, bell, or chime finishes ringing, sit completely motionless for sixty seconds, savoring the stillness left in its wake.",
        ],
      },
    ],
  },
  {
    slug: "sade-sati-saturns-long-lesson",
    title: "Sade Sati: Saturn's seven-and-a-half-year lesson",
    category: "Astrology",
    excerpt:
      "Few transits are feared as much as Sade Sati. Here is what it actually is, why it lasts so long, and how to move through it with steadiness instead of dread.",
    image: "/images/mountains.jpg",
    imageAlt: "A person sitting on a rock, looking out at mountains at dusk",
    date: "2026-10-07",
    readMinutes: 11,
    body: [
      {
        type: "p",
        text: "In the cultural lore of Indian astrology, few astrological phrases evoke as much immediate dread as 'Sade Sati.' It has been blamed for business bankruptcies, broken marriages, sudden illnesses, and deep emotional grief. Yet in classical Jyotisha texts, Saturn (Shani Bhagavan) is revered not as a petty punisher, but as the great spiritual purifier: the Lord of Karma and Time.",
      },
      {
        type: "p",
        text: "Sade Sati literally translates to 'seven and a half.' It marks the transit of Saturn as it moves through three consecutive signs: the sign immediately preceding your natal Moon, the sign containing your natal Moon, and the sign immediately following it. Since Saturn takes roughly two and a half years to transit a single sign, the entire transit spans approximately 7.5 years.",
      },
      {
        type: "h2",
        text: "The psychological collision: Saturn meets the Moon",
      },
      {
        type: "p",
        text: "To understand Sade Sati, you must understand the two celestial archetypes involved. The Moon represents your psychological comfort, maternal safety, emotional security, and mental peace. Saturn represents cold reality, time, delayed gratification, discipline, and uncompromising truth.",
      },
      {
        type: "p",
        text: "When heavy Saturn steps into the personal sanctuary of the Moon, whatever in your life was built on illusions, shortcuts, emotional codependency, or shallow foundations begins to crumble. Saturn does not destroy what is genuine; it prunes what is dead so that permanent, unshakeable strength can grow.",
      },
      { type: "h2", text: "The three distinct phases of Sade Sati" },
      {
        type: "list",
        items: [
          "The Rising Phase (12th House from Moon): Attention turns to sleep, endings, subconscious fears, foreign travel, and financial expenditures. Old friendships may drift away as life asks you to step into solitude.",
          "The Peak Phase (Transiting the Natal Moon): The most emotionally demanding stretch. Feelings of isolation, heavy responsibility, career pressure, or parental health concerns demand mature, stoic endurance.",
          "The Setting Phase (2nd House from Moon): The pressure gradually lifts from your emotional core and settles into family dynamics, speech, financial restructuring, and solidifying your new baseline.",
        ],
      },
      {
        type: "quote",
        text: "Saturn does not punish. It asks you to build something that will outlast your doubts.",
      },
      { type: "h2", text: "Why some people flourish during Sade Sati" },
      {
        type: "p",
        text: "Astrologers frequently witness individuals achieving their greatest career triumphs, publishing masterpieces, or establishing enduring foundations during Sade Sati. If Saturn is functionally auspicious for your ascendant (such as for Taurus or Libra lagnas), or if you run an auspicious Mahadasha, Sade Sati acts as an initiation into true authority.",
      },
      { type: "h2", text: "Guiding principles for navigating the transit" },
      {
        type: "list",
        items: [
          "Cultivate unglamorous consistency: do your work daily without demanding immediate applause or praise.",
          "Serve those less fortunate: Saturn loves humble service to elders, laborers, and animals.",
          "Avoid impulsive shortcuts, speculative gambling, and dishonest transactions.",
          "Light a sesame oil lamp on Saturday evenings and chant the Hanuman Chalisa or Shani Gayatri for spiritual fortitude.",
        ],
      },
    ],
  },
  {
    slug: "what-happens-in-your-first-counselling-session",
    title: "What actually happens in your first counselling session",
    category: "Psychology",
    excerpt:
      "Not knowing what to expect keeps many people from asking for help. A gentle walk through the first hour, so you can arrive feeling a little more at ease.",
    image: "/images/counselling.jpg",
    imageAlt: "Two women talking calmly across a small white table",
    date: "2026-09-30",
    readMinutes: 9,
    body: [
      {
        type: "p",
        text: "Deciding to book your very first therapy or counselling session is frequently accompanied by a heavy mix of relief and acute vulnerability. People worry about awkward silences, fear being judged or pathologized, or wonder if their private struggles are 'serious enough' to warrant someone's professional time.",
      },
      {
        type: "p",
        text: "The truth is that a first session is neither an interrogation nor an emergency room. It is simply a structured, quiet conversation between two human beings, held inside a space of total confidentiality and compassionate curiosity.",
      },
      { type: "h2", text: "The first ten minutes: Setting the container" },
      {
        type: "p",
        text: "Your counsellor will begin by welcoming you, ensuring you are physically comfortable, and explaining the clinical container: how confidentiality works, the limits of confidentiality regarding personal safety, and what you can expect regarding session duration and notes.",
      },
      {
        type: "p",
        text: "You will be reminded that you are in complete control of the pacing. You do not need to unpack your deepest childhood wounds in the first fifteen minutes. It is entirely acceptable to say, 'I am not ready to talk about that part yet.'",
      },
      { type: "h2", text: "The middle stretch: What brought you here" },
      {
        type: "p",
        text: "Rather than asking abstract questions, a skilled counsellor will gently ask: 'What made today the day you decided to reach out?' You can talk about a recent breakup, a persistent sense of numbness at work, a conflict with family, or simply an overwhelming feeling that your life has lost its compass.",
      },
      {
        type: "list",
        items: [
          "You do not need to speak chronologically; your story can jump around.",
          "Tears, pauses, and laughter are all welcome and treated as natural information.",
          "Your counsellor will listen not just to your words, but to your body language and tone of voice.",
          "Together, you will begin identifying the underlying emotional themes beneath the surface crisis.",
        ],
      },
      {
        type: "quote",
        text: "You do not need to arrive with the right words. Finding them together is the work.",
      },
      { type: "h2", text: "The final minutes: Closing and integration" },
      {
        type: "p",
        text: "In the last ten minutes, the counsellor will gently pause the exploration to help you ground your nervous system before stepping back into the outside world. You will collaboratively review what stood out, discuss whether the therapeutic relationship feels like a safe fit, and agree on gentle next steps.",
      },
      {
        type: "p",
        text: "It is completely normal to experience a 'vulnerability hangover' after your first session—a temporary feeling of fatigue or tenderness. Rest, drink water, and allow yourself credit for showing up for yourself.",
      },
    ],
  },
  {
    slug: "pancha-mahabhuta-the-five-elements-in-daily-life",
    title: "The five elements in daily life: a gentle guide",
    category: "Spirituality",
    excerpt:
      "Earth, water, fire, air and space are not just ideas from old texts. They describe how you feel in your body each day, and how to come back into balance.",
    image: "/images/stage-know-yourself.jpg",
    imageAlt:
      "A person standing on a rock before a waterfall in a green forest",
    date: "2026-09-23",
    readMinutes: 10,
    body: [
      {
        type: "p",
        text: "In the classical philosophies of India—from Samkhya and Ayurveda to Vedic astrology—everything in the material cosmos is woven from five primal energetic matrices known as the Pancha Mahabhuta (The Five Great Elements): Prithvi (Earth), Jala (Water), Agni (Fire), Vayu (Air), and Akasha (Ether/Space).",
      },
      {
        type: "p",
        text: "These are not merely chemical elements on a periodic table; they are poetic and psychological descriptors of energetic states, physical tissues, mental moods, and behavioral tendencies. Every human being carries all five, but your unique constitutional blueprint leads with certain elements while needing nourishment in others.",
      },
      { type: "h2", text: "The anatomy of the five elements" },
      {
        type: "list",
        items: [
          "Prithvi (Earth): Governs bone, muscle, structural stability, and grounded patience. In excess, Earth leads to lethargy, stubborn resistance to change, and depression. In deficiency, it causes chronic ungroundedness and financial anxiety.",
          "Jala (Water): Governs blood, lymph, emotional fluidity, attachment, and compassion. In excess, Water manifests as emotional clinginess, overwhelm, and water retention. In deficiency, it manifests as dry skin, emotional coldness, and rigid boundaries.",
          "Agni (Fire): Governs metabolism, body heat, intellect (Tejas), ambition, and courage. In excess, Fire produces irritability, acid reflux, and burnout. In deficiency, it produces low motivation, poor digestion, and lack of confidence.",
          "Vayu (Air): Governs respiration, nerve conduction, creativity, and sensory perception. In excess, Air causes insomnia, racing thoughts, and dry joints. In deficiency, it leads to stagnation and mental dullness.",
          "Akasha (Space): Governs the hollow cavities of the body (heart, lungs, stomach), spiritual intuition, and expansive awareness. In excess, Space leads to dissociation and isolation. In deficiency, it leads to a feeling of constriction and suffocation.",
        ],
      },
      {
        type: "quote",
        text: "Balance is not having equal amounts of everything. It is knowing what you need today.",
      },
      { type: "h2", text: "Daily elemental balancing rituals" },
      {
        type: "p",
        text: "To restore equilibrium to your daily life, introduce simple somatic antidotes when an element runs out of harmony:",
      },
      {
        type: "list",
        items: [
          "For excess Air (Anxiety): Root into Earth by walking barefoot on damp grass, eating warm root vegetables, and lifting gentle weights.",
          "For excess Fire (Anger/Burnout): Cool down with Water and Space by walking near a natural lake, drinking coconut water, and spending thirty minutes in screen-free quiet.",
          "For excess Earth (Depression/Heaviness): Stimulate with Fire and Air through vigorous cardiovascular movement, dry sauna, and ginger tea.",
          "For excess Water (Emotional Overwhelm): Dry and center yourself through Sun exposure and structured creative writing.",
        ],
      },
    ],
  },
  {
    slug: "rahu-and-ketu-the-axis-of-desire-and-release",
    title: "Rahu and Ketu: the axis of desire and release",
    category: "Astrology",
    excerpt:
      "The shadow planets have no body of their own, yet they shape some of the strongest themes in a chart. A clear introduction to the lunar nodes.",
    image: "/images/stage-direction.jpg",
    imageAlt:
      "An open road running through red rock canyons towards distant mountains",
    date: "2026-09-16",
    readMinutes: 11,
    body: [
      {
        type: "p",
        text: "In the Vedic astronomical pantheon, Rahu and Ketu hold a uniquely mysterious place. Unlike the seven physical grahas—the Sun, Moon, Mars, Mercury, Jupiter, Venus, and Saturn—Rahu and Ketu possess no physical mass, rings, or surface. They are chhaya grahas: mathematical shadow points where the orbital path of the Moon intersects the ecliptic plane of the Sun.",
      },
      {
        type: "p",
        text: "Because solar and lunar eclipses occur exclusively when the Sun and Moon converge near these intersection points, ancient myth personified them as the celestial serpent that swallowed the luminaries: Rahu as the dragon's head, and Ketu as the dragon's headless tail.",
      },
      { type: "h2", text: "The psychological polarity of the nodal axis" },
      {
        type: "p",
        text: "In your natal birth chart, Rahu and Ketu are always locked in an exact 180-degree opposition across the zodiac, establishing a profound evolutionary tension between worldly hunger and spiritual detachment:",
      },
      {
        type: "list",
        items: [
          "Rahu (North Node / The Head): Represents unfulfilled desires, obsession, foreign lands, innovative genius, and the urgent soul-curriculum of this lifetime. Because it has a mouth but no stomach, whatever Rahu achieves leaves it hungering for more.",
          "Ketu (South Node / The Tail): Represents past-life mastery, natural gifts, asceticism, sudden disillusionment, and spiritual liberation (Moksha). Because it has a body but no eyes, Ketu cares nothing for worldly vanity.",
        ],
      },
      {
        type: "quote",
        text: "Rahu shows the direction you are hungry for. Ketu reminds you what you no longer need to carry.",
      },
      { type: "h2", text: "The 18.6-year nodal transit cycle" },
      {
        type: "p",
        text: "The lunar nodes take approximately 18.6 years to travel backwards through the entire zodiac, spending roughly 1.5 years in each sign. At ages 18, 37, 55, and 74, you experience your Nodal Return—a profound moment of karmic reckoning, radical career pivots, and destined relationship meetings.",
      },
      {
        type: "p",
        text: "At ages 27, 46, and 64, you experience your Nodal Reverse Return, where transiting Rahu conjuncts natal Ketu and transiting Ketu conjuncts natal Rahu, frequently sparking a powerful mid-life re-evaluation of your life's true purpose.",
      },
      { type: "h2", text: "Harmonizing the nodal axis in daily life" },
      {
        type: "p",
        text: "The evolutionary goal of the Vedic chart is not to repress Rahu or escape through Ketu, but to build a conscious bridge between them. Use Ketu's innate spiritual detachment and wisdom to guide Rahu's bold worldly actions, ensuring your ambitions remain ethical, grounded, and in service to something greater than ego.",
      },
    ],
  },
  {
    slug: "resilience-building-inner-strength-after-setbacks",
    title: "Resilience: building inner strength after setbacks",
    category: "Psychology",
    excerpt:
      "Resilience is not about never falling. It is a set of small, learnable habits that help you recover, adapt and keep going when life does not go to plan.",
    image: "/images/stage-strengths.jpg",
    imageAlt: "A climber hanging from an overhanging rock above the sea",
    date: "2026-09-09",
    readMinutes: 10,
    body: [
      {
        type: "p",
        text: "Popular culture often mistakenly depicts resilient individuals as unfeeling, bulletproof warriors who withstand catastrophe without ever flinching or shedding a tear. In clinical psychology, true resilience looks vastly different: it is not the absence of suffering, but the flexibility to experience grief, fear, and disappointment, and gradually assemble oneself again.",
      },
      {
        type: "p",
        text: "Resilience is not a fixed genetic trait bestowed on a chosen few. It is a dynamic suite of behavioral, cognitive, and relational practices that can be intentionally learned, cultivated, and strengthened at any stage of life.",
      },
      { type: "h2", text: "The four pillars of psychological resilience" },
      {
        type: "list",
        items: [
          "Cognitive Reappraisal: The ability to separate objective facts from catastrophic interpretations. When a project fails, the unresilient mind says 'I am a failure'; the resilient mind says 'That specific strategy failed, and now I know what to adjust.'",
          "Emotional Containment: Learning to expand your window of nervous system tolerance so you can feel sorrow or fear without immediately numbing, escaping, or acting out destructively.",
          "Relational Scaffolding: Having at least one or two trusted companions with whom you can drop your social mask and speak completely truthfully without fear of judgment.",
          "Somatic Anchoring: Honoring the biological baseline. When you are sleep-deprived, malnourished, and physically isolated, psychological resilience drops to near zero.",
        ],
      },
      {
        type: "quote",
        text: "Strength is not the absence of struggle. It is the habit of beginning again.",
      },
      { type: "h2", text: "The 72-Hour Post-Crisis Protocol" },
      {
        type: "p",
        text: "When an unexpected crisis, redundancy, or painful rejection occurs, avoid making major life decisions within the first 72 hours. Your nervous system is flooded with stress hormones, skewing judgment toward panic.",
      },
      {
        type: "list",
        items: [
          "Day 1: Focus purely on biological preservation—warm food, deep sleep, hot showers, and minimal screen time.",
          "Day 2: Share what happened with one safe confidant or counsellor, letting the raw emotion be witnessed without seeking instant solutions.",
          "Day 3: Write down one single, manageable action step within your immediate control, and execute it with calm focus.",
        ],
      },
    ],
  },
  {
    slug: "mantra-for-beginners-why-repetition-calms-the-mind",
    title: "Mantra for beginners: why repetition calms the mind",
    category: "Spirituality",
    excerpt:
      "A mantra gives a busy mind one simple thing to hold. How mantra practice works, how to choose one, and how to begin with just a few minutes a day.",
    image: "/images/stage-peace.jpg",
    imageAlt:
      "A pale lotus flower glowing against a dark, softly lit background",
    date: "2026-09-02",
    readMinutes: 9,
    body: [
      {
        type: "p",
        text: "In the Sanskrit tradition, the word Mantra carries a precise etymological definition: 'Mananat trayate iti mantrah'—that which protects and liberates the mind through repetitive contemplation. It is composed of two roots: Manas (the sensory, conversational mind) and Tra (a tool, vehicle, or protective instrument).",
      },
      {
        type: "p",
        text: "When left unguided, the human mind naturally defaults to what modern neuroscience calls the Default Mode Network (DMN): a circuit responsible for rumination, self-criticism, past regrets, and future catastrophic projections. A mantra gives the wandering mind one single, sacred, acoustic anchor to hold onto, quieting the hyperactive DMN.",
      },
      { type: "h2", text: "The sacred mechanics of Japa meditation" },
      {
        type: "p",
        text: "The practice of repeating a sacred sound is called Japa. As you chant a mantra repeatedly—whether audibly (Vaikhari), whispered (Upamshu), or silently within consciousness (Manasika)—your neural pathways begin to rewire. Chronic thought loops are replaced by a steady, soothing rhythmic wave.",
      },
      {
        type: "p",
        text: "Traditionally, Japa is practiced with a mala of 108 beads made of sandalwood, rudraksha, or tulsi. Moving your thumb over each bead provides physical tactile grounding, aligning breath, touch, and mental awareness into one continuous stream of presence.",
      },
      { type: "h2", text: "Three accessible beginner mantras" },
      {
        type: "list",
        items: [
          "Om (Pranava): The primordial source vibration. Chanting Om slowly on the out-breath clears mental debris and aligns your vibration with universal stillness.",
          "So Hum ('I am That'): A natural mantra synchronized with biological respiration. Silently think 'So' on the natural inhalation, and 'Hum' on the natural exhalation.",
          "Om Shanti Shanti Shanti: An invocation of threefold peace—peace in the physical body (Adhibhautika), peace in the mental cosmos (Adhidaivika), and peace within the spiritual soul (Adhyatmika).",
        ],
      },
      {
        type: "quote",
        text: "The power of a mantra is less in the words than in returning to them, again and again.",
      },
      { type: "h2", text: "Building a daily ten-minute practice" },
      {
        type: "p",
        text: "To experience the neurological and spiritual benefits of mantra, consistency matters far more than lengthy marathons:",
      },
      {
        type: "list",
        items: [
          "Choose one mantra and commit to it for at least forty consecutive days without switching.",
          "Sit in the same quiet location at approximately the same time each morning.",
          "Start with five to ten minutes, softly repeating the sound without rushing.",
          "Notice the quality of mental stillness that persists throughout the rest of your busy workday.",
        ],
      },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
