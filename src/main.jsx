import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import "leaflet/dist/leaflet.css"; Try to uncomment in future(and delete stylesheet link in index.html).

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
