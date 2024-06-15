import React, { useState, useEffect, useRef } from "react";

function StopWatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);
    const [lapTimes, setLapTimes] = useState([]);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [isRunning]);

    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop() {
        setIsRunning(false);
    }

    function reset() {
        setIsRunning(false);
        setElapsedTime(0);
        setLapTimes([]);
    }

    function lap() {
        setLapTimes([...lapTimes, formatTime(elapsedTime)]);
    }

    function padNumber(num, size) {
        let s = "0000" + num;
        return s.substr(s.length - size);
    }

    function formatTime(time) {
        let hours = padNumber(Math.floor(time / (1000 * 60 * 60)), 2);
        let minutes = padNumber(Math.floor((time / (1000 * 60)) % 60), 2);
        let seconds = padNumber(Math.floor((time / 1000) % 60), 2);
        let milliSeconds = padNumber(Math.floor((time % 1000) / 10), 2);

        return `${hours}:${minutes}:${seconds}:${milliSeconds}`;
    }

    return (
        <div className="stopwatch">
            <div className="display">
                {formatTime(elapsedTime)}
                <br />
                <div className="controls">
                    <button onClick={start} className="start-button">Start</button>
                    <button onClick={stop} className="stop-button">Stop</button>
                    <button onClick={reset} className="reset-button">Reset</button>
                    <button onClick={lap} className="lap-button">Lap</button>
                </div>
            </div>
            <div className="lap-times">
                {lapTimes.map((lapTime, index) => (
                    <div key={index}>Lap {index + 1}: {lapTime}</div>
                ))}
            </div>
        </div>
    );
}

export default StopWatch;
