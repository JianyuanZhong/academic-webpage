import { describe, expect, it } from "vitest";
import { profile } from "./profile";
import { experiences } from "./experience";
import { projects } from "./projects";
import { publications } from "./publications";

describe("site data", () => {
  it("uses the approved public identity", () => {
    expect(profile.name).toBe("Jianyuan Zhong");
    expect(profile.title).toContain("Ph.D. candidate");
    expect(profile.tagline).toContain("Verifiable learning");
    expect(profile.tagline).toContain("diffusion language models");
    expect(profile.researchDirections.map((direction) => direction.id)).toEqual(
      expect.arrayContaining(["verifiable-learning", "diffusion-language-models"])
    );
    expect("phone" in profile.contact).toBe(false);
    expect(profile.links.some((link) => link.label === "Google Scholar")).toBe(true);
    expect(profile.links.some((link) => link.label === "DBLP")).toBe(true);
  });

  it("highlights the approved selected publications", () => {
    const selectedTitles = publications.filter((paper) => paper.selected).map((paper) => paper.title);
    expect(selectedTitles).toContain("Stabilizing Reinforcement Learning for Diffusion Language Models");
    expect(selectedTitles).toContain("Solve-Detect-Verify: Inference-Time Scaling with Flexible Generative Verifier");
    expect(selectedTitles).toContain("Mathesis: Towards Formal Theorem Proving from Natural Languages");
    expect(selectedTitles).toContain("Dyve: Thinking Fast and Slow for Dynamic Process Verification");
  });

  it("records the ICML 2026 acceptance", () => {
    const paper = publications.find((entry) => entry.id === "stabilizing-dllm-rl");
    expect(paper?.venue).toBe("ICML 2026");
    expect(paper?.note).toContain("Accepted");
  });

  it("keeps the requested internship experience visible", () => {
    const organizations = experiences.map((experience) => experience.organization);
    expect(organizations).toContain("Alipay / Ant Group Research Institute - AGI Research Center");
    expect(organizations).toContain("Foundation Model Department, Huawei Hong Kong Research Center");
    expect(organizations).toContain("Quebec Artificial Intelligence Institute - Mila");
    expect(experiences.find((experience) => experience.organization === "Alipay / Ant Group Research Institute - AGI Research Center")?.summary).toContain("9M-token");
  });

  it("includes project cards for the main research threads", () => {
    expect(projects.map((project) => project.id)).toEqual(
      expect.arrayContaining(["verifiable-rsi", "dllm-test-time-scaling", "math-discovery-auto-research", "verifier-guided-inference"])
    );
  });
});
