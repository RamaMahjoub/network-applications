import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import Clip from "./@core/components/clip-spinner";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<Clip />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
