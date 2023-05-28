import { RefObject } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import TextareaAutosize from 'react-textarea-autosize';

interface PromptFormProps {
    action: (formData: FormData) => Promise<void>;
    formRef: RefObject<HTMLFormElement>;
}

export default function PromptForm(props: PromptFormProps) {
    return(
        <div className="prompt-container">

            <form action={props.action} className="prompt" ref={props.formRef}>
                <TextareaAutosize
                    className="textfield"
                    placeholder="Votre message..."
                    name="textfield"
                    minRows={1}
                    maxRows={10}
                />
                <button className="send-button"><PaperPlaneIcon /></button>
            </form>

        </div>
        
    );
}