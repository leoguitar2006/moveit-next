import styles from "../styles/components/SideBar.module.css";

export function SideBar() {

    return (
        <div className={styles.sideBarContainer}>
            <img src="/img/logoSideBar.png" alt=""/>
            <div>
                <button>
                    <a href="/">
                        <img src="/img/homeIcon.png" alt=""/>
                    </a>
                </button>
                <button>
                    <a href="/ranking">
                        <img src="/img/rankingIcon.png" alt=""/>
                    </a>
                </button>
            </div>

            <div>
                
            </div>
        </div>
    );
}