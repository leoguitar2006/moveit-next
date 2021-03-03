import { createContext, ReactNode, useEffect, useState } from "react";
import { LevelUpModal } from "../components/LevelUpModal";


import axios from 'axios';
import Cookies from "js-cookie";
import challenges from "../../challenges.json";
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
    levelUp: () => void,
    startNewChallenge: () => void,
    activeChallenge: Challenge,
    resetChallenge: () => void,
    experienceToNextLevel: number,
    completeChallenge: () => void,
    closeModal: () => void,
    closeLogin: () => void,
    saveLoginUser: (user: string) => void,
    user: string,
    userName: string
};

export const ChallengesContext = createContext({} as ChallengesContextData);

interface ChallengesProviderProps {
    children: ReactNode
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    user: string
    userName: string 
};

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);

    const [user, setUser] = useState(rest.user ?? '')
    const [userName, setUserName] = useState(rest.userName ?? '')

    const [isLoginOpen, setIsLoginOpen] = useState(!!!rest.userName);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set("level", String(level));
        Cookies.set("currentExperience", String(currentExperience));
        Cookies.set("challengesCompleted", String(challengesCompleted));

    },[ level, currentExperience, challengesCompleted ]);

    useEffect(() => {
        user && Cookies.set('user', user)
        userName && Cookies.set('userName', userName)
      }, [user, userName])

    function levelUp() {
        setLevel(level + 1);
        setIsLevelModalOpen(true);
    };

    function closeModal() {
        setIsLevelModalOpen(false);
    };

    function closeLogin() {
        setIsLoginOpen(false);
    }

    function saveLoginUser(user: string) {
        if (user === null || user === "") {
            user = ""
        } else {
            axios.get(`https://api.github.com/users/${user}`).then((response) => {
                setUserName(response.data.name)
            })
        }
        setUser(user);
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
    };

    return (
    <ChallengesContext.Provider value={{
        level, 
        currentExperience, 
        challengesCompleted, 
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        closeModal,
        closeLogin,
        saveLoginUser, 
        user, 
        userName}}>

        {children}
        {isLevelModalOpen && <LevelUpModal />}
        {isLoginOpen && <LoginOverlay /> }
    </ChallengesContext.Provider>
    );
}