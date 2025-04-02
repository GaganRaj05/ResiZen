import Navbar from "../components/navBar"
import "../assets/styles/home.css";
import { useState } from "react";
import Lands from "../components/lands";
import Content from "../components/content";
function Home() {
    const [contentType,setContentType] = useState("Houses");

    return(
        <div>
            <Navbar setContent = {(type)=>setContentType(type)}/>
            {contentType==="Houses" && <Content/>}
            {contentType==="Lands" && <Lands/>}
        </div>
    )
}
export default Home;