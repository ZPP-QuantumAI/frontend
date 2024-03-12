import { MenubarItem } from "@/components/ui/menubar";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { AlgorithmForm } from "./AlgorithmForm";

export function AddAlgorithm({ setSelectedAlgorithm }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MenubarItem onSelect={(e) => e.preventDefault()}>
          Select algorithm
        </MenubarItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select algorithm</DialogTitle>
        </DialogHeader>
        <AlgorithmForm
          setSelectedAlgorithm={setSelectedAlgorithm}
          setOpen={setOpen}
        ></AlgorithmForm>
      </DialogContent>
    </Dialog>
  );
}
