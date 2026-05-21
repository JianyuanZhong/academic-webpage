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
  tagline: "Scalable verifiable learning for long-horizon agentic thinking in foundation models.",
  bio:
    "I build systems that help foundation models think across long trajectories: plan, verify, repair, use tools, and learn from verifiable feedback across mathematical reasoning, diffusion language models, scientific discovery, and formal proof.",
  researchQuestions: [
    "How can long-horizon agents detect and repair failures before they compound?",
    "How can verifier feedback control when models continue thinking, stop, or refine?",
    "How can scientific discovery systems evaluate ideas by modeling how fields evolve over time?",
    "How can verifiable rollouts become training data for stronger foundation models?",
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
      date: "2026",
      text: "FAME released as an arXiv preprint on trajectory-aware scientific impact forecasting.",
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
