import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { act } from "react-dom/test-utils";

describe("App component", () => {
  it("App renders", () => {
    render(
      <App />
    )

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Typing in search", () => {
    render(
      <App />
    )

    expect(screen.queryByDisplayValue("Search value")).toBeNull();

    act(() => {
      userEvent.type(screen.getByRole("textbox"), "Search value");
    });

    expect(screen.queryByDisplayValue("Search value")).toBeInTheDocument();
  });
})