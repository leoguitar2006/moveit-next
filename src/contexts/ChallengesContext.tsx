import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';
import _ from "underscore";
import challenges from "../../challenges.json";

import { LevelUpModal } from "../components/LevelUpModal";
import { LoginOverlay } from "../components/LoginOverlay";



interface Challenge {
    type: "body" | "eye",  //Como se fosse um enum
    description: String,
    amount: Number
}


interface ChallengesContextData {
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    experienceToNextLevel: number,
    activeChallenge: Challenge,
    user: string,
    userName: string,    
    levelUp: () => void,
    startNewChallenge: () => void,   
    resetChallenge: () => void,
    completeChallenge: () => void,
    closeModal: () => void,
    closeLogin: () => void,
    saveLoginUser: (user: string) => void,    
    openLogin: () => void,
    totalXP: number,
    displayRanking: () => void
};

export const ChallengesContext = createContext({} as ChallengesContextData);

interface ChallengesProviderProps {
    children: ReactNode
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    user: string
    userName: string,
    totalXP: number
};

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps) {
    
    const [isLoginOpen, setIsLoginOpen] = useState(!!!rest.userName);      

    const [level, setLevel] = useState(rest.level || 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience || 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted || 0);
    const [totalXP, setTotalXP] = useState(rest.totalXP || 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);

    const [user, setUser] = useState(rest.user || null)
    const [userName, setUserName] = useState(rest.userName || rest.user) 

    let experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => { 
        if (currentExperience > 0) {
            localStorage.setItem(user, JSON.stringify({ user: user, 
                                                        userName: userName, 
                                                        level: level, 
                                                        currentExperience: currentExperience, 
                                                        challengesCompleted: challengesCompleted, 
                                                        totalXP: totalXP })); }; 
                                                        
            Cookies.set('user', String(user));
            Cookies.set('userName', String(userName));
            Cookies.set('level', String(level));
            Cookies.set('currentExperience', String(currentExperience));
            Cookies.set('challengesCompleted', String(challengesCompleted))               ;
            Cookies.set('totalXP', String(totalXP));

    },[ level, currentExperience, challengesCompleted, totalXP]);

    useEffect(() => {
        if (user != "" && user != null && user != undefined) {
            localStorage.setItem(user, JSON.stringify({user, userName, level, currentExperience, challengesCompleted, totalXP}));                

            Cookies.set('user', String(user));
            Cookies.set('userName', String(userName));
            Cookies.set('level', String(level));
            Cookies.set('currentExperience', String(currentExperience));
            Cookies.set('challengesCompleted', String(challengesCompleted));
            Cookies.set('totalXP', String(totalXP)); 
        }
    },[ userName ])


    function levelUp() {
        setLevel(level + 1);
        setIsLevelModalOpen(true);
    };

    function closeModal() {
        setIsLevelModalOpen(false);
    };

    function openLogin() {
        setIsLoginOpen(true);
    };

    function closeLogin() {
        setIsLoginOpen(false);
    }

    function saveLoginUser(user: string) {
        
        if (user === null || user === "") {
            setUser("");
        } else { 
            setUser(user);

            axios.get(`https://api.github.com/users/${user}`).then((response) => {                
                setUserName(response.data.name || user);                
            })
        }
        
        
        setIsLoginOpen(false);

        const userData = JSON.parse(localStorage.getItem(user));

        if (userData != null) { 
            setLevel(Number(userData.level));
            setChallengesCompleted(Number(userData.challengesCompleted));
            experienceToNextLevel = (Math.pow((Number(userData.level) + 1) * 4, 2));
            setCurrentExperience(Number(userData.currentExperience));
            setTotalXP(Number(userData.totalXP));
         } else {
            console.log(level) ;
            setLevel(1);
            setChallengesCompleted(0);
            setCurrentExperience(0);
            setTotalXP(0);

            localStorage.setItem(user, JSON.stringify({user, userName, level, currentExperience, challengesCompleted, totalXP}));                
         };

        Cookies.set('user', String(user));
        Cookies.set('userName', String(userName));
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
        Cookies.set('totalXP', String(totalXP));    
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio("/notification.mp3").play();

        if (Notification.permission === "granted") {
            new Notification("Novo desafio 🎉", {
                body: `Valendo ${challenge.amount} XP !`
            })
        }
    };

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return; //retorno vazio
        }

        const { amount } = activeChallenge; // pega o amount do activeChallenge

        let finalExperience = currentExperience + amount;
        

        if (finalExperience >=experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();            
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1); 
        setTotalXP(totalXP + amount)       ;
    };

    function displayRanking() {
        
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
         console.log(listRankingOrder);
        
    };

    return (
    <ChallengesContext.Provider value={{
        level, 
        currentExperience, 
        challengesCompleted, 
        experienceToNextLevel,
        activeChallenge,
        user, 
        userName, 
        levelUp,
        startNewChallenge,      
        resetChallenge,
        completeChallenge,
        closeModal,
        closeLogin,
        saveLoginUser, 
        openLogin,
        totalXP,
        displayRanking
    }}>

        {children}
        {isLevelModalOpen && <LevelUpModal />}
        {isLoginOpen && <LoginOverlay /> }
    </ChallengesContext.Provider>
    );
}