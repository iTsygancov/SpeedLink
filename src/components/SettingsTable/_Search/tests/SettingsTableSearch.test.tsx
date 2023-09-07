import SettingsTableSearch, {
  SettingsTableSearchProps
} from "../SettingsTableSearch";
import { expectToMatchSnapshot, renderTree } from "@/test/utils";
import { describe, it, vi } from "vitest";

const initialProps: SettingsTableSearchProps = {
  handleSearch: vi.fn(),
  searchValue: ""
};

const testComponentWithProps = (props: SettingsTableSearchProps) => {
  expectToMatchSnapshot(renderTree(<SettingsTableSearch {...props} />));
};

describe("SettingsTableSearch", () => {
  it("should render with default props", () => {
    testComponentWithProps(initialProps);
  });

  it("should render with test input value", () => {
    testComponentWithProps({
      ...initialProps,
      searchValue: "test"
    });
  });
});
