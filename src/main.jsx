import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from "./routes/App.jsx";
import Home from './routes/Home.jsx';
import Upload from './routes/Upload.jsx';
import "./index.css";
import Frame2 from './components/Frame2.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/upload",
        element: <Upload />,
      },
      {
        path: "/frame2",
        element:  <Frame2/>
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
