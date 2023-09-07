import SettingsTableAlertDialog, {
  SettingsTableAlertDialogProps
} from "../SettingsTableAlertDialog";
import { initialProps } from "./SettingsTableAlertDialog.data";
import { expectToMatchSnapshot, renderTree } from "@/test/utils";
import { describe, it } from "vitest";

const testComponentWithProps = (props: SettingsTableAlertDialogProps) => {
  expectToMatchSnapshot(renderTree(<SettingsTableAlertDialog {...props} />));
};

describe("SettingsTableAlertDialog", () => {
  it("should render null", () => {
    testComponentWithProps(initialProps);
  });
});
