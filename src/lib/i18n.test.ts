import { describe, expect, it } from "vitest";
import { copy } from "./i18n";

describe("portfolio translations", () => {
  it("provides English and Portuguese versions for the recruiter-facing content", () => {
    expect(copy.en.nav).toHaveLength(4);
    expect(copy["pt-BR"].nav).toHaveLength(4);
    expect(copy.en.experiences).toHaveLength(copy["pt-BR"].experiences.length);
    expect(copy.en.projectItems).toHaveLength(copy["pt-BR"].projectItems.length);
  });
});
