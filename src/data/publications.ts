export type Publication = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  theme:
    | "Diffusion Language Models"
    | "Reasoning And Verification"
    | "Scientific Discovery"
    | "Dialogue Systems"
    | "Speech And Multimodal Learning"
    | "AI For Design";
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
    note: "Accepted; stable RL for diffusion language models under noisy long-horizon feedback.",
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
    note: "Verifier-guided inference-time control for stopping, refinement, and compute allocation.",
  },
  {
    id: "fame",
    title: "FAME: Forecasting Academic Impact via Continuous-Time Manifold Evolution",
    authors: "Jianrong Ding, Jianyuan Zhong, Zhengyan Shi, Qiang Xu",
    venue: "arXiv 2026",
    year: 2026,
    theme: "Scientific Discovery",
    note: "LLM-based scientific impact forecasting through continuous-time manifold evolution.",
    links: [
      { label: "arXiv", href: "https://arxiv.org/pdf/2605.07208" },
      { label: "Code", href: "https://github.com/RafaDD/FAME" },
    ],
  },
  {
    id: "mathesis",
    title: "Mathesis: Towards Formal Theorem Proving from Natural Languages",
    authors:
      "Yu Xuejun, Jianyuan Zhong, Zijin Feng, Pengyi Zhai, Roozbeh Yousefzadeh, Wei Chong Ng, Haoxiong Liu, Ziyi Shou, Jing Xiong, Yudong Zhou, Claudia Beth Ong, Austen Jeremy Sugiarto, Yaoxi Zhang, Wai Ming Tai, Huan Cao, Dongcai Lu, Jiacheng Sun, Qiang Xu, Shen Xin, Zhenguo Li",
    venue: "ICLR 2026",
    year: 2026,
    theme: "Reasoning And Verification",
    selected: true,
    note: "Led GRPO training with dynamic rubrics and syntactic-correctness rewards for autoformalization.",
  },
  {
    id: "proof-frontier",
    title: "ProofFrontier: Turning Verified Proofs into Boundary-hard Tasks for Formal Theorem Proving",
    authors: "Zhengyan Shi, Jianyuan Zhong, Xiaolin Zheng, Liangliang Shi, Qiang Xu",
    venue: "ACL ARR 2026 May submission",
    year: 2026,
    theme: "Reasoning And Verification",
    note: "Formal theorem proving benchmarks built from verified proofs.",
  },
  {
    id: "context-distillation",
    title: "Context Distillation as Latent Memory Management",
    authors: "Ziyang Zheng, Zeju Li, Xiangyu Wen, Jianyuan Zhong, Junhua Huang, Lei Chen, Mingxuan Yuan, Qiang Xu",
    venue: "ACL ARR 2026 May submission",
    year: 2026,
    theme: "Reasoning And Verification",
    note: "Context and memory management for long-horizon LLM reasoning.",
  },
  {
    id: "dyve",
    title: "Dyve: Thinking Fast and Slow for Dynamic Process Verification",
    authors: "Jianyuan Zhong, Zeju Li, Zhijian Xu, Xiangyu Wen, Qiang Xu",
    venue: "EMNLP 2025",
    year: 2025,
    theme: "Reasoning And Verification",
    selected: true,
    note: "Adaptive fast/slow process verification for first-error localization.",
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
