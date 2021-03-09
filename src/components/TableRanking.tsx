import { displayTableData } from "../components/TableData";

import styles from "../styles/components/TableRanking.module.css";

export function TableRanking() {
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
                    {displayTableData()}
                </tbody>
            </table>

        </div>
    );
}