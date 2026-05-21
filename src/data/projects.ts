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
