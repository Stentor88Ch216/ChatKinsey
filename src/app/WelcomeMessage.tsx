import About from "./about/AboutModal";


export default function WelcomeMessage() {
    return(
        <div className="bubble" id="assistant" key="bienvenue">
            <p className="message-text">
                <span>
                    Bonjour, je suis une intelligence artificielle conçue pour vous aider à vous entraîner aux études de cas.
                    <span> <About /></span>
                </span>
            </p>
            <p className="message-text">Êtes-vous prêt.e à commencer ?</p>
        </div>
    );
}