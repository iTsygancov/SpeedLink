import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";
import { ReactElement } from "react";
import { ReactTestRenderer, create } from "react-test-renderer";
import { expect } from "vitest";

function wrappedComponent(children: ReactElement) {
  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      {children}
    </ThemeProvider>
  );
}

export const renderTree = (component: ReactElement) => {
  return create(wrappedComponent(component));
};

export function expectToMatchSnapshot(component: ReactTestRenderer) {
  expect(component.toJSON()).toMatchSnapshot();
}
