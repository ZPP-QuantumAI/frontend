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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapForm } from "./MapForm";

const regexNumber = /[+-]?\d+(\.\d+)? [+-]?\d+(\.\d+)?/g;

async function createGraphList(newGraph) {
  newGraph.nodes = newGraph.nodes.match(regexNumber).map((s) => {
    const numbers = s.split(" ");
    return {
      longitudeInDecimal: parseFloat(numbers[1]),
      latitudeInDecimal: parseFloat(numbers[0]),
    };
  });
  await post("/graph/map", newGraph);
}

async function createGraphMap(newGraph) {
  newGraph.nodes = newGraph.nodes.map(({ lat, lng }) => ({
    longitudeInDecimal: lng,
    latitudeInDecimal: lat,
  }));
  await post("/graph/map", newGraph);
}

export function AddMapGraph() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MenubarItem onSelect={(e) => e.preventDefault()}>
          Add map graph
        </MenubarItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add map graph</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="map">
          <div className="w-full text-center">
            <TabsList>
              <TabsTrigger value="map">Select from map</TabsTrigger>
              <TabsTrigger value="list">Add manually</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="map">
            <MapForm setOpen={setOpen} createGraph={createGraphMap}></MapForm>
          </TabsContent>
          <TabsContent value="list">
            <GraphForm
              setOpen={setOpen}
              createGraph={createGraphList}
            ></GraphForm>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
