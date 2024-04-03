import { MenubarItem } from "@/components/ui/menubar";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GraphForm } from "./GraphForm";
import { useState } from "react";
import { post } from "@/lib/requests";

const regexNumber = /[+-]?\d+(\.\d+)? [+-]?\d+(\.\d+)?/g;

async function createGraph(newGraph) {
  newGraph.nodes = newGraph.nodes.match(regexNumber).map((s) => {
    const numbers = s.split(" ");
    return { x: parseFloat(numbers[0]), y: parseFloat(numbers[1]) };
  });
  await post("/graph/", newGraph);
}

export function AddGraph() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MenubarItem onSelect={(e) => e.preventDefault()}>
          Add euclidean graph
        </MenubarItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add euclidean graph</DialogTitle>
        </DialogHeader>
        <GraphForm setOpen={setOpen} createGraph={createGraph}></GraphForm>
      </DialogContent>
    </Dialog>
  );
}
