import Home from "./pages/Home"
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Property_Description from "./pages/PropertyDescriptionPage";
import Land_DescriptionPage from "./pages/LandDescription";
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
  }
])
function App() {
  return (
      <RouterProvider router={router}/>
  )
}
export default App;