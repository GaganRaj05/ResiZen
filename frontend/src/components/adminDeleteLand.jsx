import { useEffect, useState } from "react"
import Slider from "react-slick"
import {Get_Lands} from "../services/getLands";
import "../assets/styles/content.css";
import { DeleteLand } from "../services/admin";
function Delete_Land() {
    const [lands, setLands] = useState([]);
    const [error, setError] = useState("");

    useEffect(()=> {
        async function getLands() {
            const response = await Get_Lands();
            if(response.error) {
                setError(response.error ==="Failed to fetch"?"Some error occured please try again later":response.error);
                return;
            }
            setLands(response);
        }
        getLands();
    },[])
    const carouselSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: true,
      };
    const handleDeleteClick = async(e,land_id)=> {
        e.preventDefault();
        const confirmDelete = window.confirm("Are you sure you want to delete this Land?");
        if(!confirmDelete) return;
        const response = await DeleteLand(land_id);
        if (response.error) {
            setError(response.error === "Failed to fetch" ? 
                "Some error occurred, please try again later" : response.error);
            alert(error);
            return;
        }
        setLands(lands.filter(land => land._id!== land_id));
        console.log(response)
        alert(response);
        return;

    }
    return (
        <div className="content-display-container">
            {error && <p>Error</p>}
            {lands.length === 0 && <p>No properites entered</p>}
        {lands.length!==0 && !error && lands.map((land, index) => (
          <div key={index} className="house-card" onClick={()=>{handleCardClick(land._id)}}>
            <Slider {...carouselSettings}>
              {land.image.map((imgSrc, imgIndex) => (
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
                {land.district}, {land.state}
              </p>

              <p className="house-price">Price: ${land.offering_price}</p>
              <button onClick={(e)=>handleDeleteClick(e,land._id)} className="dlt-user-btns">Delete</button>
            </div>
          </div>
        ))}
      </div>
    )
}
export default Delete_Land;
