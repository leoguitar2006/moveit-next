import { useContext } from "react";
import Link from "next/link";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/SideBar.module.css";


export function SideBar() {   
    const { openLogin } = useContext(ChallengesContext);
    
    return (
        <div className={styles.sideBarContainer}>
            <img src="/img/logoSideBar.png" alt=""/>
            <div>
                <button type="button">
                    <Link href="/">
                        <a>
                            <img src="/img/homeIcon.png" alt=""/>
                        </a>
                    </Link>
                </button>
                <button type="button">
                    <Link href="/ranking">
                        <a>
                            <img src="/img/rankingIcon.png" alt=""/>
                        </a>
                    </Link>
                </button>
            </div>
                
            <div>
                <button type="button" onClick={openLogin}>   
                    <img src="/img/close.png" alt=""/>
                </button>    
            </div>
        </div>
    );
}