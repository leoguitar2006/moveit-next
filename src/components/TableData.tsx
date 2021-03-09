import { ChallengesProvider } from "../contexts/ChallengesContext";
import { ProfileRanking } from "./ProfileRanking";
import _ from "underscore";

interface TableDataProps {
    position: number,
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    user: string,
    userName: string,
    totalXP: number
}

interface TableData {
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    user: string,
    userName: string,
    totalXP: number
}

export function displayTableData(){
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

    let lines = [];

    listRankingOrder.forEach((item: TableData, index) => {
        lines.push(<TableData key={index}
                        position={index+1}
                        level={item.level}
                        challengesCompleted={item.challengesCompleted}
                        currentExperience={item.currentExperience}
                        user={item.user}
                        userName={item.userName}
                        totalXP={item.totalXP}/>);
    });

    return lines;
};

export function TableData(props: TableDataProps) {
    return (
        <tr>
            <td>
                {props.position}
            </td>
            <td>
                <ProfileRanking
                    level={props.level}
                    user={props.user}
                    userName={props.userName}/>
            </td>                       
            <td>
                <span>{props.challengesCompleted}</span> Completados
            </td>
            <td>
                <span>{props.totalXP}</span> XP
            </td>
        </tr>          
    );
}