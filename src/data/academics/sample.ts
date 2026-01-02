/**
 * Sample data for academics section
 * - Courses
 * - Subjects
 * - Resources
 * - Events
 * - Faculty
 *
 * This file provides lightweight example data for local development and page scaffolding.
 * Replace URLs, descriptions and dates with real content before going to production.
 */

export interface Course {
  id: string;
  title: string;
  code?: string;
  grade?: string | number;
  type?: "AP" | "State" | string;
  summary?: string;
  teacher?: string;
  syllabusUrl?: string;
  tags?: string[];
}

export interface Subject {
  slug: string;
  title: string;
  description?: string;
  apEligible?: boolean;
  grades?: (string | number)[];
}

export interface Resource {
  id: string;
  title: string;
  fileUrl?: string;
  type?: "pdf" | "doc" | "ppt" | "zip" | "other";
  size?: string;
  subject?: string;
  grade?: string | number;
  description?: string;
  public?: boolean;
  updatedAt?: string; // ISO date
}

export interface EventItem {
  id: string;
  title: string;
  start: string; // ISO
  end?: string; // ISO
  description?: string;
  location?: string;
}

export interface Faculty {
  id: string;
  name: string;
  photo?: string;
  qualifications?: string;
  subjects?: string[];
  email?: string;
  bio?: string;
}

/* -------------------------------------------------------------------------- */
/* Sample courses                                                               */
/* -------------------------------------------------------------------------- */
export const sampleCourses: Course[] = [
  {
    id: "ap-chemistry",
    title: "AP Chemistry",
    code: "AP-CHEM",
    grade: "11-12",
    type: "AP",
    summary:
      "Rigorous study of chemical principles with laboratory investigations to prepare for the AP Chemistry exam.",
    teacher: "Dr. A. Rao",
    syllabusUrl: "/downloads/syllabi/ap-chemistry.pdf",
    tags: ["Laboratory", "Science", "Exam Prep"],
  },
  {
    id: "ap-calculus-ab",
    title: "AP Calculus AB",
    code: "AP-CALC-AB",
    grade: "11-12",
    type: "AP",
    summary:
      "Differential and integral calculus with focus on limits, derivatives, integrals and applications.",
    teacher: "Ms. K. Singh",
    syllabusUrl: "/downloads/syllabi/ap-calculus-ab.pdf",
    tags: ["Math", "Exam Prep"],
  },
  {
    id: "state-english-10",
    title: "English — Grade 10 (State Board)",
    code: "ENG-10-SB",
    grade: 10,
    type: "State",
    summary:
      "Literature, reading comprehension and writing aligned to state board learning outcomes for Grade 10.",
    teacher: "Mr. R. Gupta",
    syllabusUrl: "/downloads/syllabi/state-english-10.pdf",
    tags: ["Language", "Literature"],
  },
  {
    id: "state-maths-8",
    title: "Mathematics — Grade 8 (State Board)",
    code: "MATH-8-SB",
    grade: 8,
    type: "State",
    summary:
      "Arithmetic, pre-algebra and foundational geometry aligned with the state board curriculum for Grade 8.",
    teacher: "Ms. S. Patel",
    syllabusUrl: "/downloads/syllabi/state-maths-8.pdf",
    tags: ["Math", "Foundations"],
  },
];

/* -------------------------------------------------------------------------- */
/* Sample subjects                                                               */
/* -------------------------------------------------------------------------- */
export const sampleSubjects: Subject[] = [
  {
    slug: "mathematics",
    title: "Mathematics",
    description:
      "Covers arithmetic, algebra, geometry and calculus depending on grade level. AP-track offers advanced calculus and statistics options.",
    apEligible: true,
    grades: [6, 7, 8, 9, 10, 11, 12],
  },
  {
    slug: "chemistry",
    title: "Chemistry",
    description:
      "Foundational and advanced chemistry topics. AP Chemistry available for senior students, including lab work.",
    apEligible: true,
    grades: [9, 10, 11, 12],
  },
  {
    slug: "english",
    title: "English Language & Literature",
    description:
      "Language skills, literature study, and composition. State-board sequence prepares students for board exams; AP Literature/Language are available for advanced learners.",
    apEligible: true,
    grades: [6, 7, 8, 9, 10, 11, 12],
  },
  {
    slug: "computer-science",
    title: "Computer Science",
    description:
      "Computational thinking, programming fundamentals and applied projects. AP Computer Science Principles may be offered as an elective.",
    apEligible: true,
    grades: [9, 10, 11, 12],
  },
  {
    slug: "social-studies",
    title: "Social Studies",
    description:
      "History, civics and geography aligned to the state syllabus. Includes project-based learning.",
    apEligible: false,
    grades: [6, 7, 8, 9, 10, 11, 12],
  },
];

