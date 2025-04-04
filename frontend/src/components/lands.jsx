import { useState, useEffect } from "react";
import {Get_Lands} from "../services/getLands";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useLocation, useNavigate } from "react-router-dom";

function Lands() {
    const [lands, setLands] = useState([]); 
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        async function getLand() {
            const response = await Get_Lands();
            if (response.error) {
                setError(response.error === "Failed to fetch" ? "Some error occurred, please try again later" : response.error);
                return;
            }
            if(response.length === 0) {
                setError("No Lands found at the moment");
                return;
            }
            setLands(response);
        }
        getLand();
    }, []);

    const carouselSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: true,
    };
    const handleCardClick = (land_id) =>{
        navigate("/about-land",{state:land_id})
    }

    return (
        <div className="content-display-container">
            {error && <p className="error-message">{error}</p>} 
            {lands.map((land, index) => (
                <div key={index} className="house-card" onClick={()=>handleCardClick(land._id)}>
                    <Slider {...carouselSettings}>
                        {land.image.map((imgSrc, imgIndex) => (
                            <div key={imgIndex}>
                                <img
                                    src={imgSrc}
                                    alt={`Land ${index}`}
                                    className="house-image"
                                />
                            </div>
                        ))}
                    </Slider>
                    <div className="house-info">
                        <p className="house-location">
                            {land.district}, {land.state}
                        </p>
                        <p className="house-price">Price: ${land.offering_price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Lands;
