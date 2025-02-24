import React from "react";
import "@testing-library/jest-dom"
import { render } from "@testing-library/react";

import Container from "@/components/common/container.tsx";


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
