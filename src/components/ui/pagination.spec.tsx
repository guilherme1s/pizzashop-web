import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "./pagination";

describe("Pagination", () => {
  it("should display the right amount of pages and results", () => {
    render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByText("Página 1 de 20")).toBeInTheDocument();
    expect(screen.getByText("Total de 200 item(s)")).toBeInTheDocument();
  });

  it("should be able to navigate to the next page", async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={onPageChange}
      />,
    );

    const nextPageButton = screen.getByRole("button", {
      name: "Próxima página",
    });

    await user.click(nextPageButton);

    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});
