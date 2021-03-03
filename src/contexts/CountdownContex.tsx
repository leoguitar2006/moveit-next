import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContexData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
};

interface CountdownContextProps {
    children: ReactNode;
};

export const CountdownContex = createContext({} as CountdownContexData);

let countdownTimeout: NodeJS.Timeout; //Tipagem forte devido ao Typescript

export function CountdownProvider ({children}: CountdownContextProps) {

    const { startNewChallenge } = useContext(ChallengesContext);

    const initialTime = 0.1 * 60;
    const [time, setTime] = useState(initialTime);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60; //Resto da Divisão

    function startCountdown() {
        setIsActive(true);
    };

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false); 
        setHasFinished(false); 
        setTime(initialTime);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {            
                                    setTime(time - 1);            
                                }, 1000);
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    return(
        <CountdownContex.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContex.Provider>
    );
}