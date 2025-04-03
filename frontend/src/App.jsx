import Home from "./pages/Home"
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Property_Description from "./pages/PropertyDescriptionPage";
import Land_DescriptionPage from "./pages/LandDescription";
import AdminPage from "./pages/admin";
const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/about-property",
    element:<Property_Description/>
  },
  {
    path:"/about-land",
    element:<Land_DescriptionPage/>
  },
  {
    path:"/admin-dashboard",
    element:<AdminPage/>
  }
])
function App() {
  return (
      <RouterProvider router={router}/>
  )
}
export default App;