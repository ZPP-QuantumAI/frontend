import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useQuery } from "react-query";
import { get } from "@/lib/requests";


export function PackagesTable({rowSelection, setRowSelection, selectedPackages}) {
    const packages = useQuery("packages", async () => {
        return await get('/package/all');
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