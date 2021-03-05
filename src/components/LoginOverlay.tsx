import { useContext, useState } from "react";
import Router from "next/router";

import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/LoginOverlay.module.css";

export function LoginOverlay() {

    const { closeLogin, saveLoginUser } = useContext(ChallengesContext);
    const [user, setUser] = useState('');

    function handleLoginButton() {        
        closeLogin();
        saveLoginUser(user);        
        Router.push("/");
      }
    
      function setLogin(user: string) {
        setUser(user);
      }

    return (
        <div className={styles.loginOverlay}>
            <div>
                <img src="/img/logo-moveit.png" alt=""/>
            </div>
            <div>
                <img src="/img/logo-moveit-2.png" alt=""/>
                <strong>Bem-vindo</strong>
                <div className={styles.githubLogin}>
                    <img src="/img/github-logo.png"/>
                    <p>Faça login com seu GitHub para iniciar</p>
                </div>
                <div className={styles.githubLoginButton}>
                    <input  type="text" 
                            placeholder="Digite seu usuário" 
                            className={styles.inputLogin}
                            onChange={event => setLogin(event.target.value)}/>
                    <button type="button" 
                            className={styles.buttonLogin}
                            onClick={handleLoginButton}
                            >
                        <img src="/img/loginIcon.png" alt=""/>
                    </button>
                </div>
            </div>
        </div>
    );
}