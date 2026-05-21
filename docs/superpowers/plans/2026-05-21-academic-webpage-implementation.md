# Academic Webpage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Jianyuan Zhong's modern multi-page academic website as an Astro static site deployable to GitHub Pages.

**Architecture:** The site will be a static Astro project with reusable layouts/components and structured TypeScript data files for profile, publications, projects, and experience. Pages render from the data layer so future publication and project updates are localized.

**Tech Stack:** Astro, TypeScript, Vitest for data/content checks, vanilla CSS, GitHub Pages Actions.

---

## File Structure

- Create `package.json`: npm scripts and dependencies.
- Create `astro.config.mjs`: static Astro config with GitHub Pages-friendly `base`.
- Create `tsconfig.json`: Astro TypeScript config.
- Create `src/env.d.ts`: Astro type reference.
- Create `src/styles/global.css`: complete site styling.
- Create `src/layouts/BaseLayout.astro`: shared HTML frame, metadata, navigation, footer.
- Create `src/components/PublicationCard.astro`: reusable publication entry.
- Create `src/components/ProjectCard.astro`: reusable project entry.
- Create `src/components/ExperienceCard.astro`: reusable experience entry.
- Create `src/utils/paths.ts`: helper for internal links and assets under GitHub Pages base paths.
- Create `src/data/profile.ts`: identity, bio, links, contact, news.
- Create `src/data/publications.ts`: selected, themed, and complete publication records.
- Create `src/data/projects.ts`: project records.
- Create `src/data/experience.ts`: education and research experience records.
- Create `src/data/site-data.test.ts`: Vitest checks for critical content.
- Create `src/pages/index.astro`: homepage.
- Create `src/pages/publications.astro`: publications page.
- Create `src/pages/projects.astro`: projects page.
- Create `src/pages/cv.astro`: CV page with open/download buttons.
- Create `src/pages/contact.astro`: academic-safe contact page.
- Create `scripts/verify-content.mjs`: post-build static HTML checks.
- Create `.github/workflows/deploy.yml`: GitHub Pages deployment workflow.
- Create or modify `.gitignore`: ignore dependencies, build output, local OS files, and `.superpowers/`.
- Copy `cv-overleaf-visa-acl2026/Jianyuan_Zhong_CV_202605.pdf` to `public/assets/Jianyuan_Zhong_CV_202605.pdf`.
- Add user-provided headshot as `public/assets/headshot.jpg`.

## Task 1: Astro Project Scaffold

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/env.d.ts`
- Create: `src/pages/index.astro`
- Create: `.gitignore`

- [ ] **Step 1: Create project manifest**

Create `package.json`:

```json
{
  "name": "jianyuan-academic-webpage",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev --host 127.0.0.1",
    "build": "astro check && astro build",
    "preview": "astro preview --host 127.0.0.1",
    "test": "vitest run",
    "verify": "npm run test && npm run build && node scripts/verify-content.mjs"
  },
  "dependencies": {
    "@astrojs/check": "^0.9.4",
    "astro": "^5.8.0",
    "typescript": "^5.8.3"
  },
  "devDependencies": {
    "vitest": "^3.1.4"
  }
}
```

- [ ] **Step 2: Create Astro config**

Create `astro.config.mjs`:

```js
import { defineConfig } from "astro/config";

const [owner = "JianyuanZhong", repository = ""] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
const isUserSite = repository.toLowerCase() === `${owner.toLowerCase()}.github.io`;

