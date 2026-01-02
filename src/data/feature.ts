import type { Feature } from "../types/feature";
import {
  BookOpen,
  Cpu,
  HeartHandshake,
  Palette,
  Trophy,
  Flower,
} from "lucide-astro";

export const features: Feature[] = [
  {
    icon: BookOpen,
    title: "Strong Academics",
    description:
      "A well-structured curriculum that emphasizes conceptual clarity, analytical thinking, and problem-solving skills to prepare students for competitive and real-world challenges.",
    cta: {
      text: "Explore Academics",
      href: "/academics",
      variant: "ghostDark",
    },
  },
  {
    icon: Cpu,
    title: "Innovation & Technology",
    description:
      "Access to ATL labs, hackathons, robotics, and STEM programs that ignite curiosity and prepare students for the future of innovation.",
    cta: {
      text: "ATL & ILS",
      href: "/academics/innovation",
      variant: "ghostDark",
    },
  },
  {
    icon: HeartHandshake,
    title: "Values & Character Building",
    description:
      "A focus on integrity, empathy, leadership, and respect, ensuring students grow as responsible and compassionate individuals.",
    cta: { text: "Our Values", href: "/about#values", variant: "ghostDark" },
  },
  {
    icon: Palette,
    title: "Arts & Cultural Activities",
    description:
      "A platform for students to explore and showcase their talents in music, dance, drama, and fine arts, fostering creativity and confidence.",
    cta: {
      text: "Arts & Events",
      href: "/activities/arts",
      variant: "ghostDark",
    },
  },
  {
    icon: Trophy,
    title: "Sports Excellence",
    description:
      "A rich sports culture with regular training and events, highlighted by the Prathibha Cup Inter-School Basketball Tournament, encouraging fitness, discipline, and teamwork.",
    cta: { text: "Sports Program", href: "/sports", variant: "ghostDark" },
  },
  {
    icon: Flower,
    title: "Holistic Development",
    description:
      "A balanced approach that blends academics, extracurriculars, life skills, and community engagement, shaping well-rounded individuals.",
    cta: {
      text: "Co-curricular",
      href: "/co-curricular",
      variant: "ghostDark",
    },
  },
];
