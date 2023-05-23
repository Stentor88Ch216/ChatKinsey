import { RefObject } from "react";

interface PromptFormProps {
    action: (formData: FormData) => Promise<void>;
    formRef: RefObject<HTMLFormElement>;
}

export default function PromptForm(props: PromptFormProps) {
    return(
        <div className="prompt-container">

            <form action={props.action} className="prompt" ref={props.formRef}>
                <textarea placeholder="Votre message..." name="textfield" className="textfield"></textarea>
                <button className="send-button">Envoyer</button>
            </form>

        </div>
        
    );
}