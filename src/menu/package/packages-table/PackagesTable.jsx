import { API_URL } from "@/constants";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useQuery } from "react-query";


export function PackagesTable({rowSelection, setRowSelection, selectedPackages}) {
    const packages = useQuery("packages", async () => {
        let response = await fetch(`${API_URL}/package/all`);
        return await response.json();
    })

    useEffect(() => {
        setRowSelection(Object.fromEntries(selectedPackages.map(id => [id, true])));
    }, [])

    return (
        <>
        {packages.isLoading && <Loader2 className="m-auto h-10 w-10 animate-spin" />}
        {
            packages.isSuccess && <DataTable columns={columns} data={packages.data} rowSelection={rowSelection} setRowSelection={setRowSelection} />
        }</>
    );
}