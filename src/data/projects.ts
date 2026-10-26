// Placeholder projects (Project 1, Project 2). Replace the [bracketed] values and photos with real project details.
// Images are still the original template's placeholders (/_external/...) until real photos are supplied.
export type Project = {
  slug: string;
  name: string;
  location: string;
  type: string;
  area: string;
  summary: string;
  intro: string;
  specs: [string, string][];
  sections: [string, string][];
  delivery: [string, string];
  highlights: [string, string];
  cardImage: string;
  images: string[];
  highlightImages: string[];
};

export const projects: Project[] = [
  {
    "slug": "project-1",
    "name": "Project 1",
    "location": "[Location]",
    "type": "[Project type]",
    "area": "[Area]",
    "summary": "A short description of this project will go here: the brief, the design approach and the result.",
    "intro": "A short introduction to this project will go here.",
    "specs": [
      [
        "Emirate",
        "[to be added]"
      ],
      [
        "Plot area",
        "[to be added]"
      ],
      [
        "Features",
        "[to be added]"
      ],
      [
        "Duration",
        "[to be added]"
      ],
      [
        "Client type",
        "[to be added]"
      ],
      [
        "Planted area",
        "[to be added]"
      ],
      [
        "Completed",
        "[to be added]"
      ],
      [
        "Trees planted",
        "[to be added]"
      ]
    ],
    "sections": [
      [
        "Overview",
        "Describe the brief and the design approach for this project."
      ],
      [
        "Planting & materials",
        "List the main plants, materials and features used."
      ],
      [
        "Scope",
        "Landscape design, build, planting, pool and aftercare."
      ]
    ],
    "delivery": [
      "Completed",
      "[Year]"
    ],
    "highlights": [
      "A highlight of this project: a feature or a moment worth showing.",
      "A second highlight: another feature clients love."
    ],
    "cardImage": "/images/pool-retreat.webp",
    "images": [
      "/images/pool-retreat.webp",
      "/images/pergola-oasis.webp",
      "/images/process-1.webp",
      "/images/process-2.webp",
      "/images/home-intro.webp",
      "/images/footer-family.webp",
      "/images/step-enjoy.webp"
    ],
    "highlightImages": [
      "/images/pergola-oasis.webp",
      "/images/process-1.webp"
    ]
  },
  {
    "slug": "project-2",
    "name": "Project 2",
    "location": "[Location]",
    "type": "[Project type]",
    "area": "[Area]",
    "summary": "A short description of this project will go here: the brief, the design approach and the result.",
    "intro": "A short introduction to this project will go here.",
    "specs": [
      [
        "Emirate",
        "[to be added]"
      ],
      [
        "Plot area",
        "[to be added]"
      ],
      [
        "Features",
        "[to be added]"
      ],
      [
        "Duration",
        "[to be added]"
      ],
      [
        "Client type",
        "[to be added]"
      ],
      [
        "Planted area",
        "[to be added]"
      ],
      [
        "Completed",
        "[to be added]"
      ],
      [
        "Trees planted",
        "[to be added]"
      ]
    ],
    "sections": [
      [
        "Overview",
        "Describe the brief and the design approach for this project."
      ],
      [
        "Planting & materials",
        "List the main plants, materials and features used."
      ],
      [
        "Scope",
        "Landscape design, build, planting, pool and aftercare."
      ]
    ],
    "delivery": [
      "Completed",
      "[Year]"
    ],
    "highlights": [
      "A highlight of this project: a feature or a moment worth showing.",
      "A second highlight: another feature clients love."
    ],
    "cardImage": "/images/process-1.webp",
    "images": [
      "/images/process-1.webp",
      "/images/pergola-oasis.webp",
      "/images/process-2.webp",
      "/images/home-intro.webp",
      "/images/footer-family.webp",
      "/images/step-enjoy.webp",
      "/images/pool-retreat.webp"
    ],
    "highlightImages": [
      "/images/pergola-oasis.webp",
      "/images/process-2.webp"
    ]
  }
] as unknown as Project[];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
