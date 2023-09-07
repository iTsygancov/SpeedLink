import SettingsTableTitleCell, {
  SettingsTableTitleCellProps
} from "../SettingsTableTitleCell";
import { initialProps } from "./SettingsTableTitleCell.data";
import { expectToMatchSnapshot, renderTree } from "@/test/utils";
import { describe, it } from "vitest";

const testComponentWithProps = (props: SettingsTableTitleCellProps) => {
  expectToMatchSnapshot(renderTree(<SettingsTableTitleCell {...props} />));
};

describe("SettingsTableTitleCell", () => {
  it("should render with empty title", () => {
    testComponentWithProps(initialProps);
  });

  it("should render with filled title", () => {
    testComponentWithProps({
      ...initialProps,
      item: {
        ...initialProps.item,
        title: "Test title"
      }
    });
  });

  it("should render with empty input field", () => {
    testComponentWithProps({
      ...initialProps,
      item: {
        ...initialProps.item,
        canEdit: true
      }
    });
  });

  it("should render with filled input field", () => {
    testComponentWithProps({
      ...initialProps,
      item: {
        ...initialProps.item,
        canEdit: true,
        title: "Test title"
      }
    });
  });
});
