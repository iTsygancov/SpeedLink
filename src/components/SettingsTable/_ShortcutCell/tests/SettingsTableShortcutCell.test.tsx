import SettingsTableShortcutCell, {
  SettingsTableShortcutCellProps
} from "../SettingsTableShortcutCell";
import { initialProps } from "./SettingsTableShortcutCell.data";
import { expectToMatchSnapshot, renderTree } from "@/test/utils";
import { describe, it } from "vitest";

const testComponentWithProps = (props: SettingsTableShortcutCellProps) => {
  expectToMatchSnapshot(renderTree(<SettingsTableShortcutCell {...props} />));
};

describe("SettingsTableShortcutCell", () => {
  it("should render with empty shortcut badge", () => {
    testComponentWithProps(initialProps);
  });

  it("should render with shortcut filled shortcut badge", () => {
    testComponentWithProps({
      ...initialProps,
      item: {
        ...initialProps.item,
        shortcut: "a"
      }
    });
  });
});
