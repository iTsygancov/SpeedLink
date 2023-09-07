import SettingsTableAddButton, {
  SettingsTableEditCellProps
} from "../SettingsTableAddButton";
import { expectToMatchSnapshot, renderTree } from "@/test/utils";
import { describe, it, vi } from "vitest";

const settingsTableAddButtonProps: SettingsTableEditCellProps = {
  disabled: false,
  handleAddNewShortCut: vi.fn()
};

const testComponentWithProps = (props: SettingsTableEditCellProps) => {
  expectToMatchSnapshot(renderTree(<SettingsTableAddButton {...props} />));
};

describe("SettingsTableAddButton", () => {
  it("should render normally", () => {
    testComponentWithProps(settingsTableAddButtonProps);
  });

  it("should render with disabled button", () => {
    testComponentWithProps({
      ...settingsTableAddButtonProps,
      disabled: true
    });
  });
});
