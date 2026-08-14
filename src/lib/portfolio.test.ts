import { describe, expect, it } from "vitest";
import { portfolio } from "./portfolio";

describe("portfolio content", () => {
  it("provides working professional contact links", () => {
    expect(portfolio.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    expect(portfolio.links.github).toMatch(/^https:\/\//);
    expect(portfolio.links.linkedin).toMatch(/^https:\/\//);
  });

  it("contains an experience and a project for recruiters to review", () => {
    expect(portfolio.experiences.length).toBeGreaterThan(0);
    expect(portfolio.projects.length).toBeGreaterThan(0);
  });
});
