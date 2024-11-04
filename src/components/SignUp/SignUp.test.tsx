import React from "react";
import { render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import SignUp from "./";
import { handlers } from "./handlers";
import userEvent from "@testing-library/user-event";
import { debug } from "jest-preview";
// Setting up the mock server
const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("SignUp Component", () => {
  describe("Validation", () => {
    it("should display validation errors for invalid email", async () => {
      //Arrange
      render(<SignUp />);

      //Act
      const emailInput = screen.getByLabelText(/Email Address/i);
      userEvent.type(emailInput, "InvalidEmail");
      userEvent.tab();
      //Assert
      expect(
        await screen.findByText("Enter a valid email")
      ).toBeInTheDocument();
      // use jest preview to debug your test
      debug();
    });

    it("should display validation errors for short password", async () => {
      //Arrange
      render(<SignUp />);

      //Act
      const passwrodInput = screen.getByLabelText(/Password/i);
      userEvent.type(passwrodInput, "short");
      userEvent.tab();
      //Assert
      expect(
        await screen.findByText(
          "Password should be of minimum 8 characters length"
        )
      ).toBeInTheDocument();
    });

    it("should display success message on successful sign-up", async () => {
      //Arrange
      render(<SignUp />);

      //Act
      const emailInput = screen.getByLabelText(/Email Address/i);
      userEvent.type(emailInput, "ValidEmail@gmail.com");

      const passwrodInput = screen.getByLabelText(/Password/i);
      userEvent.type(passwrodInput, "12345678");

      const submitBtn = screen.getByRole("button", { name: /Sign Up/i });
      userEvent.click(submitBtn);

      //Assert
      expect(
        await screen.findByText("Sign Up Successfully!")
      ).toBeInTheDocument();
    });

    it("should display error message on sign-up failure", async () => {
      //Arrange
      render(<SignUp />);

      //Act
      const emailInput = screen.getByLabelText(/Email Address/i);
      userEvent.type(emailInput, "Invalid@gmail.com");

      const passwrodInput = screen.getByLabelText(/Password/i);
      userEvent.type(passwrodInput, "1122334455");

      const submitBtn = screen.getByRole("button", { name: /Sign Up/i });
      userEvent.click(submitBtn);

      //Assert
      expect(await screen.findByText("Error Signing Up!")).toBeInTheDocument();
    });
  });

  describe("Form Interaction", () => {
    it("should enable Sign Up button when form is valid", async () => {
      //Arrange
      render(<SignUp />);

      //Act
      const emailInput = screen.getByLabelText(/Email Address/i);
      userEvent.type(emailInput, "Valid@gmail.com");

      const passwrodInput = screen.getByLabelText(/Password/i);
      userEvent.type(passwrodInput, "1122334455");

      //Assert
      expect(
        await screen.findByRole("button", { name: /Sign Up/i })
      ).toBeEnabled();
    });

    it("should disable Sign Up button when form is invalid", async () => {
      //Arrange
      render(<SignUp />);

      //Act
      const emailInput = screen.getByLabelText(/Email Address/i);
      userEvent.type(emailInput, "Invalid Email");

      //Assert
      expect(
        await screen.findByRole("button", { name: /Sign Up/i })
      ).toBeDisabled();
    });

    it("should update form fields on user input", async () => {
      //Arrange
      render(<SignUp />);

      //Act
      const userNameInput = screen.getByLabelText(/User Name/i);
      userEvent.type(userNameInput, "Jack Col.");

      const emailInput = screen.getByLabelText(/Email Address/i);
      userEvent.type(emailInput, "Valid@gmail.com");

      const passwrodInput = screen.getByLabelText(/Password/i);
      userEvent.type(passwrodInput, "12345678");

      //Assert
      expect(userNameInput).toHaveValue("Jack Col.");
      expect(emailInput).toHaveValue("Valid@gmail.com");
      expect(passwrodInput).toHaveValue("12345678");
    });

    it("should redirect user to home page after successful signup", async () => {
      //Features
      //Arrange
      render(<SignUp />);

      //Act
      const userNameInput = screen.getByLabelText(/User Name/i);
      userEvent.type(userNameInput, "Jack Col.");

      const emailInput = screen.getByLabelText(/Email Address/i);
      userEvent.type(emailInput, "Valid@gmail.com");

      const passwrodInput = screen.getByLabelText(/Password/i);
      userEvent.type(passwrodInput, "12345678");

      const submitBtn = screen.getByRole("button", { name: /Sign Up/i });
      userEvent.click(submitBtn);

      //Assert
      const images = await screen.findAllByAltText(/Fake company number/i);
      const firstImage = images[0];
      expect(firstImage).toBeInTheDocument();
    });
  });
});
