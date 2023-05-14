"use client";

import serverAction from "./ServerFunctions";
import getHello from "./OpenaiFunctions";

interface AddButtonProps {
    func: (text: string) => void;
}

export default function AddButton(props: AddButtonProps) {

    async function buttonAction() {
        //const joke = await serverAction();
        const gptMessage = await getHello();
        props.func(gptMessage);
    }

    return (
        <form action={buttonAction}>
            <button>Add message</button>
        </form>
    );
}