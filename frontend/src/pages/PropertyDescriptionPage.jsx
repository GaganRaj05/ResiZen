import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { get_house_byId } from "../services/getHouses";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import sendMail from "../services/sendMail";
import "../assets/styles/property.css"
function Property_Description({property_id}) {
    const location = useLocation();
    const navigate = useNavigate()
    const house = location.state;
    const [houseData, setHouseData] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        async function GetHouse(house_id) {
            const response = await get_house_byId(house_id);
            if (response.error) {
                alert(response.error === "jwt must be provided" ? "Login to use this feature" :response.error === "jwt expired" ?"Your session has expired please re-login": response.error);
                navigate("/");
                return; 
            }
            console.log(response)
            setHouseData(response)
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
        const confirmInterest = window.confirm("Are you sure to submit your interest");
        if(!confirmInterest) return;

        const response = sendMail(property_name);
        setIsSubmitting(false);
        if(response.error) {
            alert(response.error === "jwt must be provided" ? "Login to use this feature" :response.error === "jwt expired" ?"Your session has expired please re-login": "Some error occured please try again later");
            return;
        }
        setIsSubmitting(false);
        alert("Interested submitted successfully");
        navigate("/");

    }
    return (
        <div>
            <button onClick={()=>handleBackClick()} className="back-to-home">
                Back to home
            </button>
                    <div className="carousel-container">
            
            {houseData && <div>
                <Slider {...settings}>
          {houseData.image?.map((img, index) => (
            <div key={index} className="carousel-slide">
              <img src={img} alt={`Property ${index + 1}`} className="carousel-image" />
            </div>
          ))}
        </Slider>
        <div className="property-details">
          <h2 className="property-title">{houseData.name}</h2>
          <p className="property-description">{houseData.description}</p>
          <p><strong>Price:</strong> ₹{houseData.offering_price}</p>
          <p><strong>Land Size:</strong> {houseData.land_size}</p>
          <p><strong>Type:</strong> {houseData.propertyType}</p>
          <p><strong>Location:</strong> {houseData.complete_address}, {houseData.district}, {houseData.state}</p>
        </div>
        <button disabled={isSubmitting} onClick={(e)=>handleInterestClick(e,houseData.name)} >
            Submit Interest
          </button>

                </div>}
      </div>
        </div>
    )
}
export default Property_Description;