import { render, screen } from "@testing-library/react";
import HomePage from "../pages/HomePage";
import { BrowserRouter } from "react-router-dom";

test("renders homepage title", () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>,
  );

  const title = screen.getByTestId("home-title");
  expect(title).toHaveTextContent("Welcome ");

  expect(screen.getByText("Login")).toBeInTheDocument();
  expect(screen.getByText("Register")).toBeInTheDocument();
});
