/*
 * Starter legal copy for PRERNA. Written in plain language as a draft;
 * it should be reviewed by a qualified lawyer before the site goes live.
 */

export type LegalDoc = {
  slug: "privacy" | "terms" | "cookies" | "refund" | "disclaimer";
  title: string;
  eyebrow: string;
  image: string;
  imageAlt: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};

export const LEGAL_UPDATED = "2026-11-23";

export const LEGAL: Record<LegalDoc["slug"], LegalDoc> = {
  privacy: {
    slug: "privacy",
    image: "/images/legal-privacy.jpg",
    imageAlt: "A hand writing in a reflection journal that asks how you feel",
    title: "Privacy policy",
    eyebrow: "Legal",
    intro:
      "Your birth details and your conversations with us are personal. This policy explains what we collect, why we collect it, and how we keep it safe.",
    sections: [
      {
        heading: "Who we are",
        body: [
          "PRERNA is a self-discovery and personal guidance platform offering astrology, psychology and spirituality services. In this policy, 'PRERNA', 'we' and 'us' refer to the PRERNA platform and team.",
        ],
      },
      {
        heading: "What we collect",
        body: [
          "Details you give us: your name, email address, phone number, date, time and place of birth, and anything you choose to share in a form, booking request or session.",
          "Details from using the site: basic technical information such as browser type, device, pages visited and approximate location, collected through cookies and similar technologies.",
          "Payment details are handled by our payment provider. We do not store your full card details.",
        ],
      },
      {
        heading: "How we use your information",
        body: [
          "To calculate your free insights, charts and reports.",
          "To arrange, deliver and follow up on consultations you book.",
          "To reply to your messages and send information you have asked for.",
          "To improve the website, our tools and our services.",
          "We only send marketing emails if you have opted in, and you can unsubscribe at any time.",
        ],
      },
      {
        heading: "Third-party services",
        body: [
          "Some calculations are performed by trusted third-party astrology and numerology services, which receive only the birth details needed for the calculation. We also use providers for hosting, email, video calls and payments. Each is chosen with care and may only use your data to provide its service to us.",
        ],
      },
      {
        heading: "Confidentiality of sessions",
        body: [
          "What you share in a consultation stays between you and your PRERNA guide. We never sell your personal information or share session content with anyone, except where the law requires it or where there is a serious risk of harm to you or someone else.",
        ],
      },
      {
        heading: "How long we keep data",
        body: [
          "We keep your information only as long as needed to provide our services and meet legal and accounting obligations. You can ask us to delete your data at any time, subject to those obligations.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You can ask to see the information we hold about you, correct it, delete it, or withdraw consent for its use. To make a request, write to us through the Contact page and we will respond within 30 days.",
        ],
      },
      {
        heading: "Changes to this policy",
        body: [
          "We may update this policy from time to time. The date at the top of this page shows when it last changed.",
        ],
      },
    ],
  },

  terms: {
    slug: "terms",
    image: "/images/legal-terms.jpg",
    imageAlt: "An astronomical clock face showing the twelve zodiac signs",
    title: "Terms & conditions",
    eyebrow: "Legal",
    intro:
      "These terms set out how you may use the PRERNA website, tools and services. By using the site or booking a service, you agree to them.",
    sections: [
      {
        heading: "Our services",
        body: [
          "PRERNA offers free self-assessment tools, personalised reports and 1-1 consultations in Vedic astrology, counselling and spiritual wellness. Details, duration and price of each service are shown before you book.",
        ],
      },
      {
        heading: "Eligibility",
        body: [
          "You must be 18 or older to book a service. Sessions for children and adolescents must be booked by a parent or legal guardian, who should be present or available as agreed with the counsellor.",
        ],
      },
      {
        heading: "Bookings and payment",
        body: [
          "A booking is confirmed once payment is received and you receive a confirmation from us. Prices are shown in full, including any applicable taxes, before you pay.",
          "Please provide accurate birth details. Readings depend on them, and we cannot be responsible for results based on incorrect information.",
        ],
      },
      {
        heading: "Rescheduling and cancellations",
        body: [
          "Rescheduling and refunds are covered by our Refund & cancellation policy, which forms part of these terms.",
        ],
      },
      {
        heading: "Nature of guidance",
        body: [
          "Astrology, numerology and spiritual practices are offered for self-reflection and guidance. Counselling sessions are supportive conversations. None of our services are a substitute for medical, psychiatric, legal or financial advice. Please read our Disclaimer.",
        ],
      },
      {
        heading: "Your conduct",
        body: [
          "Please treat our team with respect. We may end a session or refuse service if behaviour is abusive or unsafe.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "All content on this website, including text, designs, reports and the PRERNA name and mark, belongs to PRERNA or its licensors. Your personal report is for your own use and may not be resold or republished.",
        ],
      },
      {
        heading: "Limitation of liability",
        body: [
          "We provide our services with care, but decisions you make after a reading or session remain your own. To the extent permitted by law, PRERNA is not liable for indirect or consequential losses arising from use of the site or services.",
        ],
      },
      {
        heading: "Changes and governing law",
        body: [
          "We may update these terms from time to time. These terms are governed by the laws of India, and any disputes are subject to the jurisdiction of the courts where PRERNA is registered.",
        ],
      },
    ],
  },

  cookies: {
    slug: "cookies",
    image: "/images/legal-cookies.jpg",
    imageAlt: "The sacred Om symbol on a dark background",
    title: "Cookie policy",
    eyebrow: "Legal",
    intro:
      "Cookies are small files stored on your device that help a website work and remember your choices. Here is how PRERNA uses them.",
    sections: [
      {
        heading: "Essential cookies",
        body: [
          "These keep the site working: remembering items in a booking flow, keeping you signed in, and protecting forms from misuse. They cannot be switched off.",
        ],
      },
      {
        heading: "Preference cookies",
        body: [
          "These remember choices such as your preferred chart style or language, so you do not have to set them again.",
        ],
      },
      {
        heading: "Analytics cookies",
        body: [
          "With your consent, we use privacy-friendly analytics to understand which pages are useful and where the site can be improved. This data is aggregated and does not identify you personally.",
        ],
      },
      {
        heading: "Third-party cookies",
        body: [
          "Embedded services such as video calls, payment pages or maps may set their own cookies. Their use is governed by those providers' policies.",
        ],
      },
      {
        heading: "Managing cookies",
        body: [
          "You can accept or decline non-essential cookies when you first visit, and change your mind at any time. You can also block or delete cookies in your browser settings, though some parts of the site may not work as intended.",
        ],
      },
    ],
  },

  refund: {
    slug: "refund",
    image: "/images/legal-refund.jpg",
    imageAlt: "Rows of lit clay diyas glowing in a temple",
    title: "Refund & cancellation policy",
    eyebrow: "Legal",
    intro:
      "Life happens. This policy explains how to reschedule or cancel a session, and when a refund applies.",
    sections: [
      {
        heading: "Rescheduling a consultation",
        body: [
          "You can reschedule a session free of charge up to 24 hours before its start time, once per booking.",
          "Requests made less than 24 hours before a session are handled at our discretion.",
        ],
      },
      {
        heading: "Cancelling a consultation",
        body: [
          "Cancel more than 48 hours before your session for a full refund.",
          "Cancel between 24 and 48 hours before for a 50% refund, or a free reschedule.",
          "Cancellations within 24 hours, and missed sessions, are not refundable.",
        ],
      },
      {
        heading: "Personalised reports",
        body: [
          "Because reports are prepared individually, they can be cancelled for a full refund only before preparation begins. Once your report has been prepared, it is non-refundable, but you may still reschedule the accompanying consultation call under the terms above.",
        ],
      },
      {
        heading: "If we need to cancel",
        body: [
          "If PRERNA has to cancel or cannot deliver a session, you can choose a new time or a full refund.",
        ],
      },
      {
        heading: "How refunds are paid",
        body: [
          "Approved refunds are returned to the original payment method within 7–10 working days. To request one, contact us through the Contact page with your booking details.",
        ],
      },
    ],
  },

  disclaimer: {
    slug: "disclaimer",
    image: "/images/legal-disclaimer.jpg",
    imageAlt:
      "A hand holding a compass, offering direction rather than certainty",
    title: "Disclaimer",
    eyebrow: "Legal",
    intro:
      "PRERNA offers guidance for self-understanding. Please read this page so you know what our services are, and what they are not.",
    sections: [
      {
        heading: "Guidance, not a guarantee",
        body: [
          "Astrology, numerology and spiritual insights describe tendencies and timing. They are not certain predictions, and outcomes depend on many factors, including your own choices.",
        ],
      },
      {
        heading: "Not medical or clinical advice",
        body: [
          "Our counselling and wellness services are supportive and educational. They are not a substitute for diagnosis or treatment by a doctor, psychiatrist or licensed clinical professional. Please do not stop or change any medical treatment based on a reading or session.",
        ],
      },
      {
        heading: "Not legal or financial advice",
        body: [
          "Insights about career, money, property or legal matters are for reflection only. Please consult a qualified professional before making legal or financial decisions.",
        ],
      },
      {
        heading: "If you are in crisis",
        body: [
          "PRERNA is not an emergency service. If you are thinking about harming yourself or are in immediate danger, please contact local emergency services or a crisis helpline straight away.",
        ],
      },
      {
        heading: "Accuracy of tools",
        body: [
          "Our free tools and reports rely on the details you provide and on third-party calculation services. We take care to keep them accurate, but cannot guarantee they are free of errors.",
        ],
      },
    ],
  },
};
