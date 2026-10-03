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
    id: "verifiable-rsi",
    linkLabel: "Research Foundry live demo",
    linkHref: "https://jianyuanzhong.github.io/research-foundry-dashboard/",
    title: "Verifiable Learning for Recursive Self-Improvement",
    summary:
      "I build bounded loops in which agents propose, execute, verify, and learn. This includes layered reward signals, anti-hacking checks, and self-evolving task and evaluation harnesses for auto-research across AI4S and mathematical reasoning.",
    tags: ["Verifiable learning", "Recursive self-improvement", "Agentic RL", "Harnesses"],
  },
  {
    id: "dllm-test-time-scaling",
    title: "Diffusion LMs for Efficient Test-Time Scaling",
    summary:
      "I develop stable RL post-training and efficient inference for diffusion language models. The longer-term goal is algorithm-infrastructure co-evolution: making training, sampling, verification, and runtime systems reinforce one another as test-time budgets grow.",
    tags: ["Diffusion language models", "Stable RL", "Efficient inference", "Test-time scaling"],
  },
  {
    id: "verifier-guided-inference",
    title: "Verifier-Guided Inference and Process Control",
    summary:
      "Dyve and Solve-Detect-Verify study how models can locate reasoning failures, allocate verifier budget, decide when to stop, and refine only when further computation is useful.",
    tags: ["Process verification", "Generative verifier", "Inference-time scaling"],
  },
  {
    id: "math-discovery-auto-research",
    title: "Mathematical Discovery and Auto-Research Agents",
    summary:
      "I use formal proof, executable experiments, and sandboxed research harnesses to turn informal conjectures and scientific ideas into checkable obligations and higher-quality training signals.",
    tags: ["Formal theorem proving", "Mathematical discovery", "AI4S", "Auto-research"],
  },
  {
    id: "scientific-discovery",
    title: "Scientific Discovery and Impact Forecasting",
    summary:
      "FAME treats scientific evaluation as a long-horizon forecasting problem, modeling how ideas move through evolving research fields with continuous-time manifolds.",
    tags: ["Scientific discovery", "Impact forecasting", "Manifold learning"],
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
