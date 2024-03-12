import { GradePackagesTable } from "./grade-packages-table/GradePackagesTable";

export default function Results({keys, setResult}) {
    // const columns = [
    //     {
    //         accessorKey: "status",
    //         header: "Status",
    //         cell: ({row}) => {switch(row.getValue("status")) {
    //             case 'SUCCESS': return <Check className="text-green-500"/>;
    //             case 'FAILED': return <X className="text-red-500"/>;
    //             case 'WAITING': return <Loader2 className="animate-spin"/>;
    //             default: return row.getValue("status");
    //         }}
    //     },
    //     {
    //         accessorKey: "gradeId",
    //         header: "Grade id",
    //     },
    //     {
    //         accessorKey: "runtimeInMs",
    //         header: "Runtime",
    //         cell: ({ row }) => {return row.getValue("runtimeInMs") ? row.getValue("runtimeInMs") + " ms" : row.getValue("runtimeInMs")}
    //     },
    //     {
    //         accessorKey: "result.sumOfWeights",
    //         header: "Distance",
    //     },
    //     {
    //         accessorKey: "graph.name",
    //         header: "Graph name",
    //     },
    //     {
    //         accessorKey: "graph.id",
    //         header: "Graph id",
    //         id: "graphId",
    //     },
    //     {
    //         accessorKey: "result",
    //         header: "Show",
    //         cell: ({ row }) => {return row.getValue("status") != 'SUCCESS' ? <Button disabled>Show</Button> : <Button onClick={() => setResult(row)}>Show</Button>}
    //     }
    // ]

    // async function myFetch(i) {
    //     let grade = await fetch(`${API_URL}/grade/?gradeId=${i}`);
    //     grade = await grade.json();

    //     if (grade.status == 'WAITING') {
    //         console.log('error');
    //         throw new Error('Result not ready!');
    //     }

    //     let graph = await fetch(`${API_URL}/graph/?graphId=${grade.graphId}`);
    //     graph = await graph.json();

    //     grade.graph = graph;

    //     console.log(grade);
    //     return grade;
    // }

    // const data = useQueries(keys.map(i => {
    //     return {
    //         queryKey: ['key', i],
    //         queryFn: () => myFetch(i),
    //         initialData: () => {return {status: 'WAITING', gradeId: i}},
    //         retry: true,
    //     }
    // }))
    
    // return (<DataTable columns={columns} data={data.map(res => res.data)} />);
    return (<GradePackagesTable keys={keys}/>)
}