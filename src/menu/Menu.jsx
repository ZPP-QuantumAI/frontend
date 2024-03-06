import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { Button } from "@/components/ui/button";
import { AddGraph } from "./graph/AddGraph";
import { useState } from "react";
import { AddAlgorithm } from "./algorithm/AddAlgorithm";
import { API_URL } from "@/lib/constants";
import { AddPackage } from "./package/AddPackage";
import { SelectPackages } from "./package/SelectPackages";
import { useMutation } from "react-query";

export function Menu({ setKeys }) {
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState();

  async function runAlgorithm() {
    const results = [];
    const data = new FormData();
    data.append("solution", selectedAlgorithm);

    for (const packageId of selectedPackages) {
      let result = await fetch(
        `${API_URL}/grade/package?packageId=${packageId}&problem=TSP`,
        {
          method: "POST",
          body: data,
        }
      );
      results.push(await result.text());
    }

    setKeys(results);
  }

  const runMutation = useMutation({ mutationFn: runAlgorithm });

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="ml-2">Algorithm</MenubarTrigger>
        <MenubarContent>
          <AddAlgorithm
            setSelectedAlgorithm={setSelectedAlgorithm}
          ></AddAlgorithm>
          {/* <MenubarItem>Select algorithms</MenubarItem> */}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Package</MenubarTrigger>
        <MenubarContent>
          <AddPackage />
          <SelectPackages
            selectedPackages={selectedPackages}
            setSelectedPackages={setSelectedPackages}
          ></SelectPackages>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Graph</MenubarTrigger>
        <MenubarContent>
          <AddGraph></AddGraph>
          {/* <SelectGraphs selectedGraphs={selectedGraphs} setSelectedGraphs={setSelectedGraphs}></SelectGraphs> */}
        </MenubarContent>
      </MenubarMenu>
      <Button
        onClick={() => setSelectedAlgorithm()}
        variant="menu"
        size="menu"
        className="ml-auto"
      >
        Selected algorithms: {selectedAlgorithm && 1}
        {!selectedAlgorithm && 0}
      </Button>
      <Button
        onClick={() => setSelectedPackages([])}
        variant="menu"
        size="menu"
      >
        Selected packages: {selectedPackages.length}
      </Button>
      <Button
        disabled={selectedPackages.length == 0 || !selectedAlgorithm}
        variant="menu"
        size="menu"
        className="bg-green-600 rounded-lg hover:bg-green-900"
        isLoading={runMutation.isLoading}
        loadingMess="Sending"
        onClick={runMutation.mutate}
      >
        Run
      </Button>
    </Menubar>
  );
}
