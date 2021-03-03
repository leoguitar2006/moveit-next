import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";

import styles from "../styles/components/Profile.module.css";



export function Profile() {
    const { level, user, userName } = useContext(ChallengesContext);

    
    const urlPhoto = user != "" ? `https://github.com/${user}.png` : "/img/user.png";
    

    return(
        <div className={styles.profileContainer}>
            <img src={urlPhoto} alt={user} />
            <div>
                <strong>{userName != null ? userName : user}</strong>               
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
        
    );
}