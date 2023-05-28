import * as Avatar from '@radix-ui/react-avatar';
import "./contentStyles.css";
import { TwitterLogoIcon, LinkedInLogoIcon, GitHubLogoIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons';


export default function Content() {
    return (

        <div className='about'>

            <div className='cv'>
                <Avatar.Root className="AvatarRoot">
                    <Avatar.Image
                        className="AvatarImage"
                        src="https://pbs.twimg.com/profile_images/1662912989316493312/OikmnLqo_400x400.jpg"
                        alt="Thomas Douche"
                    />
                </Avatar.Root>

                <div className="titre">
                    <p className='thomas'>Thomas D.</p>
                    <p className='ingenieur'>Ingénieur - Cybersécurité / Blockchain / IA</p>

                    <div className='reseaux'>
                        <a href="https://twitter.com/TomDch88" target="_blank" rel="noopener noreferrer">
                            <TwitterLogoIcon className='reseau'/>
                        </a>
                        <a href="https://www.linkedin.com/in/thomas-douche-ingenieur/" target="_blank" rel="noopener noreferrer">
                            <LinkedInLogoIcon className='reseau'/>
                        </a>
                        <a href="https://github.com/Stentor88Ch216" target="_blank" rel="noopener noreferrer">
                            <GitHubLogoIcon className='reseau'/>
                        </a>
                        <a href="mailto:decision-bohrium-09@icloud.com" target="_blank" rel="noopener noreferrer">
                            <EnvelopeClosedIcon className='reseau'/>
                        </a>
                    </div>
                </div>
            </div>

            <p className='info'>
                <p>Cette application est une preuve de concept. Elle n'est qu'un aperçu très superficiel des possibilités offertes par les intelligences artificielles génératives dans un parcours de recrutement.</p>
                <p>Ces technologies vont profondément transformer les entreprises en automatisant des tâches que l'on pensait jusque-là réservées aux humains.</p>
                <p>Rapidement, les gains en productivité seront tels qu'aucune entreprise, pour sa survie, ne pourra se permettre de l'ignorer.</p>
                <p>Cela nécessitera de repenser les métiers et les organisations, non sans difficultés.</p>
                <p>Accompagner les entreprises dans cette révolution sera l'un des défis les plus passionnants de ces prochaines décénnies.</p>
            </p>

        </div>

    )
}