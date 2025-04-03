import { useEffect, useState } from "react"
import Slider from "react-slick"
import { Get_All_Houses } from "../services/getHouses";
import "../assets/styles/content.css";
import { DeleteProperty } from "../services/admin";
function Delete_Property() {
    const [houses, setHouses] = useState([]);
    const [error, setError] = useState("");

    useEffect(()=> {
        async function getHouses() {
            const response = await Get_All_Houses();
            if(response.error) {
                setError(response.error ==="Failed to fetch"?"Some error occured please try again later":response.error);
                return;
            }
            setHouses(response);
        }
        getHouses();
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
    const handleDeleteClick = async(e,house_id)=> {
        e.preventDefault();
        const confirmDelete = window.confirm("Are you sure you want to delete this property?");
        if(!confirmDelete) return;
        const response = await DeleteProperty(house_id);
        if (response.error) {
            setError(response.error === "Failed to fetch" ? 
                "Some error occurred, please try again later" : response.error);
            alert(error);
            return;
        }
        setHouses(houses.filter(house => house._id!== house_id));
        console.log(response)
        alert(response);
        return;

    }
    return (
        <div className="content-display-container">
            {error && <p>Error</p>}
            {houses.length === 0 && <p>No properites entered</p>}
        {houses.length!==0 && !error && houses.map((house, index) => (
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
              <button onClick={(e)=>handleDeleteClick(e,house._id)} className="dlt-user-btns">Delete</button>
            </div>
          </div>
        ))}
      </div>
    )
}
export default Delete_Property;