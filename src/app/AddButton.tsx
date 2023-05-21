//import { askGPT } from "./OpenaiFunctions";

interface AddButtonProps {
    func: (text: string) => void;
}

export default function AddButton(props: AddButtonProps) {

    async function buttonAction(formData: FormData) {
        //const textField = document.querySelector("#textfield") as HTMLInputElement;
        //const userInput = textField.value;
        //console.log("✅ Submit message : " + userInput);

        //props.func(userInput);
        //textField.value = "";

        //const gptAnswer = await askGPT(userInput);
        //props.func(gptAnswer);

        //"use server";
        const userInput = formData.get("name");
    }

    return (
        <form action={buttonAction}>
            <textarea placeholder="Votre message..." name="textfield"></textarea>
            <button>Add message</button>
        </form>
    );
}