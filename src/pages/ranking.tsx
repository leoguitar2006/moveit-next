import Head from "next/head";
import { GetServerSideProps } from "next";

import { TableRanking } from "../components/TableRanking";

import styles from "../styles/pages/Ranking.module.css";
import { ChallengesProvider } from "../contexts/ChallengesContext";
import { SideBar } from "../components/SideBar";

interface RankingProps {
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    accumulatedExperience: number,
    user: string
    userName: string
    totalXP: number  
  };

export default function Ranking(props: RankingProps) {
    return(
      <ChallengesProvider
          level={props.level}
          currentExperience={props.currentExperience}
          challengesCompleted={props.challengesCompleted}
          user={props.user}
          userName={props.userName}
          totalXP={props.totalXP}
          >
          <div>
            <SideBar/>
            <div className={styles.container}>
                <Head>
                    <title>Ranking | move.it</title>
                </Head>

                <div>
                    <h1>Ranking</h1>
                </div>
                
                <TableRanking/>
            </div>
          </div>
      </ChallengesProvider>
    );
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const { level, currentExperience, challengesCompleted, user, userName, totalXP } = ctx.req.cookies
  return {
    props: {
      level: Number(level ?? 1),
      currentExperience: Number(currentExperience ?? 0),
      challengesCompleted: Number(challengesCompleted ?? 0),
      user: user || null,
      userName: userName || null,
      totalXP: Number(totalXP ?? 0)
    }
  }
}