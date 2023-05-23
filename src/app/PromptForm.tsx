import { RefObject } from "react";

interface PromptFormProps {
    action: (formData: FormData) => Promise<void>;
    formRef: RefObject<HTMLFormElement>;
}

export default function PromptForm(props: PromptFormProps) {
    return(
        <form action={props.action} className="prompt" ref={props.formRef}>
            <textarea placeholder="Votre message..." name="textfield" className="textfield"></textarea>
            <button className="send-button">Envoyer</button>
        </form>
    );
}