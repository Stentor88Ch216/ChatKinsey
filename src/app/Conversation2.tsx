'use client';
import { useState, useRef, useEffect } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { sendPrompts } from "./OpenaiFunctions";
import WelcomeMessage from "./WelcomeMessage";
import PromptForm2 from "./PromptForm2";
import Bubble from "./Bubble";
import Image from "next/image";
import logo from "./images/ChatKinseyLogoHD.png";


let initialConversation: ChatCompletionRequestMessage[] = [];


export default function Conversation2() {

    const [conversation, setConversation] = useState(initialConversation);
    let prevConv = conversation;
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
            "prompt": "Bonjour, comment ça va ?",
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

    // - TODO : remove formRef and use a ref to the textarea
    //const formRef = useRef<HTMLFormElement>(null);

    // Scroll to bottom when new message
    const messagesEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        messagesEndRef.current?.scrollTo({
            top: messagesEndRef.current?.scrollHeight,
            behavior: "smooth",
          });
    }, [conversation]);

    
    async function sendMessage() {
        if (textField !== "" && textField !== undefined) {
            const newUserMessage: ChatCompletionRequestMessage = {role: "user", content: textField};
            setConversation(prev => [...prev, newUserMessage]);
            prevConv = conversation;

            generateGpt();
            //let newGPTMessage: ChatCompletionRequestMessage = {role: "assistant", content: gptText};
            //setConversation(prev => [...prev, newGPTMessage]);
        }
    }

    useEffect(() => {
        // Check if the last message in the conversation is from the assistant
        if (conversation.length > 0 && conversation[conversation.length - 1].role === "assistant") {
          // If it is, we'll update it with the new text
          setConversation(prev => {
            // First, make a copy of the current conversation
            let newConv = [...prev];
            // Next, update the content of the last message
            newConv[newConv.length - 1].content = gptText;
            // Finally, return the updated conversation
            return newConv;
          });
        } else {
          // If the last message isn't from the assistant, we'll add a new assistant message
          const newGPTMessage: ChatCompletionRequestMessage = {role: "assistant", content: gptText};
          setConversation(prev => [...prev, newGPTMessage]);
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