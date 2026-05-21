# Academic Webpage Design

Date: 2026-05-21

## Summary

Build a modern personal academic website for Jianyuan Zhong as an Astro static site deployable on GitHub Pages. The site should feel like a polished research portfolio: serious, readable, publication-forward, and personal enough to communicate a clear research identity.

## Goals

- Present Jianyuan Zhong as a Ph.D. student and researcher working on generative models for reasoning, verification, agentic post-training, and complex decision-making.
- Make selected work easy to scan, especially Stabilizing Reinforcement Learning for Diffusion Language Models, Solve-Detect-Verify, Mathesis, and Dyve.
- Show research internships prominently, including Ant Group/InclusionAI, Huawei Hong Kong Research Center, and Mila.
- Provide a clean multi-page structure suitable for GitHub Pages.
- Keep public contact information academic-safe: email, CUHK affiliation, GitHub, LinkedIn, Google Scholar, and DBLP; no phone number.

## Non-Goals

- No backend, CMS, database, comments, analytics, or server-rendered dynamic content.
- No live scraping of Google Scholar. The Google Scholar profile should be linked, but citation counts should not be invented or automatically fetched.
- No embedded CV preview. The CV page should provide clear open/download actions only.

## Site Structure

The first version will include five top-level pages:

- `Home`: narrative entry point with headshot, short bio, research focus, selected work, compact news, and research experience.
- `Publications`: selected publications first, then thematic groupings, then a complete reverse-year list.
- `Projects`: major research and applied project threads as readable cards.
- `CV`: open/download links for `cv-overleaf-visa-acl2026/Jianyuan_Zhong_CV_202605.pdf`.
- `Contact`: academic-safe contact details and profile links.

## Homepage Design

The homepage should use a modern research-portfolio layout:

- Top navigation: Home, Publications, Projects, CV, Contact.
- Hero: Jianyuan Zhong, CUHK CSE Ph.D. student identity, concise research tagline, and the user-provided headshot.
- Primary calls to action: Publications, Projects, CV.
- Selected Work: four highlighted publications:
  - Stabilizing Reinforcement Learning for Diffusion Language Models
  - Solve-Detect-Verify: Inference-Time Scaling with Flexible Generative Verifier
  - Mathesis: Towards Formal Theorem Proving from Natural Languages
  - Dyve: Thinking Fast and Slow for Dynamic Process Verification
- News: compact recent updates, including ACL 2026, EMNLP 2025, and ICLR 2025 items.
- Research Experience: compact cards for Ant Group/InclusionAI, Huawei Hong Kong Research Center, and Mila.

## Content Sources

- CV source: `cv-overleaf-visa-acl2026/resume.tex` and files under `cv-overleaf-visa-acl2026/resume/`.
- CV PDF: `cv-overleaf-visa-acl2026/Jianyuan_Zhong_CV_202605.pdf`.
- Publication BibTeX: `cv-overleaf-visa-acl2026/conference.bib`.
- Public scholarly links:
  - Google Scholar: `https://scholar.google.com/citations?user=LbLMWaAAAAAJ&hl=en`
  - DBLP: `https://dblp.org/pid/239/5133`
  - OpenReview profile may be used as supporting reference for public profile data.
- Headshot: use the user-provided image from the conversation. If implementation cannot access the inline asset directly, ask the user for the local image file path before finalizing the site.

## Technical Approach

Use Astro as a static-site generator. The site should be componentized but lightweight:

- `src/layouts/BaseLayout.astro`: shared page frame, metadata, navigation, footer.
- `src/components/PublicationCard.astro`: publication display with venue/year/theme links.
- `src/components/ProjectCard.astro`: project summary cards.
- `src/components/ExperienceCard.astro`: research experience cards.
- `src/data/publications.ts`: structured publication records derived from the CV BibTeX.
- `src/data/projects.ts`: structured project records derived from the CV project section.
- `src/data/experience.ts`: education and research experience records from the CV.
- `public/assets/`: CV PDF, headshot, and any selected static research visuals.

The implementation should avoid client-side routing so GitHub Pages serves clean static pages.

## Publication Organization

The Publications page should combine the user's requested approaches:

1. Selected publications at the top for quick scanning.
2. Thematic groupings for research context, such as:
   - Diffusion language models and agentic post-training
   - Reasoning, verification, and theorem proving
   - Dialogue systems and guideline compliance
   - Speech and multimodal learning
   - Circuit representation and AI for design
3. Full reverse-year publication list with links where available.

Each publication record should support title, authors, venue, year, theme, selected flag, short note, and external links.

## Visual Style

The site should use a restrained modern academic palette:

- Backgrounds: white and cool off-white.
- Text: near-black and slate gray.
- Accents: a small set of blue, teal, orange, and violet accents for research themes.
- Typography: readable sans-serif body text with strong hierarchy; no decorative hero illustration.
- Cards: subtle borders, low radius, compact spacing.

The design should avoid a marketing landing-page feel. It should be clean, fast, and credible for academic readers.

## Error Handling And Fallbacks

- If a publication link is missing, show the publication without a broken link.
- If the headshot asset is unavailable during implementation, use a neutral placeholder only during development and ask for the source image before final delivery.
- If the CV PDF is missing, the CV page should explain that the file is unavailable rather than exposing a broken button.
- If GitHub Pages uses a repository subpath, Astro should be configured with the correct `base` setting before deployment.

## Verification

Before calling the site complete:

- Run the Astro build command and confirm static output succeeds.
- Preview the site locally.
- Check desktop and mobile layouts in browser screenshots.
- Verify navigation links work on all pages.
- Verify CV buttons point to the copied PDF.
- Verify external links open to GitHub, LinkedIn, Google Scholar, and DBLP.
- Confirm no phone number appears on the public site.

## Deployment

Target GitHub Pages from this repository. Prefer an Astro build that outputs static files under `dist/`, with a clear deploy path documented in the implementation plan.

