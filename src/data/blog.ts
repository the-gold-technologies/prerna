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
    readMinutes: 6,
    body: [
      {
        type: "p",
        text: "Most people know their Sun sign. In Jyotisha, the Vedic system of astrology, the Moon sign often matters more. The Moon is called the karaka of the mind, the planet that signifies how you feel, what comforts you and how you respond when life presses on you.",
      },
      { type: "h2", text: "Why the Moon, not the Sun" },
      {
        type: "p",
        text: "The Sun shows the soul's direction and the way you shine. The Moon shows your inner weather: moods, needs and memories. Because the Moon moves quickly, about one sign every two and a half days, it also gives a far more personal picture than the Sun, which stays in a sign for a month.",
      },
      { type: "h2", text: "A few patterns to recognise" },
      {
        type: "list",
        items: [
          "Fire Moons (Aries, Leo, Sagittarius) feel quickly and recover quickly. They need action to process emotion.",
          "Earth Moons (Taurus, Virgo, Capricorn) look for stability and routine. Change can feel unsettling before it feels exciting.",
          "Air Moons (Gemini, Libra, Aquarius) understand feelings by talking or thinking them through.",
          "Water Moons (Cancer, Scorpio, Pisces) feel deeply and absorb the moods of people around them.",
        ],
      },
      {
        type: "quote",
        text: "Knowing your Moon is not about labelling your feelings. It is about meeting them with more patience.",
      },
      { type: "h2", text: "Where psychology meets the chart" },
      {
        type: "p",
        text: "A water Moon who feels overwhelmed in crowds is not being dramatic. A Capricorn Moon who goes quiet under stress is not being cold. Seeing the pattern in your chart can make it easier to name in conversation, and naming a pattern is often the first step in working with it.",
      },
      {
        type: "p",
        text: "Your Moon's nakshatra, the lunar mansion it occupies, adds another layer of detail. If you would like to know yours, our free tools and a 1-1 reading can show you exactly where your Moon sits.",
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
    readMinutes: 7,
    body: [
      {
        type: "p",
        text: "Many people come to PRERNA with the same quiet question: why does this keep happening to me? Different partner, different city, same ending. Psychology has a helpful way of looking at this, and it starts with kindness rather than blame.",
      },
      { type: "h2", text: "Patterns are learned, not chosen" },
      {
        type: "p",
        text: "Early relationships teach us what closeness feels like. If love once came with unpredictability, calm can later feel boring and chaos can feel familiar. We are drawn not to what is good for us, but to what feels like home.",
      },
      { type: "h2", text: "Three common loops" },
      {
        type: "list",
        items: [
          "Pursue and withdraw: one partner reaches for closeness, the other steps back, and each reaction feeds the other.",
          "Over-giving: taking care of everyone else's needs and quietly resenting that no one notices yours.",
          "Choosing the unavailable: being drawn to people who cannot fully show up, which keeps real intimacy at a safe distance.",
        ],
      },
      {
        type: "quote",
        text: "You cannot change a pattern you cannot see. Seeing it clearly is already change.",
      },
      { type: "h2", text: "Gentle first steps" },
      {
        type: "p",
        text: "Notice the moment the familiar feeling arrives, before you react. Name it, even silently. Then ask what you needed in that moment and whether there is a new way to ask for it. Counselling gives this work a safe structure, and your birth chart can add useful context about how you love and what you need to feel secure.",
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
    readMinutes: 5,
    body: [
      {
        type: "p",
        text: "Breath is the one part of the nervous system you can steer on purpose. When the breath slows, the body receives a signal that it is safe, and the mind follows. You do not need to be spiritual, flexible or patient to begin.",
      },
      { type: "h2", text: "The practice" },
      {
        type: "list",
        items: [
          "Sit comfortably with your back supported and your feet on the floor.",
          "Breathe in through the nose for a count of four.",
          "Pause gently for a count of two.",
          "Breathe out slowly through the nose for a count of six.",
          "Repeat for five minutes, letting the count soften as you settle.",
        ],
      },
      {
        type: "quote",
        text: "A longer out-breath is a quiet message to the body: you can rest now.",
      },
      { type: "h2", text: "When thoughts wander" },
      {
        type: "p",
        text: "They will, and that is the practice. Each time you notice you have drifted and return to the count, you are strengthening attention, the same way a muscle grows by lifting and lowering.",
      },
      {
        type: "p",
        text: "Try it every morning for a week and notice what changes. Many PRERNA clients pair this with their consultations, so that insight has a calm place to land.",
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
    readMinutes: 8,
    body: [
      {
        type: "p",
        text: "One of the most distinctive ideas in Jyotisha is the dasha: a planetary period that colours a chapter of your life. The most widely used system, Vimshottari, divides a 120-year life cycle among the nine grahas, each ruling for a fixed number of years.",
      },
      { type: "h2", text: "How your periods are set" },
      {
        type: "p",
        text: "Your starting dasha depends on the nakshatra your Moon occupied at birth. From there, the periods unfold in a fixed order, each with sub-periods (antardashas) that add finer timing.",
      },
      {
        type: "list",
        items: [
          "Ketu 7 years, Venus 20, Sun 6, Moon 10, Mars 7",
          "Rahu 18, Jupiter 16, Saturn 19, Mercury 17",
        ],
      },
      { type: "h2", text: "Reading a period, not predicting a fate" },
      {
        type: "p",
        text: "A Saturn period is not a punishment, and a Venus period is not a guarantee of romance. Each period activates the themes of that planet as it sits in your chart: its sign, house and strength. The same dasha can feel very different for two people.",
      },
      {
        type: "quote",
        text: "Timing is not destiny. It is weather, and you can dress for the weather.",
      },
      {
        type: "p",
        text: "Knowing which season you are in can make a hard stretch easier to bear and a good stretch easier to use well. A personalised report lists your periods and what each is likely to bring.",
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
    readMinutes: 6,
    body: [
      {
        type: "p",
        text: "Anxiety is the mind trying to protect you from something it believes is coming. The trouble is that it rarely checks whether the threat is real. Pushing it away often makes it push back harder.",
      },
      { type: "h2", text: "Three things that help" },
      {
        type: "list",
        items: [
          "Name it: 'I notice I am feeling anxious about tomorrow.' Naming creates a little distance between you and the feeling.",
          "Ground in the body: feel your feet, the chair, five things you can see. Anxiety lives in the future; the body lives now.",
          "Write the worry down: on paper, worries become smaller and more specific, and specific problems can be solved.",
        ],
      },
      {
        type: "quote",
        text: "You are not your anxious thoughts. You are the one who notices them.",
      },
      { type: "h2", text: "When to reach out" },
      {
        type: "p",
        text: "If anxiety is affecting your sleep, work or relationships for weeks at a time, speaking with a counsellor can help. PRERNA's counselling sessions are private and practical. If you are ever in crisis, please contact local emergency services straight away.",
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
    readMinutes: 5,
    body: [
      {
        type: "p",
        text: "Long before the word 'mindfulness' became popular, Indian traditions used sound to focus attention: the chanting of mantras, the ringing of temple bells, the steady drone of the tanpura. Sound gives a wandering mind something gentle to rest on.",
      },
      { type: "h2", text: "Why sound settles us" },
      {
        type: "p",
        text: "Slow, steady tones invite slow, steady breathing. Humming and chanting lengthen the out-breath and create a soft vibration in the chest and face that many people find deeply calming.",
      },
      { type: "h2", text: "Try this at home" },
      {
        type: "list",
        items: [
          "Sit quietly and hum on a comfortable low note for the length of each out-breath.",
          "Chant 'Om' slowly three times, noticing the stillness after each one.",
          "Listen to a single singing bowl until the sound completely fades.",
        ],
      },
      {
        type: "quote",
        text: "Silence after sound is one of the most peaceful places the mind can find.",
      },
      {
        type: "p",
        text: "Sound and mantra practices are part of PRERNA's spiritual wellness sessions, often paired with the planets that are most active in your chart.",
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
