"use client";
import { useEffect, useState } from "react";
import Conversation2 from "./Conversation2";
import Lines from "./lines";
import Image from "next/image";
import logo from "./images/ChatKinseyLogoHD.png";

export default function MyPage() {

  const [play, setPlay] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true)
    }
  }, [])

  return (
      <div className="app-container">

          {isClient ? <Lines playButton={play} setPlayButton={setPlay}/> : null}

          <div className="sidebar">
            <Image src={logo} alt="logo" className="logo"></Image>
          </div>
          <div className="main-content"><Conversation2 playAnimation={play} setPlayAnimation={setPlay}/></div>
      </div>
  );
}