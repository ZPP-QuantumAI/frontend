import { MenubarItem } from "@/components/ui/menubar";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export function AddAlgorithm({setSelectedAlgorithm}) {
    function addAlgorithm() {
        console.log(document.getElementById("algorithm").files[0]);
        setSelectedAlgorithm(document.getElementById("algorithm").files[0]);
    }

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MenubarItem onSelect={(e) => e.preventDefault()}>
          Add algorithm
        </MenubarItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new algorithm</DialogTitle>
        </DialogHeader>
        <div>
            <Label htmlFor="algorithm">Algorithm</Label>
            <Input id="algorithm" type="file" />
        </div>
        <DialogFooter><DialogClose asChild><Button onClick={addAlgorithm}>Add</Button></DialogClose></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
