import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

<<<<<<< HEAD
import router from "./router"; // Import the router variable correctly
=======
import router from "./router"; // Import router as default
>>>>>>> main

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
