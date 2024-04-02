import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { Button } from "@/components/ui/button";
import { AddGraph } from "./graph/AddGraph";
import { useState } from "react";
import { AddAlgorithm } from "./algorithm/SelectAlgorithm";
import { API_URL, RECENT_ALGORITHMS_NUM } from "@/lib/constants";
import { AddPackage } from "./package/AddPackage";
import { SelectPackages } from "./package/SelectPackages";
import { useMutation } from "react-query";
import { AddMapGraph } from "./graph/AddMapGraph";

export function Menu({ setKeys }) {
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState();
  const [recentAlgorithms, setRecentAlgorithms] = useState([]);

  function selectRecentAlgorithm(algorithm, index) {
    const newRecentAlgorithms = [algorithm, ...recentAlgorithms];
    newRecentAlgorithms.splice(index + 1, 1);
    setRecentAlgorithms(newRecentAlgorithms);
    setSelectedAlgorithm(algorithm);
  }

  function selectAlgorithm(algorithm) {
    const newRecentAlgorithms = [algorithm, ...recentAlgorithms].slice(
      0,
      RECENT_ALGORITHMS_NUM,
    );
    setRecentAlgorithms(newRecentAlgorithms);
    setSelectedAlgorithm(algorithm);
  }

  async function runAlgorithm() {
    const results = [];
    const data = new FormData();
    data.set("problem", "TSP");
    data.set("solution", selectedAlgorithm.algorithm[0]);
    data.set("name", selectedAlgorithm.name);

    for (const packageId of selectedPackages) {
      data.set("packageId", packageId);

      let result = await fetch(`${API_URL}/grade/package`, {
        method: "POST",
        body: data,
      });
      results.push(await result.text());
      console.log(results);
    }

    setKeys(results);
  }

  const runMutation = useMutation({ mutationFn: runAlgorithm });

  return (
    <Menubar className="sticky top-0">
      <MenubarMenu>
        <MenubarTrigger className="ml-2">Algorithm</MenubarTrigger>
        <MenubarContent>
          <AddAlgorithm
            selectedAlgorithm={selectedAlgorithm}
            setSelectedAlgorithm={selectAlgorithm}
          ></AddAlgorithm>
          <MenubarSub>
            <MenubarSubTrigger>Recent algorithms</MenubarSubTrigger>
            <MenubarSubContent>
              {recentAlgorithms.map((algorithm, index) => (
                <MenubarItem
                  key={index}
                  onClick={() => selectRecentAlgorithm(algorithm, index)}
                >
                  {algorithm.name}
                </MenubarItem>
              ))}
            </MenubarSubContent>
          </MenubarSub>
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
          <AddMapGraph></AddMapGraph>
          {/* <SelectGraphs selectedGraphs={selectedGraphs} setSelectedGraphs={setSelectedGraphs}></SelectGraphs> */}
        </MenubarContent>
      </MenubarMenu>
      <Button
        onClick={() => setKeys([])}
        variant="menu"
        size="menu"
        className="ml-auto"
      >
        Clear results
      </Button>
      <Button onClick={() => setSelectedAlgorithm()} variant="menu" size="menu">
        Selected algorithm: {selectedAlgorithm && selectedAlgorithm.name}
        {!selectedAlgorithm && ""}
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
