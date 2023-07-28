import { render, screen } from "@testing-library/react";
import Pagination from "./Pagination";

const currentPage = 1;
const totalPages = 3;
const onChange = jest.fn();

describe("Pagination component", () => {
  it("Pagination renders", () => {
    render(
      <Pagination current={currentPage} total={totalPages} changePage={onChange} />
    );

    expect(screen.getByText(currentPage)).toBeInTheDocument();
    expect(screen.getByText(totalPages)).toBeInTheDocument();
  });
})