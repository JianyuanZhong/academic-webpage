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
