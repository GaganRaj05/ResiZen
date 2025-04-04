import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { get_land_byId } from "../services/getLands";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import sendMail from "../services/sendMail";
import "../assets/styles/property.css"
function Land_Description({land_id}) {
    const location = useLocation();
    const navigate = useNavigate()
    const house = location.state;
    const [landData, setlandData] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        async function GetHouse(house_id) {
            const response = await get_land_byId(house_id);
            if (response.error) {
                alert(response.error === "jwt must be provided" ? "Login to use this feature" :response.error === "jwt expired" ?"Your session has expired please re-login": response.error);
                navigate("/");
                return; 
            }
            console.log(response)
            setlandData(response)
        }
        GetHouse(house);
    }, []);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true
      };
    const handleBackClick = () =>{
        navigate("/");
        return;
    }
    const handleInterestClick = (e,property_name) =>{
        e.preventDefault();
        setIsSubmitting(true);
        const confirmInterest = window.prompt("Are you sure to submit your interest");
        if(!confirmInterest) return;

        const response = sendMail(property_name);
        setIsSubmitting(false);
        if(response.error) {
            alert(response.error === "jwt must be provided" ? "Login to use this feature" :response.error === "jwt expired" ?"Your session has expired please re-login": "Some error occured please try again later");
            return;
        }
        alert("Interested submitted successfully");
        navigate("/");

    }
    return (
        <div>
            <button onClick={()=>handleBackClick()} className="back-to-home">
                Back to home
            </button>
                    <div className="carousel-container">
            
            {landData && <div>
                <Slider {...settings}>
          {landData.image?.map((img, index) => (
            <div key={index} className="carousel-slide">
              <img src={img} alt={`Property ${index + 1}`} className="carousel-image" />
            </div>
          ))}
        </Slider>
        <div className="property-details">
          <p className="property-description">{landData.description}</p>
          <p><strong>Price:</strong> ₹{landData.offering_price}</p>
          <p><strong>Location:</strong> {landData.address}, {landData.district}, {landData.state}</p>
        </div>
        <button disabled={isSubmitting} onClick={(e)=>handleInterestClick(e,landData._id)} >
            Submit Interest
          </button>

                </div>}
      </div>
        </div>
    )
}
export default Land_Description;