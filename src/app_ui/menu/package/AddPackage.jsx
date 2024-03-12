import { MenubarItem } from "@/components/ui/menubar";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { PackageForm } from "./PackageForm";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AddPackage() {
    const [open, setOpen] = useState(false);

    return (
      <Dialog open={open} onOpenChange={setOpen} modal={true}>
        <DialogTrigger asChild>
          <MenubarItem onSelect={(e) => e.preventDefault()}>
            Add package
          </MenubarItem>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new package</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[40rem]"><PackageForm setOpen={setOpen}></PackageForm></ScrollArea>
        </DialogContent>
      </Dialog>
    );
}