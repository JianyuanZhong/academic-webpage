import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const files = {
  home: readFileSync("dist/index.html", "utf8"),
  publications: readFileSync("dist/publications/index.html", "utf8"),
  projects: readFileSync("dist/projects/index.html", "utf8"),
  cv: readFileSync("dist/cv/index.html", "utf8"),
  contact: readFileSync("dist/contact/index.html", "utf8"),
};

const assertions = [
  [files.home.includes("Ph.D. candidate"), "homepage identifies Jianyuan as a Ph.D. candidate"],
  [files.home.includes("Verifiable learning and diffusion language models"), "homepage leads with the two research directions"],
  [files.home.includes("Verifiable learning for recursive self-improvement"), "homepage includes the verifiable-learning direction"],
  [files.home.includes("Diffusion language models for effective test-time scaling"), "homepage includes the diffusion-LM direction"],
  [files.home.includes("Solve-Detect-Verify"), "homepage lists Solve-Detect-Verify"],
  [files.home.includes("Alipay / Ant Group Research Institute - AGI Research Center"), "homepage lists the current Ant Group research role"],
  [files.home.includes("9M-token multi-agent trajectories"), "homepage includes the current long-horizon trajectory work"],
  [files.publications.includes("ICML 2026"), "publications page includes ICML 2026"],
  [files.publications.includes("Scientific Discovery"), "publications page includes scientific discovery theme"],
  [files.publications.includes("Reasoning And Verification"), "publications page includes theme grouping"],
  [files.projects.includes("Verifiable Learning for Recursive Self-Improvement"), "projects page includes recursive self-improvement work"],
  [files.projects.includes("Diffusion LMs for Efficient Test-Time Scaling"), "projects page includes diffusion LM work"],
  [files.cv.includes("Jianyuan_Zhong_CV_202605.pdf"), "CV page links to CV PDF"],
  [files.contact.includes("Google Scholar"), "contact page links Google Scholar"],
  [!Object.values(files).join("\n").includes("+852"), "public site does not include phone number"],
];

const failures = assertions.filter(([passed]) => !passed).map(([, message]) => message);

const pdfText = spawnSync("pdftotext", ["public/assets/Jianyuan_Zhong_CV_202605.pdf", "-"], {
  encoding: "utf8",
});

if (pdfText.error) {
  failures.push(`pdftotext is required for CV PDF verification: ${pdfText.error.message}`);
} else if (pdfText.status !== 0) {
  failures.push(`CV PDF text extraction failed: ${pdfText.stderr.trim()}`);
} else if (/\+852|9340\s*8296/.test(pdfText.stdout)) {
  failures.push("CV PDF does not include phone number");
} else if (!/PH\.D\.\s+CANDIDATE/i.test(pdfText.stdout)) {
  failures.push("CV PDF identifies Jianyuan as a Ph.D. candidate");
}

if (failures.length > 0) {
  console.error("Content verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Content verification passed.");
