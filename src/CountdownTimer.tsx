import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box, CircularProgress } from '@mui/material';

// import beepSound from './../src/beep.mp3'; // Replace with your beep sound file path

const CountdownTimer: React.FC = () => {
    const [minutes, setMinutes] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);


    useEffect(() => {
        const beepAudio = new Audio('/beep.mp3');
        const playBeep = () => {
            beepAudio.play();
        };
        let interval: NodeJS.Timeout | undefined;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            if (isActive) {
                playBeep();
            }
            setIsActive(false);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isActive, timeLeft]);


    const handleStart = () => {
        setTimeLeft(minutes * 60);
        setIsActive(true);
    };

    const handlePause = () => {
        setIsActive(false);
    };

    const handleReset = () => {
        setIsActive(false);
        setTimeLeft(0);
        setMinutes(0);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        event.target.select();
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const calculateProgress = () => {
        if (minutes === 0) return 0;
        return ((minutes * 60 - timeLeft) / (minutes * 60)) * 100;
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
            <Typography variant="h4">Tony Timer</Typography>
            <Box mt={3}>
                <TextField
                    type="number"
                    label="Minutes"
                    value={minutes}
                    onChange={(e) => setMinutes(Number(e.target.value))}
                    onFocus={handleFocus}
                    disabled={isActive}
                    margin="normal"
                />
            </Box>
            <Box mt={3}>
                <Button variant="contained" color="primary" onClick={handleStart} disabled={isActive}>
                    Start
                </Button>
                <Button variant="contained" color="secondary" onClick={handlePause} disabled={!isActive}>
                    Pause
                </Button>
                <Button variant="contained" onClick={handleReset}>
                    Reset
                </Button>
            </Box>
            <Box mt={3} position="relative" display="inline-flex">
                <CircularProgress variant="determinate" thickness={22} value={100} style={{ color: 'red', position: 'absolute' }} size={300} />
                <CircularProgress variant="determinate" thickness={22} value={calculateProgress()} style={{ color: 'white' }} size={300} />
            </Box>
            <Typography variant="h5" mt={3}>{formatTime(timeLeft)}</Typography>
        </Box>
    );
};

export default CountdownTimer;
