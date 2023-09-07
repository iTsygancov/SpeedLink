import SettingsTableHeader, {
  SettingsTableHeaderProps
} from "../SettingsTableHeader";
import { expectToMatchSnapshot, renderTree } from "@/test/utils";
import { describe, it, vi } from "vitest";

const initialProps: SettingsTableHeaderProps = {
  handleSort: vi.fn(),
  sortBy: { column: "shortcut", direction: "asc" }
};

const testComponentWithProps = (props: SettingsTableHeaderProps) => {
  expectToMatchSnapshot(renderTree(<SettingsTableHeader {...props} />));
};

describe("SettingsTableHeader", () => {
  it("should render with default props", () => {
    testComponentWithProps(initialProps);
  });

  it("should render with sort by shortcut in desc direction", () => {
    testComponentWithProps({
      ...initialProps,
      sortBy: {
        ...initialProps.sortBy,
        direction: "desc"
      }
    });
  });

  it("should render with sort by url in asc direction", () => {
    testComponentWithProps({
      ...initialProps,
      sortBy: {
        column: "url",
        direction: "asc"
      }
    });
  });

  it("should render with sort by url in desc direction", () => {
    testComponentWithProps({
      ...initialProps,
      sortBy: {
        column: "url",
        direction: "desc"
      }
    });
  });

  it("should render with sort by title in asc direction", () => {
    testComponentWithProps({
      ...initialProps,
      sortBy: {
        column: "title",
        direction: "asc"
      }
    });
  });

  it("should render with sort by title in desc direction", () => {
    testComponentWithProps({
      ...initialProps,
      sortBy: {
        column: "title",
        direction: "desc"
      }
    });
  });
});
