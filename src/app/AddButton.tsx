"use client";

import serverAction from "./ServerFunctions";

interface AddButtonProps {
    func: (text: string) => void;
}

export default function AddButton(props: AddButtonProps) {

    async function buttonAction() {
        const joke = await serverAction();
        props.func(joke);
    }

    return (
        <form action={buttonAction}>
            <button>Add message</button>
        </form>
    );
}