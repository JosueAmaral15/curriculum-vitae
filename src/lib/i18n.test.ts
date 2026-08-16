import { describe, expect, it } from "vitest";
import { copy } from "./i18n";

describe("portfolio translations", () => {
  it("provides English and Portuguese versions for the recruiter-facing content", () => {
    expect(copy.en.nav).toHaveLength(4);
    expect(copy["pt-BR"].nav).toHaveLength(4);
    expect(copy.en.experiences).toHaveLength(copy["pt-BR"].experiences.length);
    expect(copy.en.projectItems).toHaveLength(copy["pt-BR"].projectItems.length);
  });

  it("keeps private work unlinked and gives public work a specific destination", () => {
    const privateProject = copy.en.projectItems.find((project) => project.name === "Clarify");
    const publicProjects = copy.en.projectItems.filter((project) => project.name !== "Clarify");

    expect(privateProject?.href).toBeUndefined();
    expect(publicProjects.every((project) => project.href?.startsWith("https://"))).toBe(true);
  });
});
