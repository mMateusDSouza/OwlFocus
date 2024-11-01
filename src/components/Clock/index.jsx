import React, { useState, useEffect } from 'react';
import './Clock.css';
import som from '../../assets/som.mp3';

const Clock = () => {
    const [timeLeft, setTimeLeft] = useState(1500); 
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    useEffect(() => {
        let timer = null;
        if (isActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);

            const audio = new Audio(som);
            audio.play();

            if (isBreak) {
                setIsBreak(false);
                setTimeLeft(1500); 
            } else {
                setIsBreak(true);
                setTimeLeft(300); 
            }
        }

        return () => clearInterval(timer);
    }, [isActive, timeLeft, isBreak]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const startShortBreak = () => {
        setIsActive(false);
        setIsBreak(true);
        setTimeLeft(300); 
    };

    const startLongBreak = () => {
        setIsActive(false);
        setIsBreak(true);
        setTimeLeft(900); 
    };

    const resetPomodoro = () => {
        setIsActive(false);
        setIsBreak(false);
        setTimeLeft(1500); 
    };

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', fontSize: '2rem' }}>
                <div className='rectangle'>
                    <div className='clock'>{minutes < 10 ? `0${minutes}` : minutes}</div>
                </div>
                <div id='colon'>
                    <div className='circle'></div>
                    <div className='circle'></div>
                </div>
                <div className='rectangle'>
                    <div className='clock'>{seconds < 10 ? `0${seconds}` : seconds}</div>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className='btns'>
                    <button className='btn' style={{backgroundColor: '#0bd904'}} onClick={toggleTimer}>{isActive ? 'Pause' : 'Play'}</button>
                    <button className='btn' style={{backgroundColor: '#04c4d9'}} onClick={resetPomodoro}>Pomodoro</button>
                    <button className='btn' style={{backgroundColor: '#df50f2'}} onClick={startShortBreak}>Descanso Curto</button>
                    <button className='btn' style={{backgroundColor: '#d90452'}} onClick={startLongBreak}>Descanso Longo</button>
                </div>
            </div>
        </div>
    );
};

export default Clock;
