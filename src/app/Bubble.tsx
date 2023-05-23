import { ChatCompletionRequestMessage } from "openai";

interface BubbleProps {
    message: ChatCompletionRequestMessage;
    index: number;
}

export default function Bubble(props: BubbleProps){
    return (
        <div className="bubble" id={props.message.role} key={props.index.toString()+props.message.content[0]}>

            <p className="message-text">{props.message.content}</p>

        </div>
    );
}