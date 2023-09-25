import SettingsTableShortcutCell, {
  SettingsTableShortcutCellProps
} from "../SettingsTableShortcutCell";
import { initialShortcut } from "@/test/mockData";
import { expectToMatchSnapshot, renderTree } from "@/test/utils";
import { describe, it, vi } from "vitest";

const initialProps = {
  shortcuts: [initialShortcut, initialShortcut],
  handleSelectValueChange: vi.fn(),
  item: initialShortcut,
  itemIndex: 0
};

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
