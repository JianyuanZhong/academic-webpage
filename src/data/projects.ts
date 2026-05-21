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
    id: "dynamic-process-verification",
    title: "Adaptive Verification and Inference-Time Control",
    summary:
      "Dyve, FlexiVe, and Solve-Detect-Verify study how agents can locate reasoning failures, allocate verifier budget, stop early, and refine only when useful.",
    tags: ["Process verification", "Generative verifier", "Inference-time scaling"],
  },
  {
    id: "agentic-dllm-post-training",
    title: "Agentic Post-Training for Diffusion Language Models",
    summary:
      "Harnesses, sandbox environments, supervised rollout data, and distributed on-policy training for diffusion language models that must reason and act over long trajectories.",
    tags: ["Diffusion language models", "Agentic RL", "Post-training"],
  },
  {
    id: "scientific-discovery",
    title: "Scientific Discovery and Impact Forecasting",
    summary:
      "FAME treats scientific evaluation as a long-horizon forecasting problem, modeling how ideas move through evolving research fields with verified knowledge-flow graphs and continuous-time manifolds.",
    tags: ["Scientific discovery", "Impact forecasting", "Manifold learning"],
  },
  {
    id: "formal-reasoning",
    title: "Formal Reasoning and Machine-Checkable Proof",
    summary:
      "Mathesis and related pipelines that connect natural-language mathematical reasoning to Lean-based formal statements, proof search, and machine-checkable reliability.",
    tags: ["Formal methods", "Theorem proving", "LLM reasoning"],
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
