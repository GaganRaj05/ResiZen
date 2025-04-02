import Navbar from "../components/navBar"
import { useLocation } from "react-router-dom";
function Property_Description({property_id}) {
    const location = useLocation();
    const house = location.state;

    return (
        <div>
            <Navbar/>
        </div>
    )
}
export default Property_Description;