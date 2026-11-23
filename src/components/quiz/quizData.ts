export type El = "fire" | "earth" | "air" | "water";

export const ORDER: El[] = ["fire", "earth", "air", "water"];

export const ELEMENTS: Record<
  El,
  {
    sa: string;
    en: string;
    color: string;
    glow: string;
    essence: string;
    about: string;
    strengths: string[];
    shadow: string;
    practice: string;
    signs: string;
  }
> = {
  fire: {
    sa: "Agni",
    en: "Fire",
    color: "text-[#e8875a]",
    glow: "rgba(232,135,90,0.45)",
    essence: "You are the spark that begins things.",
    about:
      "Agni is the element of transformation, will and light. You move towards life with courage and warmth, and others often catch your energy before they catch your words.",
    strengths: [
      "Courage and initiative",
      "Warmth that inspires others",
      "Quick, decisive action",
    ],
    shadow:
      "When out of balance, fire can burn too fast: impatience, irritation or exhaustion after a burst of effort.",
    practice:
      "Cool, slow breathing and time near water help your fire glow steadily instead of flaring.",
    signs: "Aries · Leo · Sagittarius",
  },
  earth: {
    sa: "Prithvi",
    en: "Earth",
    color: "text-[#d6ac52]",
    glow: "rgba(214,172,82,0.45)",
    essence: "You are the ground others stand on.",
    about:
      "Prithvi is the element of stability, patience and form. You build things that last, and your steadiness is a quiet gift to everyone around you.",
    strengths: [
      "Reliability and patience",
      "Practical wisdom",
      "Loyalty that endures",
    ],
    shadow:
      "When out of balance, earth can become rigid: resisting change or holding on to what no longer serves.",
    practice:
      "Gentle movement, walks somewhere new and small changes to routine keep your earth fertile rather than fixed.",
    signs: "Taurus · Virgo · Capricorn",
  },
  air: {
    sa: "Vayu",
    en: "Air",
    color: "text-[#a99be0]",
    glow: "rgba(169,155,224,0.45)",
    essence: "You are the breath of new ideas.",
    about:
      "Vayu is the element of movement, thought and connection. Your mind travels easily, linking people and ideas, and you bring freshness into any room.",
    strengths: [
      "Curiosity and clear thinking",
      "Ease with people",
      "Openness to change",
    ],
    shadow:
      "When out of balance, air scatters: overthinking, restlessness or difficulty settling into the body.",
    practice:
      "Grounding practices, warm food and a steady daily rhythm help your air move freely without blowing you off course.",
    signs: "Gemini · Libra · Aquarius",
  },
  water: {
    sa: "Jala",
    en: "Water",
    color: "text-[#7fb2d6]",
    glow: "rgba(127,178,214,0.45)",
    essence: "You are the depth that feels everything.",
    about:
      "Jala is the element of feeling, intuition and flow. You sense what others miss, and your empathy creates safety for the people you love.",
    strengths: ["Empathy and intuition", "Emotional depth", "Healing presence"],
    shadow:
      "When out of balance, water floods: absorbing others' moods, or withdrawing when feelings become too much.",
    practice:
      "Clear boundaries, journalling and sunlight help your water stay clear and flowing.",
    signs: "Cancer · Scorpio · Pisces",
  },
};

export const QUESTIONS: { q: string; a: [string, El][] }[] = [
  {
    q: "When a big decision arrives, you usually…",
    a: [
      ["Weigh the practical facts carefully", "earth"],
      ["Trust your gut and act quickly", "fire"],
      ["Follow what feels right inside", "water"],
      ["Talk it through and explore every idea", "air"],
    ],
  },
  {
    q: "On a free day, you are happiest…",
    a: [
      ["Exploring a new place or a new conversation", "air"],
      ["With quiet music and the people closest to you", "water"],
      ["Doing something active or adventurous", "fire"],
      ["Cooking, gardening or making your home lovely", "earth"],
    ],
  },
  {
    q: "Under stress, you tend to…",
    a: [
      ["Withdraw and feel everything deeply", "water"],
      ["Dig in and hold on tighter", "earth"],
      ["Overthink and replay it in your mind", "air"],
      ["Get restless, impatient or irritated", "fire"],
    ],
  },
  {
    q: "Friends usually come to you for…",
    a: [
      ["Courage and a push to go for it", "fire"],
      ["A fresh perspective", "air"],
      ["Reliable, practical help", "earth"],
      ["Comfort and understanding", "water"],
    ],
  },
  {
    q: "Which landscape calls to you?",
    a: [
      ["Forests and quiet mountains", "earth"],
      ["The ocean, a river or the sound of rain", "water"],
      ["A desert at sunrise", "fire"],
      ["Open sky on a windy cliff", "air"],
    ],
  },
  {
    q: "What would you most like more of?",
    a: [
      ["Freedom", "air"],
      ["Passion", "fire"],
      ["Connection", "water"],
      ["Security", "earth"],
    ],
  },
  {
    q: "Your quiet gift to the world is…",
    a: [
      ["Compassion", "water"],
      ["Inspiration", "fire"],
      ["Stability", "earth"],
      ["Ideas", "air"],
    ],
  },
];
