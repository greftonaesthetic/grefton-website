// Legal page content for the Grefton site.
// IMPORTANT: this is a working draft, not legal advice. Have a UAE lawyer review it before launch, and replace every
// [square-bracket] placeholder (trade licence, address, governing emirate, retention periods) with real details.

export const legalMeta = {
  company: "Grefton Pools and Landscaping LLC",
  brand: "Grefton",
  email: "info@grefton.ae", // TODO real email (also set in src/data/site.ts)
  updated: "14 October 2026",
};

export type LegalSection = { heading: string; body: string[] };
export type LegalDoc = { slug: string; title: string; description: string; intro: string; sections: LegalSection[] };

const c = legalMeta;

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "How Grefton collects, uses and protects your personal information.",
    intro: `This policy explains how ${c.company} ("${c.brand}", "we", "us") handles personal information when you use this website or contact us about a project.`,
    sections: [
      {
        heading: "Who we are",
        body: [
          `${c.company} is a landscaping and pools company based in the United Arab Emirates. Trade licence no. [licence number], issued by [licensing authority]. Registered address: [registered address].`,
          `You can reach us about anything in this policy at ${c.email}.`,
        ],
      },
      {
        heading: "Information we collect",
        body: [
          "Information you give us: your name, surname, phone number, email address and the message you write when you use our contact form, send us a WhatsApp message or email us. If you request a quote we may also ask for your project location, property type and budget range.",
          "Information collected automatically: like most websites, our hosting provider may record technical data such as your IP address, browser type, device type and the pages you visit, for security and to keep the site running.",
          "We do not knowingly collect sensitive personal data through this website, and we ask you not to send it to us.",
        ],
      },
      {
        heading: "How we use your information",
        body: [
          "To reply to your enquiry and prepare a quotation or site visit.",
          "To manage and deliver a project if you become a client, including scheduling, invoicing and aftercare.",
          "To keep our website secure, fix problems and improve how it works.",
          "To meet legal, tax and regulatory obligations.",
          "We will only send you marketing messages if you have asked us to, and you can opt out at any time.",
        ],
      },
      {
        heading: "Our basis for using your information",
        body: [
          "We use your information with your consent (for example when you submit the contact form), where it is needed to take steps at your request before a contract or to perform a contract, where we have a legitimate interest in running our business in a way that does not override your rights, and where the law requires it.",
        ],
      },
      {
        heading: "Who we share it with",
        body: [
          "We do not sell your personal information. We share it only with: service providers who help us run the business (for example website hosting, email and messaging providers and project management tools), subcontractors and suppliers who need the details to carry out your project, professional advisers, and government or regulatory authorities where the law requires.",
          "These parties may only use your information to provide services to us and are expected to protect it.",
        ],
      },
      {
        heading: "Transfers outside the UAE",
        body: [
          "Some of our service providers may store or process information outside the UAE. Where that happens we take reasonable steps so that your information stays protected as required by applicable UAE data protection law.",
        ],
      },
      {
        heading: "Third-party content",
        body: [
          "To display the website's typography, your browser may load fonts from Google Fonts, which means your IP address is sent to Google's servers. Our pages also link to our Instagram and LinkedIn profiles; those platforms have their own privacy policies and we are not responsible for them.",
        ],
      },
      {
        heading: "How long we keep it",
        body: [
          "We keep enquiry details for as long as needed to respond and for [12] months afterwards in case you come back to us. Client and project records are kept for [number] years to meet tax, warranty and legal requirements. After that we delete or anonymise them.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          `Under UAE data protection law (Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data) you may have the right to ask for access to the information we hold about you, to have it corrected or deleted, to restrict or object to certain uses, and to withdraw your consent. To exercise a right, email ${c.email}. We will respond within the time required by law.`,
        ],
      },
      {
        heading: "Security",
        body: [
          "We use reasonable technical and organisational measures to protect personal information. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
        ],
      },
      {
        heading: "Children",
        body: ["This website is not directed at children, and we do not knowingly collect information from anyone under 18."],
      },
      {
        heading: "Changes to this policy",
        body: ["We may update this policy from time to time. The date at the top shows when it was last changed."],
      },
    ],
  },
  {
    slug: "terms-and-conditions",
    title: "Terms & Conditions",
    description: "The terms that apply when you use the Grefton website.",
    intro: `These terms apply to your use of this website. By using it you agree to them. They do not replace the contract we sign with you for any landscaping or pool project.`,
    sections: [
      {
        heading: "About these terms",
        body: [
          `This website is operated by ${c.company} ("${c.brand}"), trade licence no. [licence number], [registered address], United Arab Emirates.`,
        ],
      },
      {
        heading: "Using the website",
        body: [
          "You may use the website for lawful purposes only. You must not try to disrupt it, gain unauthorised access to it, copy it in bulk or use it to send unsolicited advertising.",
          "We may change, suspend or remove any part of the website at any time without notice.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          `All content on this website, including text, logos, graphics, photographs, video and design, belongs to ${c.brand} or its licensors and is protected by UAE and international copyright and trademark laws.`,
          "You may view and print pages for your own personal, non-commercial use. You may not reproduce, distribute or use our content for any other purpose without our written permission.",
        ],
      },
      {
        heading: "Information and quotations",
        body: [
          "Information on this website, including descriptions, project examples, areas, durations and styles, is general and indicative. A price, estimate or timeline given by email, message or in conversation is not binding. A quotation becomes binding only when it is issued in writing by us, remains within its stated validity period of [30] days and is accepted and signed by you.",
          "Any landscaping or pool work is carried out under a separate written agreement that sets out the scope, price, payment schedule, programme and warranty.",
        ],
      },
      {
        heading: "No professional advice",
        body: [
          "Website content is not engineering, architectural, legal or horticultural advice. Always get advice specific to your property before making decisions, and note that approvals from the relevant developer or authority may be required for your project.",
        ],
      },
      {
        heading: "Third-party links",
        body: [
          "The website may link to other websites, such as social media pages. We do not control them and are not responsible for their content or practices.",
        ],
      },
      {
        heading: "Limitation of liability",
        body: [
          `To the fullest extent permitted by UAE law, ${c.brand} is not liable for any loss or damage arising from your use of, or inability to use, this website or from reliance on its content. Nothing in these terms excludes liability that cannot be excluded under applicable law.`,
        ],
      },
      {
        heading: "Governing law",
        body: [
          "These terms are governed by the laws of the United Arab Emirates as applied in the Emirate of [Dubai]. Any dispute will be subject to the exclusive jurisdiction of the courts of [Dubai], unless the law says otherwise.",
        ],
      },
      {
        heading: "Changes and contact",
        body: [`We may update these terms from time to time; the date at the top shows the latest version. Questions? Email ${c.email}.`],
      },
    ],
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    description: "Important notes about the information and images on the Grefton website.",
    intro: "Please read this notice together with our Terms & Conditions and Privacy Policy.",
    sections: [
      {
        heading: "General information only",
        body: [
          "The content of this website is provided for general information. We work to keep it accurate and up to date, but we make no promise that it is complete, current or free of errors.",
        ],
      },
      {
        heading: "Images and project examples",
        body: [
          "Some images on this website are illustrative or computer-generated visuals, and project examples, locations and figures are shown to demonstrate the type and standard of work we offer. They do not necessarily show completed Grefton projects, and your finished project may look different.",
        ],
      },
      {
        heading: "Results and natural materials",
        body: [
          "Landscapes are living things. Plant growth, colour, water use and long-term appearance depend on the climate, soil, maintenance, water quality and the way a space is used. We cannot guarantee any particular result. Natural stone, timber and other materials also vary in colour and texture.",
        ],
      },
      {
        heading: "Estimates, timelines and approvals",
        body: [
          "Any price, duration or schedule mentioned on the website or in early conversations is an estimate only. Timelines can change because of authority or developer approvals, weather, supply of materials and decisions made during the project.",
        ],
      },
      {
        heading: "No offer or contract",
        body: [
          "Nothing on this website is an offer capable of acceptance or creates a contract. A contract exists only when we both sign a written agreement for your project.",
        ],
      },
      {
        heading: "External links",
        body: [
          "Links to third-party websites, including our social media profiles, are provided for convenience. We are not responsible for their content.",
        ],
      },
    ],
  },
  {
    slug: "cookie-notice",
    title: "Cookie Notice",
    description: "How the Grefton website uses cookies and similar technologies.",
    intro: "This notice explains what cookies are and how this website uses them.",
    sections: [
      {
        heading: "What are cookies?",
        body: [
          "Cookies are small text files that a website stores on your device. They are widely used to make websites work, remember your choices and understand how a site is used.",
        ],
      },
      {
        heading: "How we use them today",
        body: [
          "At the time of writing, this website does not use analytics, advertising or tracking cookies. We only use the technical storage that is strictly necessary to display the site and keep it working.",
        ],
      },
      {
        heading: "If that changes",
        body: [
          "If we later add analytics or marketing tools (for example Google Analytics or social media pixels), we will update this notice and ask for your consent through a cookie banner before any non-essential cookies are set.",
        ],
      },
      {
        heading: "Third-party content",
        body: [
          "Loading fonts from Google Fonts, or following a link to our Instagram or LinkedIn pages, connects your browser to those services, which may set their own cookies under their own policies.",
        ],
      },
      {
        heading: "Managing cookies",
        body: [
          "You can block or delete cookies in your browser settings. Doing so will not stop the website from working.",
        ],
      },
      {
        heading: "Contact",
        body: [`Questions about this notice? Email ${c.email}.`],
      },
    ],
  },
];

export const getLegalDoc = (slug: string) => legalDocs.find((d) => d.slug === slug);
