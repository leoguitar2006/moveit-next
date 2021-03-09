
import styles from "../styles/components/Profile.module.css";

interface ProfileProps {
    level: number,
    user: string,
    userName: string
};

export function ProfileRanking(props: ProfileProps) {    
    const urlPhoto = props.user != "" ? `https://github.com/${props.user}.png` : "/img/user.png";   
    return(
        <div className={styles.profileContainer}>
            <img src={urlPhoto} alt={props.user} />
            <div>
                <strong>{props.userName != null ? props.userName : props.userName}</strong>               
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {props.level}
                </p>
            </div>
        </div>
        
    );
}