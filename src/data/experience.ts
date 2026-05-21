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
