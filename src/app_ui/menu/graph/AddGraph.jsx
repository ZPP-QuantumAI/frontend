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

export function AddGraph() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MenubarItem onSelect={(e) => e.preventDefault()}>
          Add graph
        </MenubarItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new graph</DialogTitle>
        </DialogHeader>
        <GraphForm setOpen={setOpen}></GraphForm>
      </DialogContent>
    </Dialog>
  );
}
