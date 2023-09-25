import SettingsTableAlertDialog, {
  SettingsTableAlertDialogProps
} from "../SettingsTableAlertDialog";
import { initialShortcut } from "@/test/mockData";
import { expectToMatchSnapshot, renderTree } from "@/test/utils";
import { describe, it, vi } from "vitest";

const initialProps = {
  currentShortcut: initialShortcut,
  initialShortcut: initialShortcut,
  isDialogOpen: false,
  handleDeleteShortcut: vi.fn(),
  setIsDialogOpen: vi.fn(),
  setCurrentShortcut: vi.fn()
};

const testComponentWithProps = (props: SettingsTableAlertDialogProps) => {
  expectToMatchSnapshot(renderTree(<SettingsTableAlertDialog {...props} />));
};

describe("SettingsTableAlertDialog", () => {
  it("should render null", () => {
    testComponentWithProps(initialProps);
  });
});
