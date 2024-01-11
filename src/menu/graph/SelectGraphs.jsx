import { MenubarItem } from "@/components/ui/menubar";
import { ScrollArea } from "@/components/ui/scroll-area"


import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { GraphsTable } from "./GraphsTable";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function SelectGraphs( { selectedGraphs, setSelectedGraphs} ) {
  const [rowSelection, setRowSelection] = useState({});

  function selectGraphs() {
    console.log(Object.keys(rowSelection));
    setSelectedGraphs(Object.keys(rowSelection));
  }

    return (
        <Dialog>
        <DialogTrigger asChild>
          <MenubarItem onSelect={(e) => e.preventDefault()}>
            Select graphs
          </MenubarItem>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select graphs</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[40rem]"><GraphsTable rowSelection={rowSelection} setRowSelection={setRowSelection} selectedGraphs={selectedGraphs} /></ScrollArea>
          <DialogFooter><DialogClose asChild><Button onClick={selectGraphs}>Select</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>
    );
}