import React from "react";
import { render } from "@testing-library/react";

import Container from "@/components/common/container.tsx";

import "@testing-library/jest-dom"

describe("Container Component", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <Container>
        <div>Test Content</div>
      </Container>
    );

    expect(getByText("Test Content")).toBeInTheDocument();
  });
});
