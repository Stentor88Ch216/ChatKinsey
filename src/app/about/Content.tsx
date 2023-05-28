import * as Avatar from '@radix-ui/react-avatar';
import "./contentStyles.css";
import { TwitterLogoIcon, LinkedInLogoIcon, GitHubLogoIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons';


export default function Content() {
    return (

        <div>

            <div className='cv'>
                <Avatar.Root className="AvatarRoot">
                    <Avatar.Image
                        className="AvatarImage"
                        src="https://pbs.twimg.com/profile_images/1662891844508831744/IMYwJBpN_400x400.jpg"
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

            

            <p>Cette application est une preuve de concept développée sur mon temps libre et pour mon propre usage.</p>

        </div>

    )
}