/* -------------------------------------------------------------------------- */
/* Sample resources                                                              */
/* -------------------------------------------------------------------------- */
export const sampleResources: Resource[] = [
  {
    id: "syllabus-ap-chem",
    title: "AP Chemistry — Syllabus (PDF)",
    fileUrl: "/downloads/syllabi/ap-chemistry.pdf",
    type: "pdf",
    size: "320 KB",
    subject: "chemistry",
    description: "Complete syllabus, lab schedule and assessment breakdown for AP Chemistry.",
    public: true,
    updatedAt: "2025-03-15",
  },
  {
    id: "sample-papers-state-10",
    title: "State Board — Grade 10 Sample Papers (ZIP)",
    fileUrl: "/downloads/sample-papers/grade-10-samples.zip",
    type: "zip",
    size: "2.1 MB",
    subject: "english",
    grade: 10,
    description: "Collection of previous year question papers and marking schemes.",
    public: true,
    updatedAt: "2024-12-01",
  },
  {
    id: "ap-calculus-handout",
    title: "AP Calculus — Topic Handouts (PDF)",
    fileUrl: "/downloads/handouts/ap-calculus-topics.pdf",
    type: "pdf",
    size: "450 KB",
    subject: "mathematics",
    description: "Topic-wise handouts and practice problems for AP Calculus AB.",
    public: true,
    updatedAt: "2025-01-10",
  },
  {
    id: "lab-safety",
    title: "Laboratory Safety Guidelines (PDF)",
    fileUrl: "/downloads/policies/lab-safety.pdf",
    type: "pdf",
    size: "120 KB",
    subject: "chemistry",
    description: "Mandatory safety procedures for all laboratory sessions.",
    public: true,
    updatedAt: "2024-08-20",
  },
];

/* -------------------------------------------------------------------------- */
/* Sample events                                                                 */
/* -------------------------------------------------------------------------- */
export const sampleEvents: EventItem[] = [
  {
    id: "evt-term-start",
    title: "Term 1 Begins",
    start: "2025-06-01T09:00:00Z",
    end: "2025-06-01T15:00:00Z",
    description: "First day of Term 1 — orientation and homeroom activities.",
    location: "Main Campus",
  },
  {
    id: "evt-midterms-2025",
    title: "Mid-term Examination Window",
    start: "2025-08-10T00:00:00Z",
    end: "2025-08-14T23:59:00Z",
    description: "Mid-term exams for Grades 6–12. Check individual subject schedules.",
    location: "Examination Halls",
  },
  {
    id: "evt-college-counselling",
    title: "College Counselling: AP Pathways",
    start: "2025-09-12T10:00:00Z",
    end: "2025-09-12T12:00:00Z",
    description: "Session for students and parents explaining AP examinations and college credit transfer.",
    location: "Auditorium",
  },
];

/* -------------------------------------------------------------------------- */
/* Sample faculty                                                                */
/* -------------------------------------------------------------------------- */
export const sampleFaculty: Faculty[] = [
  {
    id: "fac-rao",
    name: "Dr. Anjali Rao",
    photo: "/images/faculty/anjali-rao.jpg",
    qualifications: "Ph.D. Chemistry; M.Sc. (Chemistry)",
    subjects: ["chemistry", "ap-chemistry"],
    email: "anjali.rao@school.example",
    bio: "AP Chemistry instructor with 10+ years of experience in laboratory teaching and curriculum design.",
  },
  {
    id: "fac-singh",
    name: "Ms. Kavita Singh",
    photo: "/images/faculty/kavita-singh.jpg",
    qualifications: "M.Sc. Mathematics, B.Ed.",
    subjects: ["mathematics", "ap-calculus-ab"],
    email: "kavita.singh@school.example",
    bio: "Mathematics faculty focusing on calculus, problem-solving and AP exam coaching.",
  },
  {
    id: "fac-gupta",
    name: "Mr. Rohit Gupta",
    photo: "/images/faculty/rohit-gupta.jpg",
    qualifications: "M.A. English Literature, PGCE",
    subjects: ["english"],
    email: "rohit.gupta@school.example",
    bio: "Literature and language teacher with strong emphasis on reading skills and composition.",
  },
];

/* -------------------------------------------------------------------------- */
/* Exports for convenience                                                      */
/* -------------------------------------------------------------------------- */
export const academicsSample = {
  courses: sampleCourses,
  subjects: sampleSubjects,
  resources: sampleResources,
  events: sampleEvents,
  faculty: sampleFaculty,
};