export default defineConfig({
  output: "static",
  site: `https://${owner}.github.io`,
  base: process.env.BASE_PATH ?? (repository && !isUserSite ? `/${repository}` : "/"),
});
```

- [ ] **Step 3: Create TypeScript config**

Create `tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@data/*": ["src/data/*"],
      "@layouts/*": ["src/layouts/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

- [ ] **Step 4: Create Astro environment types**

Create `src/env.d.ts`:

```ts
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
```

- [ ] **Step 5: Create minimal page for scaffold validation**

Create `src/pages/index.astro`:

```astro
---
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Jianyuan Zhong</title>
  </head>
  <body>
    <main>
      <h1>Jianyuan Zhong</h1>
      <p>Academic website scaffold.</p>
    </main>
  </body>
</html>
```

- [ ] **Step 6: Create repository ignore rules**

Create `.gitignore`:

```gitignore
.DS_Store
.astro/
.superpowers/
dist/
node_modules/
npm-debug.log*
```

- [ ] **Step 7: Install dependencies**

Run:

```bash
npm install
```

Expected: `package-lock.json` is created and dependencies install without errors.

- [ ] **Step 8: Verify scaffold builds**

Run:

```bash
npm run build
```

Expected: Astro check and build both complete, and `dist/index.html` exists.

- [ ] **Step 9: Commit scaffold**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json src/env.d.ts src/pages/index.astro .gitignore
git commit -m "feat: scaffold Astro academic site"
```

## Task 2: Data Layer And Data Tests

**Files:**
- Create: `src/data/profile.ts`
- Create: `src/data/publications.ts`
- Create: `src/data/projects.ts`
- Create: `src/data/experience.ts`
- Create: `src/data/site-data.test.ts`

- [ ] **Step 1: Write failing data tests**

Create `src/data/site-data.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { profile } from "./profile";
import { experiences } from "./experience";
import { projects } from "./projects";
import { publications } from "./publications";

describe("site data", () => {
  it("uses the approved public identity", () => {
    expect(profile.name).toBe("Jianyuan Zhong");
    expect(profile.title).toContain("Ph.D. candidate");
    expect("phone" in profile.contact).toBe(false);
    expect(profile.links.some((link) => link.label === "Google Scholar")).toBe(true);
    expect(profile.links.some((link) => link.label === "DBLP")).toBe(true);
  });

  it("highlights the approved selected publications", () => {
    const selectedTitles = publications.filter((paper) => paper.selected).map((paper) => paper.title);
    expect(selectedTitles).toContain("Stabilizing Reinforcement Learning for Diffusion Language Models");
    expect(selectedTitles).toContain("Solve-Detect-Verify: Inference-Time Scaling with Flexible Generative Verifier");
    expect(selectedTitles).toContain("Mathesis: Towards Formal Theorem Proving from Natural Languages");
    expect(selectedTitles).toContain("Dyve: Thinking Fast and Slow for Dynamic Process Verification");
  });

  it("records the ICML 2026 acceptance", () => {
    const paper = publications.find((entry) => entry.id === "stabilizing-dllm-rl");
    expect(paper?.venue).toBe("ICML 2026");
    expect(paper?.note).toContain("Accepted");
  });

  it("keeps the requested internship experience visible", () => {
    const organizations = experiences.map((experience) => experience.organization);
    expect(organizations).toContain("Ant Group - InclusionAI");
    expect(organizations).toContain("Foundation Model Department, Huawei Hong Kong Research Center");
    expect(organizations).toContain("Quebec Artificial Intelligence Institute - Mila");
  });

  it("includes project cards for the main research threads", () => {
    expect(projects.map((project) => project.id)).toEqual(
      expect.arrayContaining(["agentic-dllm-post-training", "formal-reasoning", "dynamic-process-verification"])
    );
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
npm run test
```

Expected: FAIL because `src/data/profile.ts`, `src/data/publications.ts`, `src/data/projects.ts`, and `src/data/experience.ts` do not exist yet.

- [ ] **Step 3: Create profile data**

Create `src/data/profile.ts`:

```ts
export type ProfileLink = {
  label: string;
  href: string;
};

export const profile = {
  name: "Jianyuan Zhong",
  title: "Ph.D. candidate",
  affiliation: "Department of Computer Science & Engineering, The Chinese University of Hong Kong",
  location: "Hong Kong SAR",
  email: "chungginyun@gmail.com",
  tagline: "Generative models for reasoning, verification, and complex decision-making.",
  bio:
    "I develop generative models that improve decision-making in complex optimization and reasoning settings, with recent work on diffusion language models, process verification, formal theorem proving, and agentic post-training.",
  researchQuestions: [
    "How can models learn effective representations of problems and solution processes?",
    "How can process supervision from optimal decision sequences improve language and diffusion models?",
    "How can trained generative models sample faster or more cost-efficient solutions?",
  ],
  contact: {
    email: "chungginyun@gmail.com",
  },
  links: [
    { label: "Google Scholar", href: "https://scholar.google.com/citations?user=LbLMWaAAAAAJ&hl=en" },
    { label: "DBLP", href: "https://dblp.org/pid/239/5133" },
    { label: "GitHub", href: "https://github.com/JianyuanZhong" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jianyuanzhong" },
  ] satisfies ProfileLink[],
  news: [
    {
      date: "2026",
      text: "Stabilizing Reinforcement Learning for Diffusion Language Models accepted to ICML 2026.",
    },
    {
      date: "2026",
      text: "Solve-Detect-Verify accepted to ACL 2026.",
    },
    {
      date: "2025",
      text: "Dyve accepted to EMNLP 2025.",
    },
    {
      date: "2025",
      text: "Mathesis and DeepGate4 appeared at ICLR 2025.",
    },
  ],
};
```

- [ ] **Step 4: Create publications data**

Create `src/data/publications.ts`:

```ts
export type Publication = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  theme: "Diffusion Language Models" | "Reasoning And Verification" | "Dialogue Systems" | "Speech And Multimodal Learning" | "AI For Design";
  selected?: boolean;
  note?: string;
  links?: { label: string; href: string }[];
};

export const publications: Publication[] = [
  {
    id: "stabilizing-dllm-rl",
    title: "Stabilizing Reinforcement Learning for Diffusion Language Models",
    authors: "Jianyuan Zhong, Kaibo Wang, Ding Ding, Zijin Feng, Haoli Bai, Yang Xiang, Jiacheng Sun, Qiang Xu",
    venue: "ICML 2026",
    year: 2026,
    theme: "Diffusion Language Models",
    selected: true,
    note: "Accepted; RL post-training for diffusion language models.",
    links: [{ label: "arXiv", href: "https://arxiv.org/abs/2603.06743" }],
  },
  {
    id: "solve-detect-verify",
    title: "Solve-Detect-Verify: Inference-Time Scaling with Flexible Generative Verifier",
    authors: "Jianyuan Zhong, Zeju Li, Zhijian Xu, Xiangyu Wen, Kezhi Li, Qiang Xu",
    venue: "ACL 2026",
    year: 2026,
    theme: "Reasoning And Verification",
    selected: true,
    note: "Flexible generative verifier for inference-time scaling.",
  },
  {
    id: "mathesis",
    title: "Mathesis: Towards Formal Theorem Proving from Natural Languages",
    authors:
      "Xuejun Yu, Jianyuan Zhong, Zijin Feng, Pengyi Zhai, Roozbeh Yousefzadeh, Wei Chong Ng, Haoxiong Liu, Ziyi Shou, Jing Xiong, Yudong Zhou, Claudia Beth Ong, Austen Jeremy Sugiarto, Yaoxi Zhang, Wai Ming Tai, Huan Cao, Dongcai Lu, Jiacheng Sun, Qiang Xu, Shen Xin, Zhenguo Li",
    venue: "ICLR 2025",
    year: 2025,
    theme: "Reasoning And Verification",
    selected: true,
    note: "Formal theorem proving from natural language.",
  },
  {
    id: "dyve",
    title: "Dyve: Thinking Fast and Slow for Dynamic Process Verification",
    authors: "Jianyuan Zhong, Zeju Li, Zhijian Xu, Xiangyu Wen, Qiang Xu",
    venue: "EMNLP 2025",
    year: 2025,
    theme: "Reasoning And Verification",
    selected: true,
    note: "Dynamic generative process reward modeling.",
  },
  {
    id: "reasoning-scaffolding",
    title: "Reasoning Scaffolding: Distilling the Flow of Thought from LLMs",
    authors: "Xiangyu Wen, Junhua Huang, Zeju Li, Min Li, Jianyuan Zhong, Zhijian Xu, Mingxuan Yuan, Yongxiang Huang, Qiang Xu",
    venue: "ICLR 2026",
    year: 2026,
    theme: "Reasoning And Verification",
  },
  {
    id: "step-entropy",
    title: "Compressing Chain-of-Thought in LLMs via Step Entropy",
    authors: "Zeju Li, Jianyuan Zhong, Ziyang Zheng, Xiangyu Wen, Zhijian Xu, Yingying Cheng, Fan Zhang, Qiang Xu",
    venue: "ICLR 2026",
    year: 2026,
    theme: "Reasoning And Verification",
  },
  {
    id: "guidedtod",
    title: "Guideline Compliance in Task-Oriented Dialogue: The Chained Prior Approach",
    authors: "Xiangyu Wen, Jianyuan Zhong, Zhijian Xu, Qiang Xu",
    venue: "Findings of NAACL 2025",
    year: 2025,
    theme: "Dialogue Systems",
    links: [{ label: "ACL Anthology", href: "https://aclanthology.org/2025.findings-naacl.377/" }],
  },
  {
    id: "deepgate4",
    title: "DeepGate4: Efficient and Effective Representation Learning for Circuit Design at Scale",
    authors: "Ziyang Zheng, Shan Huang, Jianyuan Zhong, Zhengyuan Shi, Guohao Dai, Ningyi Xu, Qiang Xu",
    venue: "ICLR 2025",
    year: 2025,
    theme: "AI For Design",
  },
  {
    id: "deepcircuitx",
    title: "DeepCircuitX: Repository-Level RTL Dataset for Code Understanding, Generation, and Multimodal Analysis",
    authors: "Zeju Li, Changran Xu, Zhengyuan Shi, Zedong Peng, Yi Liu, Yunhao Zhou, Lingfeng Zhou, Chengyu Ma, Jianyuan Zhong, Xi Wang, Jieru Zhao, Zhufei Chu, Xiaoyan Yang, Qiang Xu",
    venue: "IEEE LAD 2025",
    year: 2025,
    theme: "AI For Design",
  },
  {
    id: "guardt2i",
    title: "GuardT2I: Defending Text-to-Image Models from Adversarial Prompts",
    authors: "Yijun Yang, Ruiyuan Gao, Xiao Yang, Jianyuan Zhong, Qiang Xu",
    venue: "NeurIPS 2024",
    year: 2024,
    theme: "Reasoning And Verification",
  },
  {
    id: "deepgate3",
    title: "DeepGate3: Towards Scalable Circuit Representation Learning",
    authors: "Zhengyuan Shi, Ziyang Zheng, Sadaf Khan, Jianyuan Zhong, Min Li, Qiang Xu",
    venue: "DAC 2024",
    year: 2024,
    theme: "AI For Design",
  },
  {
    id: "speechbrain",
    title: "SpeechBrain: A General-Purpose Speech Toolkit",
    authors: "Mirco Ravanelli, Titouan Parcollet, Peter Plantinga, Aku Rouhe, Samuele Cornell, Loren Lugosch, Cem Subakan, Nauman Dawalatabad, Abdelwahab Heba, Jianyuan Zhong, and others",
    venue: "arXiv 2021",
    year: 2021,
    theme: "Speech And Multimodal Learning",
  },
  {
    id: "sepformer",
    title: "Attention Is All You Need in Speech Separation",
    authors: "Cem Subakan, Mirco Ravanelli, Samuele Cornell, Mirko Bronzi, Jianyuan Zhong",
    venue: "ICASSP 2021",
    year: 2021,
    theme: "Speech And Multimodal Learning",
    links: [{ label: "arXiv", href: "https://arxiv.org/abs/2010.13154" }],
  },
  {
    id: "robust-speech",
    title: "Multi-Task Self-Supervised Learning for Robust Speech Recognition",
    authors: "Mirco Ravanelli, Jianyuan Zhong, Santiago Pascual, Pawel Swietojanski, Joao Monteiro, Jan Trmal, Yoshua Bengio",
    venue: "ICASSP 2020",
    year: 2020,
    theme: "Speech And Multimodal Learning",
  },
  {
    id: "ur-funny",
    title: "UR-FUNNY: A Multimodal Language Dataset for Understanding Humor",
    authors: "Md Kamrul Hasan, Wasifur Rahman, AmirAli Bagher Zadeh, Jianyuan Zhong, Md Iftekhar Tanveer, Louis-Philippe Morency, Mohammed Ehsan Hoque",
    venue: "EMNLP-IJCNLP 2019",
    year: 2019,
    theme: "Speech And Multimodal Learning",
    links: [{ label: "ACL Anthology", href: "https://aclanthology.org/D19-1211" }],
  },
];

export const themes = Array.from(new Set(publications.map((publication) => publication.theme)));
```

- [ ] **Step 5: Create project data**

Create `src/data/projects.ts`:

```ts
export type Project = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  linkLabel?: string;
  linkHref?: string;
};

export const projects: Project[] = [
  {
    id: "agentic-dllm-post-training",
    title: "Agentic Post-Training for Diffusion Language Models",
    summary:
      "End-to-end infrastructure and algorithms for task-specific harnesses, sandbox environments, SFT trajectory collection, and distributed on-policy training for diffusion language models.",
    tags: ["Diffusion language models", "Agentic RL", "Post-training"],
  },
  {
    id: "formal-reasoning",
    title: "Formal Reasoning And Theorem Proving",
    summary:
      "Research on automatic theorem proving and formal reasoning from natural language, including Mathesis and related verification pipelines.",
    tags: ["Formal methods", "Theorem proving", "LLM reasoning"],
  },
  {
    id: "dynamic-process-verification",
    title: "Dynamic Generative Process Verification",
    summary:
      "Generative verifier methods for reasoning trajectories, including Dyve and Solve-Detect-Verify, designed to improve inference-time scaling and verification.",
    tags: ["Process verification", "Generative verifier", "Inference-time scaling"],
  },
  {
    id: "guided-dialogue-systems",
    title: "Guideline-Compliant Dialogue Systems",
    summary:
      "Task-oriented dialogue research that encodes operational guidelines through chained priors for stronger policy compliance.",
    tags: ["Dialogue systems", "Guideline compliance", "Policy modeling"],
  },
  {
    id: "speechbrain-speech-modeling",
    title: "SpeechBrain And Speech Modeling",
    summary:
      "Core toolkit and modeling contributions to open-source conversational AI, ASR, and speech separation research.",
    tags: ["SpeechBrain", "ASR", "Speech separation"],
  },
  {
    id: "quantitative-finance-ai",
    title: "AI In Real-World Quantitative Finance",
    summary:
      "Deep-learning models for high-frequency quantitative trading, including CNN-Transformer feature extraction and graph-learning formulations for market ranking.",
    tags: ["Optimization", "Time series", "Quantitative finance"],
  },
];
```

- [ ] **Step 6: Create experience data**

Create `src/data/experience.ts`:

```ts
export type Experience = {
  role: string;
  organization: string;
  location: string;
  period: string;
  summary: string;
  supervisor?: string;
};

export type Education = {
  degree: string;
  institution: string;
  location: string;
  period: string;
  details: string;
};

export const experiences: Experience[] = [
  {
    role: "Research Intern",
    organization: "Ant Group - InclusionAI",
    location: "Hangzhou, China",
    period: "Mar 2026 - Present",
    supervisor: "Dr. Junbo Zhao",
    summary: "Agentic post-training for diffusion language models, including task harnesses, sandbox environments, SFT trajectory collection, and distributed on-policy training.",
  },
  {
    role: "Research Intern",
    organization: "Foundation Model Department, Huawei Hong Kong Research Center",
    location: "Hong Kong SAR",
    period: "Mar 2025 - Mar 2026",
    supervisor: "Dr. Zhenguo Li",
    summary: "Formal reasoning, automatic theorem proving, and diffusion language models.",
  },
  {
    role: "Research Assistant",
    organization: "The Chinese University of Hong Kong",
    location: "Hong Kong SAR",
    period: "Oct 2022 - Jul 2023",
    supervisor: "Prof. Qiang Xu",
    summary: "Research in AI systems and reasoning under the supervision of Prof. Qiang Xu.",
  },
  {
    role: "Research Intern",
    organization: "Quebec Artificial Intelligence Institute - Mila",
    location: "Montreal, Canada",
    period: "May 2020 - Jun 2021",
    supervisor: "Prof. Mirco Ravanelli and Prof. Yoshua Bengio",
    summary: "SpeechBrain toolkit contributions, Transformer-based ASR, language modeling for speech recognition, and speech separation research.",
  },
  {
    role: "Research Assistant",
    organization: "Sixth JSALT - Center of Speech and Language Processing @ JHU",
    location: "Montreal, Canada",
    period: "Summer 2019",
    supervisor: "Prof. Mirco Ravanelli and Prof. Maurizio Omologo",
    summary: "Noise-robust unsupervised and self-supervised learning of speech representations.",
  },
  {
    role: "Research Assistant",
    organization: "ROC-HCI Lab, University of Rochester",
    location: "Rochester, NY",
    period: "Sep 2018 - May 2020",
    supervisor: "Prof. Ehsan Hoque",
    summary: "Multimodal learning for understanding human behavior.",
  },
];

export const education: Education[] = [
  {
    degree: "Ph.D. candidate, Computer Science & Engineering",
    institution: "The Chinese University of Hong Kong",
    location: "Hong Kong SAR",
    period: "Aug 2023 - Present",
    details: "Supervisor: Prof. Qiang Xu",
  },
  {
    degree: "B.S. in Computer Science with minors in Mathematics and Business",
    institution: "University of Rochester",
    location: "Rochester, NY",
    period: "Aug 2016 - May 2020",
    details: "Graduated with Excellence in Undergraduate Research in Computer Science.",
  },
];
```

- [ ] **Step 7: Run data tests**

Run:

```bash
npm run test
```

Expected: PASS for all `site data` tests.

- [ ] **Step 8: Commit data layer**

```bash
git add src/data/profile.ts src/data/publications.ts src/data/projects.ts src/data/experience.ts src/data/site-data.test.ts
git commit -m "feat: add academic site data"
```

## Task 3: Shared Layout, Components, And Styling

**Files:**
- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/PublicationCard.astro`
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/ExperienceCard.astro`
- Create: `src/utils/paths.ts`

- [ ] **Step 1: Create global CSS**

Create `src/styles/global.css` with responsive foundations, navigation, cards, buttons, grids, and mobile rules:

```css
:root {
  color-scheme: light;
  --bg: #f8fafc;
  --surface: #ffffff;
  --surface-muted: #eef4f8;
  --text: #0f172a;
  --muted: #475569;
  --line: #dbe4ee;
  --blue: #2563eb;
  --teal: #0f9f8f;
  --orange: #ea580c;
  --violet: #7c3aed;
  --shadow: 0 20px 45px rgba(15, 23, 42, 0.1);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
}

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  color: var(--blue);
}

.site-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--line);
}

.nav {
  max-width: 1120px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.brand {
  font-weight: 750;
  font-size: 18px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 18px;
  color: var(--muted);
  font-size: 14px;
}

.page {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 56px 0 72px;
  flex: 1;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(220px, 0.75fr);
  gap: 44px;
  align-items: center;
  padding: 32px 0 44px;
}

.eyebrow {
  color: var(--blue);
  font-size: 13px;
  font-weight: 750;
  text-transform: uppercase;
}

h1,
h2,
h3 {
  line-height: 1.12;
  margin: 0;
}

h1 {
  font-size: clamp(40px, 6vw, 68px);
  max-width: 860px;
}

h2 {
  font-size: clamp(28px, 4vw, 42px);
}

h3 {
  font-size: 20px;
}

.lead {
  color: var(--muted);
  font-size: 18px;
  max-width: 720px;
}

.hero-photo {
  width: min(260px, 70vw);
  aspect-ratio: 1;
  border-radius: 50%;
  object-fit: cover;
  border: 10px solid var(--surface);
  box-shadow: var(--shadow);
}

.actions,
.link-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: var(--surface);
  font-weight: 700;
}

.button.primary {
  border-color: var(--blue);
  background: var(--blue);
  color: white;
}

.section {
  margin-top: 54px;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 22px;
}

.grid {
  display: grid;
  gap: 18px;
}

.grid.two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid.three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 22px;
  box-shadow: 0 1px 0 rgba(15, 23, 42, 0.03);
}

.card.highlight {
  border-top: 4px solid var(--blue);
}

.muted {
  color: var(--muted);
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.tag {
  border-radius: 999px;
  background: var(--surface-muted);
  color: #334155;
  padding: 4px 10px;
  font-size: 13px;
}

.publication-meta {
  color: var(--muted);
  font-size: 14px;
  margin: 8px 0 0;
}

.theme-label {
  color: var(--blue);
  font-size: 13px;
  font-weight: 750;
}

.news-panel {
  background: #0f172a;
  color: white;
}

.news-panel .muted {
  color: #cbd5e1;
}

.site-footer {
  border-top: 1px solid var(--line);
  color: var(--muted);
  padding: 28px 24px;
  text-align: center;
  font-size: 14px;
}

@media (max-width: 760px) {
  .nav {
    align-items: flex-start;
    flex-direction: column;
  }

  .nav-links {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 4px;
  }

  .hero,
  .grid.two,
  .grid.three {
    grid-template-columns: 1fr;
  }

  .hero {
    padding-top: 20px;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
  }
}
```

- [ ] **Step 2: Create path helper**

Create `src/utils/paths.ts`:

```ts
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  const cleanPath = path.replace(/^\/+/, "");
  return `${cleanBase}${cleanPath}`;
}
```

- [ ] **Step 3: Create shared layout**

Create `src/layouts/BaseLayout.astro`:

```astro
---
import "../styles/global.css";
import { profile } from "@data/profile";
import { withBase } from "@utils/paths";

const {
  title = profile.name,
  description = profile.bio,
} = Astro.props;

const navItems = [
  { label: "Home", href: "" },
  { label: "Publications", href: "publications/" },
  { label: "Projects", href: "projects/" },
  { label: "CV", href: "cv/" },
  { label: "Contact", href: "contact/" },
];
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <title>{title === profile.name ? title : `${title} | ${profile.name}`}</title>
  </head>
  <body>
    <div class="site-shell">
      <header class="site-header">
        <nav class="nav" aria-label="Primary navigation">
          <a class="brand" href={withBase("")}>{profile.name}</a>
          <div class="nav-links">
            {navItems.map((item) => <a href={withBase(item.href)}>{item.label}</a>)}
          </div>
        </nav>
      </header>
      <main class="page">
        <slot />
      </main>
      <footer class="site-footer">
        © {new Date().getFullYear()} {profile.name}. Built as a static academic portfolio.
      </footer>
    </div>
  </body>
</html>
```

- [ ] **Step 4: Create publication card component**

Create `src/components/PublicationCard.astro`:

```astro
---
import type { Publication } from "@data/publications";

type Props = {
  publication: Publication;
  compact?: boolean;
};

const { publication, compact = false } = Astro.props;
---

<article class:list={["card", publication.selected && "highlight"]}>
  <div class="theme-label">{publication.theme}</div>
  <h3>{publication.title}</h3>
  <p class="publication-meta">{publication.authors}</p>
  <p class="publication-meta"><strong>{publication.venue}</strong> · {publication.year}</p>
  {publication.note && <p class="muted">{publication.note}</p>}
  {!compact && publication.links && publication.links.length > 0 && (
    <div class="link-row">
      {publication.links.map((link) => <a class="button" href={link.href} target="_blank" rel="noreferrer">{link.label}</a>)}
    </div>
  )}
</article>
```

- [ ] **Step 5: Create project card component**

Create `src/components/ProjectCard.astro`:

```astro
---
import type { Project } from "@data/projects";

const { project } = Astro.props as { project: Project };
---

<article class="card">
  <h3>{project.title}</h3>
  <p class="muted">{project.summary}</p>
  <div class="tag-list">
    {project.tags.map((tag) => <span class="tag">{tag}</span>)}
  </div>
  {project.linkHref && <p><a class="button" href={project.linkHref}>{project.linkLabel ?? "Learn more"}</a></p>}
</article>
```

- [ ] **Step 6: Create experience card component**

Create `src/components/ExperienceCard.astro`:

```astro
---
import type { Experience } from "@data/experience";

const { experience } = Astro.props as { experience: Experience };
---

<article class="card">
  <div class="theme-label">{experience.period}</div>
  <h3>{experience.organization}</h3>
  <p class="publication-meta">{experience.role} · {experience.location}</p>
  {experience.supervisor && <p class="publication-meta">Supervisor: {experience.supervisor}</p>}
  <p class="muted">{experience.summary}</p>
</article>
```

- [ ] **Step 7: Build after component creation**

Run:

```bash
npm run build
```

Expected: PASS. The generated site still has the minimal homepage, but component imports compile.

- [ ] **Step 8: Commit shared UI**

```bash
git add src/styles/global.css src/layouts/BaseLayout.astro src/components/PublicationCard.astro src/components/ProjectCard.astro src/components/ExperienceCard.astro src/utils/paths.ts
git commit -m "feat: add shared site layout and components"
```

## Task 4: Pages And Static Content Verification

**Files:**
- Modify: `src/pages/index.astro`
- Create: `src/pages/publications.astro`
- Create: `src/pages/projects.astro`
- Create: `src/pages/cv.astro`
- Create: `src/pages/contact.astro`
- Create: `scripts/verify-content.mjs`

- [ ] **Step 1: Write failing post-build content verification**

Create `scripts/verify-content.mjs`:

```js
import { readFileSync } from "node:fs";

const files = {
  home: readFileSync("dist/index.html", "utf8"),
  publications: readFileSync("dist/publications/index.html", "utf8"),
  projects: readFileSync("dist/projects/index.html", "utf8"),
  cv: readFileSync("dist/cv/index.html", "utf8"),
  contact: readFileSync("dist/contact/index.html", "utf8"),
};

const assertions = [
  [files.home.includes("Ph.D. candidate"), "homepage identifies Jianyuan as a Ph.D. candidate"],
  [files.home.includes("Solve-Detect-Verify"), "homepage lists Solve-Detect-Verify"],
  [files.home.includes("Ant Group - InclusionAI"), "homepage lists Ant Group - InclusionAI"],
  [files.publications.includes("ICML 2026"), "publications page includes ICML 2026"],
  [files.publications.includes("Reasoning And Verification"), "publications page includes theme grouping"],
  [files.projects.includes("Dynamic Generative Process Verification"), "projects page includes verification project"],
  [files.cv.includes("Jianyuan_Zhong_CV_202605.pdf"), "CV page links to CV PDF"],
  [files.contact.includes("Google Scholar"), "contact page links Google Scholar"],
  [!Object.values(files).join("\n").includes("+852"), "public site does not include phone number"],
];

const failures = assertions.filter(([passed]) => !passed).map(([, message]) => message);

if (failures.length > 0) {
  console.error("Content verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Content verification passed.");
```

- [ ] **Step 2: Run verification to confirm it fails**

Run:

```bash
npm run build && node scripts/verify-content.mjs
```

Expected: FAIL because the publications, projects, CV, and contact pages do not exist yet.

- [ ] **Step 3: Implement homepage**

Replace `src/pages/index.astro`:

```astro
---
import ExperienceCard from "@components/ExperienceCard.astro";
import PublicationCard from "@components/PublicationCard.astro";
import ProjectCard from "@components/ProjectCard.astro";
import BaseLayout from "@layouts/BaseLayout.astro";
import { experiences } from "@data/experience";
import { profile } from "@data/profile";
import { projects } from "@data/projects";
import { publications } from "@data/publications";
import { withBase } from "@utils/paths";

const selectedPublications = publications.filter((publication) => publication.selected);
const featuredProjects = projects.slice(0, 3);
const featuredExperience = experiences.filter((experience) =>
  ["Ant Group - InclusionAI", "Foundation Model Department, Huawei Hong Kong Research Center", "Quebec Artificial Intelligence Institute - Mila"].includes(experience.organization)
);
---

<BaseLayout>
  <section class="hero">
    <div>
      <p class="eyebrow">{profile.title} · CUHK CSE</p>
      <h1>{profile.tagline}</h1>
      <p class="lead">{profile.bio}</p>
      <div class="actions">
        <a class="button primary" href={withBase("publications/")}>Publications</a>
        <a class="button" href={withBase("projects/")}>Projects</a>
        <a class="button" href={withBase("cv/")}>CV</a>
      </div>
    </div>
    <img class="hero-photo" src={withBase("assets/headshot.jpg")} alt="Portrait of Jianyuan Zhong" />
  </section>

  <section class="section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Research Focus</p>
        <h2>Learning to reason through processes.</h2>
      </div>
    </div>
    <div class="grid three">
      {profile.researchQuestions.map((question) => <div class="card"><p>{question}</p></div>)}
    </div>
  </section>

  <section class="section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Selected Work</p>
        <h2>Recent papers and systems.</h2>
      </div>
      <a class="button" href={withBase("publications/")}>All publications</a>
    </div>
    <div class="grid two">
      {selectedPublications.map((publication) => <PublicationCard publication={publication} compact />)}
    </div>
  </section>

  <section class="section">
    <div class="grid two">
      <div class="card news-panel">
        <p class="eyebrow">News</p>
        <h2>Updates</h2>
        {profile.news.map((item) => <p><strong>{item.date}</strong> · <span class="muted">{item.text}</span></p>)}
      </div>
      <div class="card">
        <p class="eyebrow">Academic Profile</p>
        <h2>Current role</h2>
        <p class="muted">{profile.affiliation}</p>
        <p class="muted">{profile.location}</p>
        <div class="link-row">
          {profile.links.map((link) => <a class="button" href={link.href} target="_blank" rel="noreferrer">{link.label}</a>)}
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Research Experience</p>
        <h2>Internships and research appointments.</h2>
      </div>
    </div>
    <div class="grid three">
      {featuredExperience.map((experience) => <ExperienceCard experience={experience} />)}
    </div>
  </section>

  <section class="section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Projects</p>
        <h2>Research threads.</h2>
      </div>
      <a class="button" href={withBase("projects/")}>All projects</a>
    </div>
    <div class="grid three">
      {featuredProjects.map((project) => <ProjectCard project={project} />)}
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 4: Implement publications page**

Create `src/pages/publications.astro`:

```astro
---
import PublicationCard from "@components/PublicationCard.astro";
import BaseLayout from "@layouts/BaseLayout.astro";
import { publications, themes } from "@data/publications";

const selected = publications.filter((publication) => publication.selected);
const byYear = [...publications].sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
---

<BaseLayout title="Publications">
  <section>
    <p class="eyebrow">Publications</p>
    <h1>Selected and complete research output.</h1>
    <p class="lead">Papers grouped for quick scanning by highlight, research theme, and year.</p>
  </section>

  <section class="section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Selected</p>
        <h2>Highlighted work</h2>
      </div>
    </div>
    <div class="grid two">
      {selected.map((publication) => <PublicationCard publication={publication} />)}
    </div>
  </section>

  <section class="section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">Themes</p>
        <h2>Research areas</h2>
      </div>
    </div>
    <div class="grid">
      {themes.map((theme) => (
        <section class="card">
          <h3>{theme}</h3>
          <div class="grid">
            {publications.filter((publication) => publication.theme === theme).map((publication) => (
              <PublicationCard publication={publication} compact />
            ))}
          </div>
        </section>
      ))}
    </div>
  </section>

  <section class="section">
    <div class="section-heading">
      <div>
        <p class="eyebrow">All</p>
        <h2>Reverse chronological list</h2>
      </div>
    </div>
    <div class="grid">
      {byYear.map((publication) => <PublicationCard publication={publication} />)}
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 5: Implement projects page**

Create `src/pages/projects.astro`:

```astro
---
import ProjectCard from "@components/ProjectCard.astro";
import BaseLayout from "@layouts/BaseLayout.astro";
import { projects } from "@data/projects";
---

<BaseLayout title="Projects">
  <section>
    <p class="eyebrow">Projects</p>
    <h1>Research systems and applied threads.</h1>
    <p class="lead">A compact map of the work behind the papers, internships, and applied collaborations.</p>
  </section>

  <section class="section">
    <div class="grid two">
      {projects.map((project) => <ProjectCard project={project} />)}
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 6: Implement CV page**

Create `src/pages/cv.astro`:

```astro
---
import BaseLayout from "@layouts/BaseLayout.astro";
import { withBase } from "@utils/paths";

const cvHref = withBase("assets/Jianyuan_Zhong_CV_202605.pdf");
---

<BaseLayout title="CV">
  <section>
    <p class="eyebrow">CV</p>
    <h1>Curriculum vitae.</h1>
    <p class="lead">Download or open the current academic CV as a PDF.</p>
    <div class="actions">
      <a class="button primary" href={cvHref} target="_blank" rel="noreferrer">Open CV</a>
      <a class="button" href={cvHref} download>Download PDF</a>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 7: Implement contact page**

Create `src/pages/contact.astro`:

```astro
---
import BaseLayout from "@layouts/BaseLayout.astro";
import { profile } from "@data/profile";
---

<BaseLayout title="Contact">
  <section>
    <p class="eyebrow">Contact</p>
    <h1>Academic links and contact.</h1>
    <p class="lead">{profile.affiliation}</p>
  </section>

  <section class="section grid two">
    <div class="card">
      <h2>Email</h2>
      <p><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
      <p class="muted">{profile.location}</p>
    </div>
    <div class="card">
      <h2>Profiles</h2>
      <div class="link-row">
        {profile.links.map((link) => <a class="button" href={link.href} target="_blank" rel="noreferrer">{link.label}</a>)}
      </div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 8: Run static verification to confirm page content**

Run:

```bash
npm run verify
```

Expected: PASS for Vitest, Astro check/build, and `Content verification passed.`

- [ ] **Step 9: Commit pages and verification script**

```bash
git add src/pages/index.astro src/pages/publications.astro src/pages/projects.astro src/pages/cv.astro src/pages/contact.astro scripts/verify-content.mjs
git commit -m "feat: add academic website pages"
```

## Task 5: Assets And CV Links

**Files:**
- Create: `public/assets/Jianyuan_Zhong_CV_202605.pdf`
- Create: `public/assets/headshot.jpg`

- [ ] **Step 1: Copy CV PDF**

Run:

```bash
mkdir -p public/assets
cp cv-overleaf-visa-acl2026/Jianyuan_Zhong_CV_202605.pdf public/assets/Jianyuan_Zhong_CV_202605.pdf
```

Expected: `public/assets/Jianyuan_Zhong_CV_202605.pdf` exists.

- [ ] **Step 2: Add the headshot asset**

Ask the user for the local path to the headshot image they provided in chat, then run:

```bash
cp "$HEADSHOT_SOURCE" public/assets/headshot.jpg
```

Expected: `public/assets/headshot.jpg` exists and displays the approved portrait.

- [ ] **Step 3: Verify asset references**

Run:

```bash
npm run verify
```

Expected: PASS and no broken local asset references in Astro build output.

- [ ] **Step 4: Commit assets**

```bash
git add public/assets/Jianyuan_Zhong_CV_202605.pdf public/assets/headshot.jpg
git commit -m "feat: add CV and headshot assets"
```

## Task 6: GitHub Pages Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Create GitHub Pages workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Validate build with GitHub-style environment**

Run:

```bash
GITHUB_REPOSITORY="JianyuanZhong/academic-webpage" npm run build
```

Expected: PASS. Generated internal links use `/academic-webpage/` as the base path.

- [ ] **Step 3: Validate build for user-site repository**

Run:

```bash
GITHUB_REPOSITORY="JianyuanZhong/JianyuanZhong.github.io" npm run build
```

Expected: PASS. Generated internal links use `/` as the base path.

- [ ] **Step 4: Commit deployment workflow**

```bash
git add .github/workflows/deploy.yml astro.config.mjs
git commit -m "ci: add GitHub Pages deployment"
```

## Task 7: Browser Verification And Polish

**Files:**
- Modify if desktop or mobile verification fails: `src/styles/global.css`
- Modify if content verification reveals a page-specific issue: Astro page/component files touched by that finding.

- [ ] **Step 1: Run full verification**

Run:

```bash
npm run verify
```

Expected: PASS for tests, Astro build, and static content verification.

- [ ] **Step 2: Start local dev server**

Run:

```bash
npm run dev
```

Expected: Astro prints a local URL, usually `http://127.0.0.1:4321/`.

- [ ] **Step 3: Verify desktop in browser**

Open the local URL in the in-app browser. Check:

- Homepage hero shows headshot and Ph.D. candidate wording.
- Selected Work includes Stabilizing Reinforcement Learning for Diffusion Language Models, Solve-Detect-Verify, Mathesis, and Dyve.
- Research Experience includes Ant Group/InclusionAI, Huawei HK Research Center, and Mila.
- Navigation reaches Home, Publications, Projects, CV, and Contact.
- Public pages do not show the phone number.

- [ ] **Step 4: Verify mobile in browser**

Use a mobile viewport in browser verification. Check:

- Navigation does not overlap.
- Headshot, hero text, buttons, cards, and publication titles fit within their containers.
- Publication cards remain readable.
- CV buttons remain tappable.

- [ ] **Step 5: Apply focused polish if verification finds layout issues**

If cards, nav, or long titles overflow, modify only `src/styles/global.css` with targeted rules such as:

```css
.card {
  overflow-wrap: anywhere;
}

.button {
  text-align: center;
}
```

Then run:

```bash
npm run verify
```

Expected: PASS.

- [ ] **Step 6: Commit final polish**

If files changed during browser verification:

```bash
git add src/styles/global.css src/pages src/components
git commit -m "fix: polish responsive academic site layout"
```

If no files changed, record in the final implementation summary that no polish commit was needed.
