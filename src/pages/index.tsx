import Head from "next/head";
import { GetServerSideProps } from "next";


import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";


import { CountdownProvider } from "../contexts/CountdownContex";
import { ChallengesProvider } from "../contexts/ChallengesContext";

import styles from "../styles/pages/Home.module.css";
import { SideBar } from "../components/SideBar";


interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
  user: string
  userName: string  
  totalXP: number
};

export default function Home(props: HomeProps) { 
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
      user={props.user}
      userName={props.userName} 
      totalXP={props.totalXP}    
      > 
      <div>
        <SideBar />
        <div className={styles.container}>
          <Head>
            <title>Início | move.it </title>
          </Head>
         
          <ExperienceBar/>

          <CountdownProvider>
            <section>
              <div>               
                <Profile/>
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox/>
              </div>
            </section>
          </CountdownProvider>
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
