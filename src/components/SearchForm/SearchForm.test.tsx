import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchForm from "./SearchForm";

const onChange = jest.fn();
const onSubmit = jest.fn();

describe("SearchForm component", () => {
  it("SearchForm renders", () => {
    render(
      <SearchForm value="" onChange={onChange} onSubmit={onSubmit} />
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("onChange works", () => {
    const testWord = "work";

    render(
      <SearchForm value="" onChange={onChange} onSubmit={onSubmit} />
    );

    userEvent.type(screen.getByRole("textbox"), testWord);

    expect(onChange).toBeCalledTimes(testWord.length);
  })

  it("onSubmit works", () => {
    render(
      <SearchForm value="" onChange={onChange} onSubmit={onSubmit} />
    );

    userEvent.click(screen.getByRole("button"));
    expect(onSubmit).toBeCalled();

    userEvent.click(screen.getByRole("textbox"));
    userEvent.keyboard("{enter}");
    expect(onSubmit).toBeCalled();
  })
})