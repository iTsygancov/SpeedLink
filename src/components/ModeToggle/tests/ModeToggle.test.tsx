import { ModeToggle, ModeToggleProps } from "../ModeToggle";
import { expectToMatchSnapshot, renderTree } from "@/test/utils";
import { describe, it } from "vitest";

const testComponentWithProps = (props?: ModeToggleProps) => {
  expectToMatchSnapshot(renderTree(<ModeToggle {...props} />));
};

describe("ModeToggle", () => {
  it("should render with default class", () => {
    testComponentWithProps();
  });

  it("should render with additional test class", () => {
    testComponentWithProps({
      className: "test"
    });
  });
});
