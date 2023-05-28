import About from "./about/AboutModal";


export default function WelcomeMessage() {
    return(
        <div className="bubble" id="assistant" key="bienvenue">
            <p className="message-text">
                Bonjour, je suis une intelligence artificielle concue pour vous aider à vous entraîner aux études de cas.
                <p> </p><About />
            </p>
            <p className="message-text">Êtes-vous prêt.e à commencer ?</p>
        </div>
    );
}