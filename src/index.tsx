import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import App from './App';
import { 
  createBrowserRouter,
  RouterProvider,
  redirect 
} from 'react-router-dom';
import * as page from "./page";
import "./i18n/configs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <page.ErrorPage />,
    children: [
      {
        index: true,
        loader() {
          return redirect("/Calculator");
        }
      },
      {
        path: "Calculator",
        element:<page.Calculator />,
      },
      {
        path: "ShippingPrice",
        element:<page.ShippingPrice />,
      },
      {
        path: "MyHome",
        element:<page.MyHome />
      }
    ],
  },
]);

ReactDOM.createRoot(document.querySelector("#root")!).render(
  // <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  // </React.StrictMode>
);
