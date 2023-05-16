'use client';

//import styles from './page.module.css'
// <main className={styles.main}></main>
import { useState, useEffect } from "react";
import AddButton from "./AddButton";


export default function Home() {

  const initialMessages = ["Hello", "My name is ChatKinsey", "I am here to help you."];
  const [messages, setMessages] = useState(initialMessages);
  const messageItems = messages.map( (message, index) => <div key={index.toString()+message[0]}>{message}</div>);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  function addItem(text: string) {
    console.log("🗄️ Ajout de : " + text);
    setMessages((prevMessages) => [...prevMessages, text]);
  }

  return (
    <>
      {messageItems}
      <AddButton func={addItem}/>
    </>
  )
}
