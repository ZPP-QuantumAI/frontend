import { API_URL } from "@/constants";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useQueries } from "react-query";

export default function Results({keys}) {
    const [results, setResults] = useState([]);

    // useEffect(() => {
    //     const tmp = [];
    //     // async function test(key, index) {
    //     //     let inserted = false;
    //     //     while (keys.has(key)) {
    //     //         let result = await fetch(`${API_URL}/grade/?gradeId=${key}`);
    //     //         result = await result.json();
    //     //         if (!inserted || result.status != 'WAITING') {
    //     //             tmp[index] = result;
    //     //             setResults(tmp);
    //     //             console.log(tmp);

    //     //             if (result.status != 'WAITING') {
    //     //                 return;
    //     //             }
    //     //         }
    //     //         await new Promise((r) => setTimeout(r, 2000));
    //     //     }
    //     // }

    //     // let i = 0;
    //     // for (const key of keys) {
    //     //     test(key, i++);
    //     // }
    //     async function test(key, index) {
    //         let tmp2 = {
    //             status: "SUCCESS",
    //             runtimeInMs: 19,
    //         }

    //         tmp[index] = tmp2;
    //         setResults(tmp); 

    //         while (true) {
    //             tmp[index].runtimeInMs++;
    //             setResults(tmp);
    //             console.log(tmp);
    //             await new Promise((r) => setTimeout(r, 20000));
    //             console.log(tmp);
    //         }
    //     }

    //     for (let i = 0; i < 2; i++) {
    //         test(true,i);
    //     }

    // }, [keys]);

    async function myFetch(i) {
        let result = {status: 'WAITING'};
        while (result.status == 'WAITING') {
            result = await fetch(`${API_URL}/grade/?gradeId=${i}`);
            result = await result.json();
            await new Promise((r) => setTimeout(r, 2000));
        }
        return await result;
    }

    const data = useQueries(keys.map(i => {
        return {
            queryKey: ['key', i],
            queryFn: () => myFetch(i),
            initialData: () => {return {status: 'WAITING', gradeId: i}},
        }
    }))

    console.log(data);
    
    return (<DataTable columns={columns} data={data.map(res => res.data)} />);
}