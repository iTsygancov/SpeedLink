import SettingsTableEditCell, {
  SettingsTableEditCellProps
} from "../SettingsTableEditCell";
import { initialProps } from "./SettingsTableEditCell.data";
import { expectToMatchSnapshot, renderTree } from "@/test/utils";
import { describe, it } from "vitest";

const testComponentWithProps = (props: SettingsTableEditCellProps) => {
  expectToMatchSnapshot(renderTree(<SettingsTableEditCell {...props} />));
};

describe("SettingsTableAddButton", () => {
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
