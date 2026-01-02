Recommended pages (routes) — structure and purpose
- `/academics` — Academics overview (hub)
  - Purpose: high-level landing for your academic offerings; links to AP, State Board, departments, calendar, resources, and admissions.
  - Main sections: eyebrow/title/short description; quick cards linking to `AP`, `State Board`, `Departments`, `Resources`, `Academic calendar`, CTA to Admissions.

- `/academics/ap-curriculum` — AP Curriculum (detail)
  - Purpose: explain AP pathway, course list, sample syllabi, prerequisites, exam support, college credit info.
  - Sections: hero (eyebrow/title/1-line), why AP, course catalog (cards with course name, grade, prerequisites, teacher), assessment & exam prep (mock exams, college counselling), sample syllabus downloads, faculty spotlight, FAQs, CTA to apply/contact.

- `/academics/state-board-curriculum` — State Board Curriculum (detail)
  - Purpose: explain State Board sequence, subject mapping, exam structure, board exam support.
  - Sections: hero, grade-by-grade curriculum (timeline/accordion per grade), subject pages link, board exam guidance, sample papers + resources, FAQs.

- `/academics/grade/[grade]` — Grade-level pages (optional dynamic)
  - Purpose: parents/students can see what each grade covers.
  - Sections: learning outcomes, subjects, assessment types, homework expectations, sample projects.

- `/academics/subjects` — Subjects index
  - Purpose: browsable subject list (Math, Physics, English, etc.) that link to subject detail pages.
  - Sections: subject cards, tags (AP/state), search/filter.

- `/academics/subject/[slug]` — Subject detail
  - Purpose: syllabus, topics by grade, sample resources, recommended AP or state alignment, faculty listing.

- `/academics/faculty` — Faculty & departments
  - Purpose: show teachers, qualifications, who teaches AP vs State Board subjects
  - Sections: department groups, bios, contact method, office hours link.

- `/academics/academic-calendar` — Timetable & Calendar
  - Purpose: show term dates, exam windows, holidays, events (downloadable ICS).
  - Sections: calendar widget, downloadable PDF, exam schedule, important dates.

- `/academics/resources` — Resources & downloads
  - Purpose: allocate syllabi, sample papers, policies, reading lists (AP reading list), forms.
  - Sections: tagged downloads, search, license/permission notes.

- `/academics/assessment` — Assessment & reporting
  - Purpose: explain assessment philosophy, grading scale, reports, parent-teacher meetings.
  - Sections: rubrics, report examples, remediation policy.

- `/academics/support` — Learning support & enrichment
  - Purpose: special education, tutoring, counseling, enrichment clubs (STEM, Debate, AP research).
  - Sections: services, referral process, contact.

- `/academics/faq` — Academic FAQ (common questions about AP vs State Board etc.)

- Optionally `/admissions/for-students` or `/admissions/academics` — link to admissions-specific academic requirements.

UI components to create / reuse
- `HeroSection` (eyebrow, title, description, CTA) — reuse same pattern as `Features.astro`.
- `CurriculumGrid` / `CourseCard` — for AP and state courses (title, grade, brief description, tags, teacher).
- `Accordion` (for grade-by-grade syllabus) — accessible accordion component.
- `FacultyList` / `TeacherCard` — photo, name, subjects, qualifications.
- `ResourcesList` — download items with `type`, `size`, `download` link.
- `CalendarWidget` — simple events list / link to ICS export.
- `FAQAccordion` — common Q&A.
- `SyllabusDownload` — component to show file, preview, and `srcset` if images.

Data model / frontmatter fields (recommended)
- For page data (e.g., `ap-curriculum.md` frontmatter or props):
  - `eyebrow`, `title`, `description`, `heroImage`, `slug`, `meta.title`, `meta.description`, `meta.image`.
- For course objects:
  - `id`, `title`, `code`, `grade`, `type` (AP/state), `prerequisites`, `summary`, `teacherId`, `syllabusUrl`, `tags`, `duration`.
- For faculty:
  - `id`, `name`, `photo`, `bio`, `qualifications`, `subjects`, `email`, `officeHours`.
- For resources:
  - `id`, `title`, `fileUrl`, `type` (pdf, doc), `size`, `grade`, `subject`, `public: boolean`.

SEO / metadata
- Each page should expose `meta.title`, `meta.description`, `og:image`.
- Use schema.org `Course` or `EducationalOrganization` where applicable (AP course pages can use `Course` markup).
- Use canonical URLs and structured data for events (calendar) and faculty (Person schema).

Accessibility & UX
- Ensure `Accordion` and `tabs` are keyboard accessible and ARIA-labeled.
- Provide `alt` for all images, and transcripts if you include video.
- Make downloads accessible (aria-label with file type and size).
- Make calendar items keyboard focusable.

Analytics / tracking
- Track CTA clicks: `View syllabus`, `Apply`, `Contact faculty` with event names like `academics.cta.syllabus`.
- Track which pages are most visited (AP vs State Board) to tailor comms.

Design / content tone recommendations
- For AP pages emphasize college-credit potential, exam prep, sample outcomes (college acceptances).
- For State Board pages emphasize compliance, board exam coaching, local validity, and extracurricular complement.
- Include case studies/achievements where possible (student AP scores, awards).

Implementation roadmap (priority)
1. Create `Academics` hub `/academics` — central navigation and links to two curricula.
2. Implement `AP Curriculum` page with `CurriculumGrid`, sample syllabus downloads, `FacultyList`. (High priority — differentiator.)
3. Implement `State Board Curriculum` page similarly with grade-wise accordion.
4. Add `Faculty` and `Resources` pages and wire up data.
5. Add `Academic Calendar` and `Assessment` pages.
6. Add `FAQ`, `Support` and integrate into Admissions flow.

Example directory layout (suggested)
- `src/pages/academics/index.astro` (hub)
- `src/pages/academics/ap-curriculum.astro`
- `src/pages/academics/state-board.astro`
- `src/pages/academics/subject/[slug].astro`
- `src/components/academics/CurriculumGrid.astro`
- `src/components/academics/CourseCard.astro`
- `src/components/academics/FacultyList.astro`
- `src/components/academics/ResourceItem.astro`

Small, safe starter tasks I can do now
- Create `src/pages/academics/ap-curriculum.astro` template using your existing `Hero`, `Button`, grid styles and Flowbite components.
- Implement `CourseCard` and `CurriculumGrid` components and wire one example dataset.
- Add an `Academic` hub page linking to the two curricula and `Faculty` / `Resources`.

Which would you like me to start with?
- I can scaffold the full pages (AP + State Board + hub) and components and wire sample content (fast).
- Or I can implement the single AP Curriculum page completely (detailed content + downloads + faculty list) first.

Tell me which option and I’ll create the files and wire up examples.
