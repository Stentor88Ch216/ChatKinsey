"use server";

interface Joke {
    id: number;
    type: string;
    setup: string;
    punchline: string;
}

export default async function serverAction() {
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    const object: Joke = await response.json();
    const joke = object.setup + " " + object.punchline;
    console.log("🔌 Server action : " + joke);
    return joke;
}