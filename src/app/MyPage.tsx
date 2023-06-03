"use client";
import { useState } from "react";
import Conversation2 from "./Conversation2";
import Lines from "./lines";
import Image from "next/image";
import logo from "./images/ChatKinseyLogoHD.png";

export default function MyPage() {

  const [play, setPlay] = useState(false)

  return (
    <div>
      {/*<Lines playButton={play} setPlayButton={setPlay}/>*/}
      {/*<Conversation playAnimation={play} setPlayAnimation={setPlay}/>*/}
      


      <div className="app-container">
          <Lines playButton={play} setPlayButton={setPlay}/>
          <div className="sidebar">
            <Image src={logo} alt="logo" className="logo"></Image>
          </div>
          <div className="main-content"><Conversation2 playAnimation={play} setPlayAnimation={setPlay}/></div>
      </div>



    </div>
  );
}