import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Register } from "./Register";

const mockColumnsHelper = () => ({
  columnDefinitions: [{ field: "id", headerName: "ID", width: 150 }],
  objectName: "Test Object",
  drawerIsOpen: false,
  renderDrawer: jest.fn(),
  rows: [{ id: 1 }],
  setDrawerIsOpen: jest.fn(),
});

describe("Register Component", () => {
  test("renders title and description", () => {
    render(
      <Register
        title="Test Title"
        description="Test Description"
        columnsHelper={mockColumnsHelper}
      />
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  test("renders DataGrid with rows", () => {
    render(
      <Register
        title="Test Title"
        description="Test Description"
        columnsHelper={mockColumnsHelper}
      />
    );

    expect(screen.getByRole("grid")).toBeInTheDocument();
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("opens drawer on button click", () => {
    const { setDrawerIsOpen } = mockColumnsHelper();
    render(
      <Register
        title="Test Title"
        description="Test Description"
        columnsHelper={mockColumnsHelper}
      />
    );

    fireEvent.click(screen.getByText("Create Test Object"));
    expect(setDrawerIsOpen).toHaveBeenCalledWith(true);
  });
});
