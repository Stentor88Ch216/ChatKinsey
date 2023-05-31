'use client';
import { useState, useRef, useEffect } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { experimental_useOptimistic as useOptimistic } from "react";
import { sendPrompts } from "./OpenaiFunctions";
import WelcomeMessage from "./WelcomeMessage";
import PromptForm from "./PromptForm";
import Bubble from "./Bubble";
import Image from "next/image";
import logo from "./images/ChatKinseyLogoHD.png";

import TestPage from "./TestPage";
import TestPage2 from "./TestPage2";


let initialConversation: ChatCompletionRequestMessage[] = [];

/*
interface ConversationProps{
    playAnimation: boolean;
    setPlayAnimation: (value: boolean) => void;
}*/

export default function Conversation() {

    const [conversation, setConversation] = useState(initialConversation);
    function optimisticFunction(state: ChatCompletionRequestMessage[], newMessage: ChatCompletionRequestMessage) {
        return ([...state, newMessage]);
    }
    const [optimisticMessages, addOptimisticMessage] = useOptimistic(conversation, optimisticFunction);

    const formRef = useRef<HTMLFormElement>(null);
    
    // Scroll to bottom when new message
    const messagesEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        //props.setPlayAnimation(true);
        messagesEndRef.current?.scrollTo({
            top: messagesEndRef.current?.scrollHeight,
            behavior: "smooth",
          });
    }, [optimisticMessages]);

    
    async function sendMessage(formData: FormData) {
        const userMessage = formData.get("textfield")?.toString();
        formRef.current?.reset(); // Delete textfield content
        if (userMessage) {
            // TODO : put user message when onCLick button instead
            addOptimisticMessage({role: "user", content: userMessage});
            const newUserMessage: ChatCompletionRequestMessage = {role: "user", content: userMessage};
            setConversation(prev => [...prev, newUserMessage]);

            addOptimisticMessage({role: "assistant", content: "Chargement de la réponse..."});
            const response = await sendPrompts([...conversation, newUserMessage]);
            const newGptMessage: ChatCompletionRequestMessage = {role: "assistant", content: response};
            setConversation(prev => [...prev, newGptMessage]);
        }
    }
    

    return (
        <div className="chat-container">
            <div className="conversation" ref={messagesEndRef}>
                <Image src={logo} alt="logo" className="welcome-logo"></Image>
                <WelcomeMessage/>
                {optimisticMessages.map((m, i) => <Bubble message={m} index={i} key={i.toString()+m.content[0]}/>)}

                {/*<TestPage/>*/}
                <TestPage2/>

            </div>
            <PromptForm action={sendMessage} formRef={formRef}/>
        </div>
    );
}