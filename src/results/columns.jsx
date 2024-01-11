export const columns = [
    {
        accessorKey: "status",
        header: "Status",
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
    {
        accessorKey: "gradeId",
        header: "Grade Id"
    },
    {
        accessorKey: "graphId",
        header: "Graph Id"
    }
]