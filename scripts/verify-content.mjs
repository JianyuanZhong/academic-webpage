import { readFileSync } from "node:fs";

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

if (failures.length > 0) {
  console.error("Content verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Content verification passed.");
