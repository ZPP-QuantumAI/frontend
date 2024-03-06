import { Check, Loader2, X } from "lucide-react";

export const columns = [
        {
            accessorKey: "status",
            header: "Status",
            cell: ({row}) => {switch(row.getValue("status")) {
                case 'SUCCESS': return <Check className="text-green-500"/>;
                case 'FAILED': return <X className="text-red-500"/>;
                case 'WAITING': return <Loader2 className="animate-spin"/>;
                default: return row.getValue("status");
            }}
        },
        {
            accessorKey: "gradeId",
            header: "Grade id",
        },
        {
            accessorKey: "runtimeInMs",
            header: "Runtime",
            cell: ({ row }) => {return row.getValue("runtimeInMs") ? row.getValue("runtimeInMs") + " ms" : row.getValue("runtimeInMs")}
        },
        {
            accessorKey: "result.sumOfWeights",
            header: "Distance",
        },
        // {
        //     accessorKey: "graph.name",
        //     header: "Graph name",
        // },
        {
            accessorKey: "graphId",
            header: "Graph id",
            id: "graphId",
        },
        // {
        //     accessorKey: "result",
        //     header: "Show",
        //     cell: ({ row }) => {return row.getValue("status") != 'SUCCESS' ? <Button disabled>Show</Button> : <Button onClick={() => setResult(row)}>Show</Button>}
        // }
    ]