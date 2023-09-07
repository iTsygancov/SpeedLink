import SettingsTableEditCell, {
  SettingsTableEditCellProps
} from "../SettingsTableEditCell";
import { initialCommand } from "@/test/mockData";
import { expectToMatchSnapshot, renderTree } from "@/test/utils";
import { describe, it, vi } from "vitest";

const initialProps = {
  handleCloseEditShortcuts: vi.fn(),
  handleEditShortcuts: vi.fn(),
  handleSaveShortcut: vi.fn(),
  isInEditMode: false,
  item: initialCommand,
  itemIndex: 0,
  setCurrentCommand: vi.fn(),
  setIsDialogOpen: vi.fn()
};

const testComponentWithProps = (props: SettingsTableEditCellProps) => {
  expectToMatchSnapshot(renderTree(<SettingsTableEditCell {...props} />));
};

describe("SettingsTableEditCell", () => {
  it("should render edit buttons", () => {
    testComponentWithProps(initialProps);
  });

  it("should render dropdown", () => {
    testComponentWithProps({
      ...initialProps,
      item: {
        ...initialProps.item,
        canEdit: false
      }
    });
  });

  it("should render cell without edit buttons and dropdown", () => {
    testComponentWithProps({
      ...initialProps,
      item: {
        ...initialProps.item,
        canEdit: false
      },
      isInEditMode: true
    });
  });
});
