import { useState, useEffect } from "react";

/*
export default function TestPage() {

    const [tex, setTex] = useState("test")

    useEffect(() => {
        gene();
    }, [])

    async function gene() {
        const response = await fetch("/api/myapi");
        const data = await response.text();
        setTex(data);
    }

    return (<p>{"BIO : " + tex}</p>)
}
*/


export default function TestPage() {

    const [tex, setTex] = useState("")

    useEffect(() => {
        generateBio();
    }, [])

    async function generateBio() {

        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          
          body: JSON.stringify({
            "prompt": "Bonjour, comment ça va ?",
          }),
        });
    
        if (!response.ok) {
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
          setTex((prev) => prev + chunkValue);
        }

      };

    return (<p>{"COMPLETION : " + tex}</p>)
}