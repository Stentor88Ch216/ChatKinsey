import { useState, useEffect } from "react";


export default function TestPage2() {

    const [tex, setTex] = useState("")

    useEffect(() => {
        generateBio();
    }, [])

    async function generateBio() {

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
          setTex((prev) => prev + chunkValue);
        }

      };

    return (<p>{tex}</p>)
}