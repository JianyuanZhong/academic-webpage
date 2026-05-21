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
