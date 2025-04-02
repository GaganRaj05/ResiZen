import { useLocation } from "react-router-dom";
function Land_DescriptionPage() {
    const location = useLocation;
    const land_id = location.state;
    return (
        <div>
            {land_id}
        </div>
    )
}
export default Land_DescriptionPage;