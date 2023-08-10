import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";

describe("Greeting User", () => {
  it("should render the logo image", () => {
    render(<Greeting />);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toBeVisible();
  });

  it("should render the greeting text", () => {
    render(<Greeting />);
    const h2Element = screen.getByRole("heading", {
      level: 2,
      name: /Facebook helps you connect and share with the people in your life./i,
    });
    expect(h2Element).toBeVisible();
  });
});

// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import Greeting from './Greeting';

// describe("Greeting User", () => {

// });
