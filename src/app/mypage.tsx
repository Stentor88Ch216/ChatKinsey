"use client";
import { useState } from "react";
import Conversation from "./conversation";
import Lines from "./lines";

export default function MyPage() {

  const [play, setPlay] = useState(false);

  return (
    <div>
      <Lines playButton={play} setPlayButton={setPlay}/>
      <Conversation playAnimation={play} setPlayAnimation={setPlay}/>
    </div>
  );
}