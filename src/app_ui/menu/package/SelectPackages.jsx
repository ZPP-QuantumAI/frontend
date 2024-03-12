import { MenubarItem } from "@/components/ui/menubar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PackagesTable } from "./packages-table/PackagesTable";

export function SelectPackages({ selectedPackages, setSelectedPackages }) {
  const [rowSelection, setRowSelection] = useState({});

  function selectPackages() {
    setSelectedPackages(Object.keys(rowSelection));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <MenubarItem onSelect={(e) => e.preventDefault()}>
          Select packages
        </MenubarItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select packages</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[40rem]">
          <PackagesTable
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
            selectedPackages={selectedPackages}
          />
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={selectPackages}>Select</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
