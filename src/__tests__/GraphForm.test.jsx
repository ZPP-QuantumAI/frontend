import { GraphForm } from "@/app_ui/menu/graph/GraphForm";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { describe, test, expect, vi } from "vitest";

describe("GraphForm", async () => {
  const queryClient = new QueryClient();
  test("add proper graph", async () => {
    const createGraph = vi.fn();
    const setOpen = vi.fn();
    render(<QueryClientProvider client={queryClient}><GraphForm createGraph={createGraph} setOpen={setOpen} /></QueryClientProvider> );

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "test" },
    });

    fireEvent.change(screen.getByLabelText("Nodes"), {
      target: { value: "0 0\n1.5 1.5\n2 2" },
    });

    fireEvent.click(screen.getByText("Add"));

    await waitFor(() => expect(setOpen).toBeCalledWith(false));
    await waitFor(() => expect(createGraph).toBeCalledWith({name: "test", nodes: "0 0\n1.5 1.5\n2 2"}));
  });

  test("add graph with wrong nodes", async () => {
    const createGraph = vi.fn();
    const setOpen = vi.fn();
    render(<QueryClientProvider client={queryClient}><GraphForm createGraph={createGraph} setOpen={setOpen} /></QueryClientProvider> );

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "test" },
    });

    fireEvent.change(screen.getByLabelText("Nodes"), {
      target: { value: "wrong" },
    });

    fireEvent.click(screen.getByText("Add"));

    await waitFor(() => expect(setOpen).not.toBeCalled());
    await waitFor(() => expect(createGraph).not.toBeCalled());
  });
});
