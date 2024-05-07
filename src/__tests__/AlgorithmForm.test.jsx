import { AlgorithmForm } from "@/app_ui/menu/algorithm/AlgorithmForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";

describe("AlgorithmForm", async () => {
  test("algorithm form with proper input", async () => {
    const setSelectedAlgorithm = vi.fn();
    const setOpen = vi.fn();
    render(
      <AlgorithmForm
        setSelectedAlgorithm={setSelectedAlgorithm}
        setOpen={setOpen}
      />,
    );

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "test" },
    });

    const file = new File(["test"], "test.zip", { type: "application/zip" });
    await userEvent.upload(screen.getByLabelText("File"), file);

    fireEvent.click(screen.getByText("Select"));

    expect(screen.getByLabelText("Name")).toHaveValue("test");
    expect(screen.getByLabelText("File").files[0]).toBe(file);
    await waitFor(() => expect(setSelectedAlgorithm).toBeCalled());
    await waitFor(() => expect(setOpen).toBeCalledWith(false));
  });

  test("algorithm form without proper input", async () => {
    const setSelectedAlgorithm = vi.fn();
    const setOpen = vi.fn();
    render(
      <AlgorithmForm
        setSelectedAlgorithm={setSelectedAlgorithm}
        setOpen={setOpen}
      />,
    );

    fireEvent.click(screen.getByText("Select"));

    await waitFor(() => expect(setSelectedAlgorithm).not.toBeCalled());
    await waitFor(() => expect(setOpen).not.toBeCalled());
  });

  test("algorithm form with wrong file format", async () => {
    const setSelectedAlgorithm = vi.fn();
    const setOpen = vi.fn();
    render(
      <AlgorithmForm
        setSelectedAlgorithm={setSelectedAlgorithm}
        setOpen={setOpen}
      />,
    );

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "test" },
    });

    const file = new File(["test"], "test.png", { type: "image/png" });
    await userEvent.upload(screen.getByLabelText("File"), file);

    fireEvent.click(screen.getByText("Select"));

    expect(screen.getByLabelText("Name")).toHaveValue("test");
    expect(screen.getByLabelText("File").files.length).toBe(0);
    await waitFor(() => expect(setSelectedAlgorithm).not.toBeCalled());
    await waitFor(() => expect(setOpen).not.toBeCalled());
  });
});
