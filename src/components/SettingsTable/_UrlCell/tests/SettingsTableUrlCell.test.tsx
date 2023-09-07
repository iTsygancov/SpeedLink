import SettingsTableUrlCell, {
  SettingsTableUrlCellProps
} from "../SettingsTableUrlCell";
import { initialProps } from "./SettingsTableUrlCell.data";
import { expectToMatchSnapshot, renderTree } from "@/test/utils";
import { describe, it } from "vitest";

const testComponentWithProps = (props: SettingsTableUrlCellProps) => {
  expectToMatchSnapshot(renderTree(<SettingsTableUrlCell {...props} />));
};

describe("SettingsTableUrlCell", () => {
  it("should render with empty url", () => {
    testComponentWithProps(initialProps);
  });

  it("should render with filled url and copy button", () => {
    testComponentWithProps({
      ...initialProps,
      item: {
        ...initialProps.item,
        url: "https://example.com"
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
        url: "https://example.com"
      }
    });
  });
});
