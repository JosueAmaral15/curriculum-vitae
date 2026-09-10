import { describe, expect, it } from "vitest";
import { copy } from "./i18n";

describe("portfolio translations", () => {
  it("provides English and Portuguese versions for the recruiter-facing content", () => {
    expect(copy.en.nav).toHaveLength(4);
    expect(copy["pt-BR"].nav).toHaveLength(4);
    expect(copy.en.experiences).toHaveLength(copy["pt-BR"].experiences.length);
    expect(copy.en.projectItems).toHaveLength(copy["pt-BR"].projectItems.length);
    expect(copy.en.projectItems).toHaveLength(15);
    expect(copy.en.assembly.title).toBeTruthy();
    expect(copy["pt-BR"].assembly.title).toBeTruthy();
    expect(copy.en.experiences[0]?.title).toBe("Artificial Intelligence Engineer");
    expect(copy["pt-BR"].experiences[0]?.company).toContain("MindSIM");
    expect(copy.en.resumeEnglish).toBeTruthy();
    expect(copy["pt-BR"].resumePortuguese).toBeTruthy();
  });

  it("includes the curriculum projects without exposing protected repositories", () => {
    const projects = copy.en.projectItems;
    const curriculumProjects = [
      "Ethnic AI Framework", "Simplicity Protocols", "Ethos Agenda", "AllNutry",
      "Mental Balance", "Keep Calm", "Ethos Universal Scanner", "Clarify",
      "A³ — Tree of Assimilation and Association", "Balancing Neural Network",
      "Neural Pulse + Neural Pulse Workbench", "Secretary Robot",
      "AI Presence Monitor", "Egg Cell Compactor",
    ];
    const protectedProjects = projects.filter((project) =>
      ["Private prototype", "Experimental concept", "Private project", "Non-confidential overview", "Public overview", "Public existence"].includes(project.status),
    );

    expect(projects.map((project) => project.name)).toEqual(expect.arrayContaining(curriculumProjects));
    expect(protectedProjects.every((project) => project.href === undefined)).toBe(true);
    expect(projects.find((project) => project.name === "Clarify")?.href).toBeUndefined();
    expect(projects.find((project) => project.name === "Ethnic AI Framework")?.href).toBe("https://github.com/JosueAmaral15/Ethnic-AI-Framework");
    expect(projects.find((project) => project.name === "Simplicity Protocols")?.href).toBe("https://github.com/JosueAmaral15/simplicity-protocols");
    expect(projects.find((project) => project.name === "AI Presence Monitor")?.href).toBe("https://github.com/JosueAmaral15/ai-presence-monitor");
  });
});
