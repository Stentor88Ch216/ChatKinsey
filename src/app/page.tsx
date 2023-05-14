'use client';

//import styles from './page.module.css'
// <main className={styles.main}></main>
import { useState } from "react";
import AddButton from "./AddButton";


export default function Home() {

  const initialMessages = ["Hello", "My name is ChatKinsey", "I am here to help you."];
  const [messages, setMessages] = useState(initialMessages);
  const messageItems = messages.map( (message, index) => <div key={index}>{message}</div>);

  function addItem(text: string) {
    setMessages([...messages, text]);
  }

  return (
    <>
      {messageItems}
      <AddButton func={addItem}/>
    </>
  )
}
