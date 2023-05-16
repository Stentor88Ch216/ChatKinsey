'use client';

import { useState } from "react";
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from "openai";
import { experimental_useOptimistic as useOptimistic } from "react";
import { sendPrompts } from "./OpenaiFunctions";


let initialConversation: ChatCompletionRequestMessage[] = [
    {role: "user", content: "Réponds à ma question en commençant ta phrase par `Il était une fois`."},
];

export default function Conversation() {

    const [conversation, setConversation] = useState(initialConversation);

    function optimisticFunction(state: ChatCompletionRequestMessage[], newMessage: string) {
        const optimisiticUserMessage: ChatCompletionRequestMessage = {role: "user", content: newMessage};
        return ([...state, optimisiticUserMessage]);
    }
    const [optimisticMessages, addOptimisticMessage] = useOptimistic(conversation, optimisticFunction);


    async function sendMessage(formData: FormData) {
        const userMessage = formData.get("textfield")?.toString();
        if (userMessage) {
            addOptimisticMessage(userMessage);
            const newUserMessage: ChatCompletionRequestMessage = {role: "user", content: userMessage};
            setConversation(prev => [...prev, newUserMessage]);

            addOptimisticMessage("GPT message...");
            const response = await sendPrompts([...conversation, newUserMessage]);
            const newGptMessage: ChatCompletionRequestMessage = {role: "assistant", content: response};
            setConversation(prev => [...prev, newGptMessage]);
        }
    }


    return (
        <div>

            {optimisticMessages.map((message, index) => <div key={index.toString()+message.content[0]}>{message.content}</div>)}
            
            <form action={sendMessage}>
                <textarea placeholder="Votre message..." name="textfield"></textarea>
                <button>Your message...</button>
            </form>

        </div>
        
    );
}