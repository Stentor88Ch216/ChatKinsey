'use client';

import { useState, useRef } from "react";
import { ChatCompletionRequestMessage } from "openai";
import { experimental_useOptimistic as useOptimistic } from "react";
import { sendPrompts } from "./OpenaiFunctions";


let initialConversation: ChatCompletionRequestMessage[] = [
    {role: "user", content: "Réponds à ma question en commençant ta phrase par `Il était une fois`."},
];

export default function Conversation() {

    const [conversation, setConversation] = useState(initialConversation);

    function optimisticFunction(state: ChatCompletionRequestMessage[], newMessage: ChatCompletionRequestMessage) {
        //const optimisiticUserMessage: ChatCompletionRequestMessage = {role: "user", content: newMessage};
        return ([...state, newMessage]);
    }
    const [optimisticMessages, addOptimisticMessage] = useOptimistic(conversation, optimisticFunction);
    const textFieldRef = useRef<HTMLTextAreaElement>(null);

    async function sendMessage(formData: FormData) {
        const userMessage = formData.get("textfield")?.toString();

        //if (textFieldRef.current) {
        //    textFieldRef.current.innerText = "testtt";
        //}
        

        if (userMessage) {
            addOptimisticMessage({role: "user", content: userMessage});
            const newUserMessage: ChatCompletionRequestMessage = {role: "user", content: userMessage};
            setConversation(prev => [...prev, newUserMessage]);

            addOptimisticMessage({role: "assistant", content: "Thinking..."});
            const response = await sendPrompts([...conversation, newUserMessage]);
            const newGptMessage: ChatCompletionRequestMessage = {role: "assistant", content: response};
            setConversation(prev => [...prev, newGptMessage]);
        }
    }


    return (
        <div>

            <div className="conversation">
                {optimisticMessages.map((message, index) =>
                    <div className="bubble" id={message.role} key={index.toString()+message.content[0]}>
                        {message.content}
                    </div>
                )}
            </div>

            <form action={sendMessage} className="prompt">
                <textarea placeholder="Votre message..." name="textfield" ref={textFieldRef} className="textfield"></textarea>
                <button className="send-button">Envoyer</button>
            </form>
        </div>
        
    );
}