/*

"use server";

import { appendToConversation, sendPrompts } from "./OpenaiFunctions";
import { revalidatePath } from "next/cache";


export default async function sendMessage(formData: FormData) {

  const userMessage = formData.get("textfield")?.toString();
  if (userMessage) {
    await appendToConversation(conversation, userMessage, "user");
    const response = await sendPrompts(conversation);
    await appendToConversation(conversation, response, "assistant");
    revalidatePath("/");
  }
}
*/