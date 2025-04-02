import { GiPoolDive } from "react-icons/gi";
import { GiSunset } from "react-icons/gi";
import { PiFarmBold } from "react-icons/pi";
import { PiWindmill } from "react-icons/pi";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach } from "react-icons/tb";
import { GiTreehouse } from "react-icons/gi";
import { MdCastle } from "react-icons/md";
import { MdMenuBook } from "react-icons/md";
import { useState, useEffect } from "react";
import { Get_All_Houses, Get_Particular_House } from "../services/getHouses";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

function Content() {
  const [subType, setSubType] = useState("All");
  const [houses, setHouses] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function getHouses() {
      try {
        const response = await Get_All_Houses();
        console.log(response);
        setIsLoading(false);
        setHouses(response);
      } catch (err) {
        console.log(err);
        setError("Some error occurred, please try again later.");
      }
    }
    getHouses();
  }, []);

  const handleSubTypeClick = async (e, type) => {
    setError("");
    e.preventDefault();
    setSubType(type);
    if(type === "All") {
        const response = await Get_All_Houses();
        setHouses(response);
        return;
    }
    setIsLoading(true)
    const response = await Get_Particular_House(type);
    setIsLoading(false);
    if (response.error) {
      setError(
        response.error === "Failed to fetch"
          ? "Some error occurred, please try again later"
          : response.error
      );
      return;
    }
    if (!Array.isArray(response) || response.length === 0) {
        console.log(response);
        setError("No property found at the moment");
        return;
      }
    
    setHouses(response);
  };
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
  };
  const handleCardClick = (property_id)=> {
    navigate("/about-property",{state:property_id});
  }
  return (
    <div className="content-container">
      <div className="sub-content-container">
        {[
          { type: "All", icon: <MdMenuBook className="sub-icons" /> },
          { type: "Pool", icon: <GiPoolDive className="sub-icons" /> },
          { type: "Amazing_View", icon: <GiSunset className="sub-icons" /> },
          { type: "Tree_House", icon: <GiTreehouse className="sub-icons" /> },
          { type: "Country_Side", icon: <PiFarmBold className="sub-icons" /> },
          { type: "Windmill", icon: <PiWindmill className="sub-icons" /> },
          { type: "Villa", icon: <MdOutlineVilla className="sub-icons" /> },
          { type: "Beach front", icon: <TbBeach className="sub-icons" /> },
          { type: "Castles", icon: <MdCastle className="sub-icons" /> },
        ].map(({ type, icon }) => (
          <button
            key={type}
            disabled={isLoading}
            onClick={(e) => handleSubTypeClick(e, type)}
            className={`sub-button ${subType === type ? "active" : ""}`}
          >
            {icon}
            {type.replace("_", " ")}
          </button>
        ))}
      </div>
      
      {error && <p className="error-message">{error}</p>}
      {!error && houses.length !== 0 && (
        <div className="content-display-container">
          {houses.map((house, index) => (
            <div key={index} className="house-card" onClick={()=>{handleCardClick(house._id)}}>
              <Slider {...carouselSettings}>
                {house.image.map((imgSrc, imgIndex) => (
                  <div key={imgIndex}>
                    <img
                      src={imgSrc}
                      alt={`House ${index}`}
                      className="house-image"
                    />
                  </div>
                ))}
              </Slider>
              <div className="house-info">
                <p className="house-location">
                  {house.district}, {house.state}
                </p>

                <p className="house-price">Price: ${house.offering_price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Content;
