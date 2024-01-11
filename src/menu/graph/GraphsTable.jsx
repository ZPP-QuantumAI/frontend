import { API_URL } from "@/constants";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Loader2 } from "lucide-react";
import { DataTable } from "./graphs/data-table";
import { columns } from "./graphs/columns";


export function GraphsTable({rowSelection, setRowSelection, selectedGraphs}) {
    const [graphs, setGraphs] = useState();

    useEffect(() => {
        async function getGraphs() {
            let response = await fetch(`${API_URL}/graph/all`);
            response = await response.json();
            setGraphs(response.map((graph) => {return {id: graph.id, name: graph.name, nodes_number: graph.nodes.length};}));
        }
        getGraphs();
        setRowSelection(Object.fromEntries(selectedGraphs.map(id => [id, true])));
    }, [])

    return (
        <>
        {!graphs && <Loader2 className="m-auto h-10 w-10 animate-spin" />}
        {
            graphs && <DataTable columns={columns} data={graphs} rowSelection={rowSelection} setRowSelection={setRowSelection} />
        }</>
    );
}