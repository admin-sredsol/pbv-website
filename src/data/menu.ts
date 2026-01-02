// src/data/menu.ts

export const headerMenu = [
  {
    name: "About",
    link: "/about",
    icon: "School",
    showArrow: true,
    children: [
      { name: "Management", link: "/team", icon: "Type" },
      { name: "Campus Tour", link: "/campus", icon: "Droplet" },
      { name: "Public Disclosure", link: "/publicdocs", icon: "Square" },
      { name: "Links", link: "/links", icon: "Link" },
    ],
  },

  {
    name: "Academics",
    link: "/academics",
    icon: "BookOpen",
    showArrow: true,
    children: [
      {
        name: "Curriculum",
        link: "/academics/state-board-curriculum",
        icon: "Type",
      },
      { name: "Calendar", link: "/academics/academic-calendar", icon: "Type" },
      { name: "Grades", link: "/academics/grades", icon: "Type" },
      { name: "Subjects", link: "/academics/subjects", icon: "Droplet" },
      { name: "Support", link: "/academics/support", icon: "Square" },
      { name: "Faq", link: "/academics/faq", icon: "Link" },
      { name: "Resources", link: "/academics/resources", icon: "Link" },
    ],
  },
  {
    name: "Gallery",
    link: "/gallery",
    icon: "TvMinimalPlay",
    showArrow: true,
    children: [
      { name: "Photo Album", link: "/gallery", icon: "Camera" },
      { name: "Video Album", link: "/videoalbums", icon: "Film" },
      // { name: "Theme Info", link: "/theme-info", icon: "Info" },
    ],
  },

  {
    name: "Innovation",
    link: "/academics/innovation",
    icon: "BrainCircuit",
    showArrow: true,
    children: [
      {
        name: "Interactive Learning Space",
        link: "/academics/innovation/ils",
        icon: "Camera",
        showArrow: true,
      },
      {
        name: "Atal Tinkering Lab",
        link: "/academics/innovation/atl",
        icon: "Film",
      },
      // { name: "Theme Info", link: "/theme-info", icon: "Info" },
    ],
  },

  {
    name: "Our Alumni",
    link: "https://alumni.prathibhavidyalayam.edu.in",
    icon: "Users",
  },
  { name: "Blog", link: "/blog", icon: "Book" },
];

export const footerMenu = [
  { name: "Style Guide", link: "/style-guide", icon: "Palette" },
  { name: "Photo Album", link: "/gallery", icon: "Camera" },
  { name: "Video Album", link: "/videoalbums", icon: "Film" },
  { name: "Video Album", link: "/videoalbums", icon: "Film" },
];

export const legalMenu = [
  { name: "Privacy Policy", link: "/legal/privacy-policy", icon: "Shield" },
  {
    name: "Terms of Service",
    link: "/legal/terms-of-service",
    icon: "FileText",
  },
];
