"use server";

import dotenv from 'dotenv';
dotenv.config();

import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY});
const openai = new OpenAIApi(configuration);


let prePrompt: ChatCompletionRequestMessage[] = [
    {role: "user", content: "Tu es un consultant McKinsey sénior. Tu me fais passer un entretiens d'embauche. Tu me fais passer une étude de cas. Tu vas me donner la problématique de l'étude de cas et je vais devoir y répondre, d'abord en posant quelques questions pour éclaircir la situation (si nécessaire), puis en proposant une structure puis en déroulant ma réflexion. Tu me guides dans l'exercice, sans me donner directement les réponses. À la fin, tu me fais un débrief sur ce qui était bien et ce qui doit être amélioré."},
    {role: "assistant", content: "Ok, c'est parti. Il est temps de passer à l'étude de cas. Êtes-vous prêt ?"}
];


export async function sendPrompts(conversation: ChatCompletionRequestMessage[]): Promise<string> {

    const fullConv = prePrompt.concat(conversation);

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: fullConv,
    });
    const response = completion.data.choices[0].message?.content;
    return response ?? "❌ Error";
}


/*
let conversation: ChatCompletionRequestMessage[] = [
    {role: "user", content: "Réponds à ma question en commençant ta phrase par `Il était une fois`."},
];

export async function getConversation() {
    return conversation;
}



export async function askGPT(text: string): Promise<string> {
    console.log("Asking : " + text);
    appendToConversation(text, "user");
    const response = await sendPrompts(conversation);
    appendToConversation(response, "assistant");
    console.log("Asnswering : " + response);
    return response;
}


export async function getHello() {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: conversation,
    });
    const response = completion.data.choices[0].message?.content;
    console.log("🤖 GPT server action : " + response ?? "rien");
    return response ?? "❌ Error";
}


export async function updateConversation(conversation: ChatCompletionRequestMessage[], text: string, role: role) {
    const message: ChatCompletionRequestMessage = {
        role: role,
        content: text,
    }
    console.log(conversation);
    return [...conversation, message];
}





export async function startConversation(): Promise<string> {
    conversation = mcPrePrompt;
    const response = await sendPrompts(conversation);
    appendToConversation(response, "assistant");
    return response;
}
*/

