import { revalidatePath } from "next/cache";
import { experimental_useOptimistic as useOptimistic } from "react";
import { appendToConversation, sendPrompts } from "./OpenaiFunctions";
import { ChatCompletionRequestMessage } from "openai";


let conversation: ChatCompletionRequestMessage[] = [
  {role: "user", content: "Réponds à ma question en commençant ta phrase par `Il était une fois`."},
];

export default async function Home() {

  function optimisticFunction(state: ChatCompletionRequestMessage[], newMessage: string) {
    const optimisiticUserMessage: ChatCompletionRequestMessage = {role: "user", content: newMessage};
    return [...state, optimisiticUserMessage];
  }
  //const optimisiticUserMessage: ChatCompletionRequestMessage = {role:"user", content:"Hello"};
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(conversation, optimisticFunction);


  async function addMessage(formData: FormData) {
    "use server";
  
    const userMessage = formData.get("textfield")?.toString();
    if (userMessage) {

      addOptimisticMessage("Message en cours...");

      await appendToConversation(conversation, userMessage, "user");
      const response = await sendPrompts(conversation);
      await appendToConversation(conversation, response, "assistant");
      revalidatePath("/");
    }
  }


  return (
    <form action={addMessage}>
      {optimisticMessages.map((message, index) => <div key={index.toString()+message.content[0]}>{message.content}</div>)}
      <textarea placeholder="Votre message..." name="textfield"></textarea>
      <button>Add message</button>
    </form>
  )
}
