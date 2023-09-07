import SettingsTableAlertDialog, {
  SettingsTableAlertDialogProps
} from "../SettingsTableAlertDialog";
import { initialCommand } from "@/test/mockData";
import { expectToMatchSnapshot, renderTree } from "@/test/utils";
import { describe, it, vi } from "vitest";

const initialProps = {
  currentCommand: initialCommand,
  initialCommand: initialCommand,
  isDialogOpen: false,
  handleDeleteShortcut: vi.fn(),
  setIsDialogOpen: vi.fn(),
  setCurrentCommand: vi.fn()
};

const testComponentWithProps = (props: SettingsTableAlertDialogProps) => {
  expectToMatchSnapshot(renderTree(<SettingsTableAlertDialog {...props} />));
};

describe("SettingsTableAlertDialog", () => {
  it("should render null", () => {
    testComponentWithProps(initialProps);
  });
});
