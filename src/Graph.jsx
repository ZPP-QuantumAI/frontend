import { useState, useEffect } from 'react';

function Graph() {
    const [graphs, setGraphs] = useState(new Map());

    useEffect(getGraphs, []);

    function getGraphs() {
        fetch('http://34.116.224.190:8080/graph/').then((response) =>
         {return response.json()}).then(response =>
             { setGraphs(new Map(response.map(graph => [graph.name, graph.nodes]))); console.log(graphs.keys((key) => {return key}))})
    }

    return (<>{graphs.keys((key) => {return key})}<button onClick={getGraphs}>Test</button></>);
}

export {Graph};