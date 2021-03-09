import { createContext, ReactNode } from "react";
import _ from "underscore";
import { ChallengesProvider } from "../contexts/ChallengesContext";
import { Profile } from "../components/ProfileRanking";

interface RankingContextData {
    myTableDataHtml: string;
}

interface RankingContextProps {
    children: ReactNode;
}

interface dataRanking {
    user: string,
    userName: string,
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    totalXP: number
};

export const RankingContex = createContext({} as RankingContextData);

export function TableDataProvider({children}: RankingContextProps) {

    const myTableDataHtml = () => {
        let tableDataHtml = "";
    
        function tableData() {
            let listRanking = [];
            let numberUsers = localStorage.length;
            let listRankingOrder = [];

            for (let i = 0; i < numberUsers ; i++) {
                let key = localStorage.key(i);
                if (key != "ally-supports-cache") {
                let value = localStorage.getItem(key);

                listRanking.push(JSON.parse(value));

                listRankingOrder = _.sortBy(listRanking, "totalXP");               
                }                          
            };

            listRankingOrder = listRankingOrder.reverse();

            listRankingOrder.forEach((item: dataRanking, index) => {
                let line = "";
                line = `
                <tr>
                <td>${index + 1}</td>
                <td>${
                    <ChallengesProvider
                        level={item.level}
                        currentExperience={item.currentExperience}
                        challengesCompleted={item.challengesCompleted}
                        user={item.user}
                        userName={item.userName}
                        totalXP={item.totalXP}
                        >
                        <Profile/>
                    </ChallengesProvider>
                }
                </td>
                <td>
                    <span>${item.challengesCompleted}</span>  Completados
                </td>
                <td>
                    <span>${item.totalXP}</span> XP
                </td>
            </tr>
                `;

            tableDataHtml = tableDataHtml + line;
            })

            return tableDataHtml;
    }

    return (
        <RankingContex.Provider value={{
            myTableDataHtml
        }}
        >
        {children}
    </RankingContex.Provider>)
}