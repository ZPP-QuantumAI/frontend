import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { Button } from "@/components/ui/button";
import { AddGraph } from "./graph/AddGraph";
import { SelectGraphs } from "./graph/SelectGraphs";
import { useState } from "react";
import { AddAlgorithm } from "./algorithm/AddAlgorithm";
import { API_URL } from "@/constants";
import { AddPackage } from "./package/AddPackage";
import { SelectPackages } from "./package/SelectPackages";

export function Menu({setKeys}) {
  const [selectedGraphs, setSelectedGraphs] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState();

  async function runAlgorithm() {
    const results = [];
    const data = new FormData();
    data.append('solution', selectedAlgorithm);

    for (const packageId of selectedPackages) {
      let packageData = await fetch(`${API_URL}/package/?packageId=${packageId}`);
      packageData = await packageData.json();
      
      for (const graphId of packageData.graphIds) {
        let result = await fetch(`${API_URL}/grade/graph?graphId=${graphId}&problem=TSP`, {
          method: "POST",
          body: data,
        })
        result = await result.text();
        
        results.push(result);
      }
    }

    // setSelectedAlgorithm();
    // setSelectedGraphs([]);
    console.log(results);
    setKeys(results);
  }

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="ml-2">Algorithm</MenubarTrigger>
        <MenubarContent>
          <AddAlgorithm setSelectedAlgorithm={setSelectedAlgorithm}></AddAlgorithm>
          {/* <MenubarItem>Select algorithms</MenubarItem> */}
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Package</MenubarTrigger>
        <MenubarContent>
          <AddPackage/>
          <SelectPackages selectedPackages={selectedPackages} setSelectedPackages={setSelectedPackages}></SelectPackages>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Graph</MenubarTrigger>
        <MenubarContent>
          <AddGraph></AddGraph>
          {/* <SelectGraphs selectedGraphs={selectedGraphs} setSelectedGraphs={setSelectedGraphs}></SelectGraphs> */}
        </MenubarContent>
      </MenubarMenu>
      <Button onClick={() => setSelectedAlgorithm()} variant="menu" size="menu" className="ml-auto">
        Selected algorithms: {selectedAlgorithm && 1}{!selectedAlgorithm && 0}
      </Button>
      <Button onClick={() => setSelectedPackages([])} variant="menu" size="menu">
        Selected packages: {selectedPackages.length}
      </Button>
      <Button
        disabled={selectedPackages.length == 0 || !selectedAlgorithm}
        variant="menu"
        size="menu"
        className="bg-green-600 rounded-lg hover:bg-green-900"
        onClick={runAlgorithm}
      >
        Run
      </Button>
    </Menubar>
  );
}
