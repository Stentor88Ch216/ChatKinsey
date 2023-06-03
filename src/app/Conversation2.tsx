'use client';
import { useState, useRef, useEffect } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { sendPrompts } from "./OpenaiFunctions";
import WelcomeMessage from "./WelcomeMessage";
import PromptForm2 from "./PromptForm2";
import Bubble from "./Bubble";
import Image from "next/image";
import logo from "./images/ChatKinseyLogoHD.png";
import { Interface } from "readline";


let initialConversation: ChatCompletionRequestMessage[] = [];


interface ConversationProps {
    playAnimation: boolean;
    setPlayAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function Conversation2(props: ConversationProps) {

    const [conversation, setConversation] = useState(initialConversation);
    const [textField, setTextField] = useState("");
    const [gptText, setGptText] = useState("");

    async function generateGpt() {
        setGptText("");

        const response = await fetch("/api/openai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          
          body: JSON.stringify({
            "prompt": conversation,
          }),
        })
    
        if (!response.ok) {
            console.log("❌ Error : "+response.statusText);
            throw new Error(response.statusText);
        }
    
        const data = response.body;
        if (!data) {
          return;
        }
        const reader = data.getReader();
        const decoder = new TextDecoder();
        let done = false;
    
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          const chunkValue = decoder.decode(value);
          setGptText((prev) => prev + chunkValue);
        }
    };


    const messagesEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        messagesEndRef.current?.scrollTo({
            top: messagesEndRef.current?.scrollHeight,
            behavior: "smooth",
        });
        if (conversation.length > 0 && conversation[conversation.length - 1].role === "user") {
            generateGpt();
        }
    }, [conversation]);

    
    async function sendMessage() {
        if (textField !== "" && textField !== undefined) {
            const newUserMessage: ChatCompletionRequestMessage = {role: "user", content: textField};
            setConversation(prev => [...prev, newUserMessage]);
        }
    }

    useEffect(() => {
        if (conversation.length > 0 && conversation[conversation.length - 1].role === "assistant") {
          setConversation(prev => {
            let newConv = [...prev];
            newConv[newConv.length - 1].content = gptText;
            return newConv;
          });
        } else if (gptText !== "") {
          const newGPTMessage: ChatCompletionRequestMessage = {role: "assistant", content: gptText};
          setConversation(prev => [...prev, newGPTMessage]);
          props.setPlayAnimation(true);
        }
      }, [gptText]);
    

    return (
        <div className="chat-container">
            <div className="conversation" ref={messagesEndRef}>
                <Image src={logo} alt="logo" className="welcome-logo"></Image>
                <WelcomeMessage/>
                {conversation.map((m, i) => <Bubble message={m} index={i} key={i.toString()+m.content[0]}/>)}
            </div>

            <PromptForm2 submitAction={sendMessage} textField={textField} setTextField={setTextField}/>

        </div>
    );
}