import styles from "../styles/components/Profile.module.css";

export function Profile() {
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/leoguitar2006.png" alt="Marcos Leonardo Martins" />
            <div>
                <strong>Marcos Leonardo Martins</strong>               
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level 1
                </p>
            </div>
        </div>
        
    );
}