import { useContext } from "react";
import { Profile } from "../components/Profile";
import { ChallengesContext } from "../contexts/ChallengesContext";

import styles from "../styles/components/TableRanking.module.css";

export function TableRanking() {
    const { challengesCompleted, totalXP } = useContext(ChallengesContext);    

    return(        
        <div className={styles.tableRankingContainer}>
            <table id={styles.dataTable}>
                <thead>
                    <tr>
                        <td>
                            POSIÇÃO
                        </td>
                        <td>
                            <span>USUÁRIO</span>
                        </td>                       
                        <td>
                            <span>DESAFIOS</span>
                        </td>
                        <td>
                            <span>EXPERIÊNCIA</span>
                        </td>
                    </tr>                                       
                </thead>
                <tbody>
                    <tr>
                        <td>15</td>
                        <td>
                            <Profile/>
                        </td>
                        <td>
                            <span>{challengesCompleted}</span>  Completados
                        </td>
                        <td>
                            <span>{totalXP}</span> XP
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>
    );
}