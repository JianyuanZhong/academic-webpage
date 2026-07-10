export type ProfileLink = {
  label: string;
  href: string;
};

export type ResearchDirection = {
  id: "verifiable-learning" | "diffusion-language-models";
  label: string;
  title: string;
  summary: string;
  tags: string[];
};

export const profile = {
  name: "Jianyuan Zhong",
  title: "Ph.D. candidate",
  affiliation: "Department of Computer Science & Engineering, The Chinese University of Hong Kong",
  location: "Hong Kong SAR",
  email: "chungginyun@gmail.com",
  tagline: "Verifiable learning and diffusion language models for scalable agentic intelligence.",
  bio:
    "I pursue two distinct directions toward scalable agentic intelligence. First, verifiable learning for recursive self-improvement: agents propose, execute, and learn from checkable feedback through verifiers, mathematical discovery, and auto-research agents. Second, diffusion language models: I study effective inference and test-time scaling, from DFlash-inspired optimization to DSpark-style algorithm-infrastructure co-design.",
  researchDirections: [
    {
      id: "verifiable-learning",
      label: "Direction 01",
      title: "Verifiable learning for recursive self-improvement",
      summary:
        "I build bounded learning loops in which agents turn ideas into executable work, verify outcomes, and use the resulting signals to improve future trajectories. The goal is recursive self-improvement grounded in environments that can expose failure rather than merely reward plausible outputs.",
      tags: ["Verifiers", "Mathematical discovery", "Auto-research agents", "Agentic RL"],
    },
    {
      id: "diffusion-language-models",
      label: "Direction 02",
      title: "Diffusion language models for effective test-time scaling",
      summary:
        "I study stable post-training and efficient inference for diffusion language models, with a particular interest in algorithm-infrastructure co-evolution: training, sampling, verification, and execution systems designed together so additional test-time compute delivers useful capability.",
      tags: ["Diffusion LMs", "Stable RL", "Efficient inference", "Algorithm-systems co-design"],
    },
  ] satisfies ResearchDirection[],
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
      text: "Solve-Detect-Verify accepted to ACL 2026; Mathesis accepted to ICLR 2026.",
    },
    {
      date: "2025",
      text: "Dyve accepted to EMNLP 2025.",
    },
    {
      date: "2026",
      text: "Joined Alipay / Ant Group Research Institute's AGI Research Center as a research intern.",
    },
  ],
};
