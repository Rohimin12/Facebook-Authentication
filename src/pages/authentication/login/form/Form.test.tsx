import { render, screen } from "@testing-library/react";
import Form from "./Form";
import { BrowserRouter } from "react-router-dom";

const MockForm: React.FC = () => {
  return (
    <BrowserRouter>
      <Form />
    </BrowserRouter>
  );
};

describe("Form", () => {
  it("should render the email input element", () => {
    render(<MockForm />);
    const emailInput = screen.getByPlaceholderText(
      /Email address or phone number/i
    );
    expect(emailInput).toBeVisible();
  });

  it("should render the password input element", () => {
    render(<MockForm />);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toBeVisible();
  });

  it("should render the login button", () => {
    render(<MockForm />);
    const loginButton = screen.getByText(/log in/i);
    expect(loginButton).toBeVisible();
  });

  it("should render the login button", () => {
    render(<MockForm />);
    const loginButton = screen.getByText(/log in/i);
    expect(loginButton).toBeVisible();
  });

  it("should render the forgotten password link text", () => {
    render(<MockForm />);
    const forgottenPasswordElement = screen.getByText(/forgotten password?/i);
    expect(forgottenPasswordElement).toBeVisible();
  });

  it("should render the create a new account button", () => {
    render(<MockForm />);
    const createANewAccountBtn = screen.getByText(/create a new account/i);
    expect(createANewAccountBtn).toBeVisible();
  });
});
