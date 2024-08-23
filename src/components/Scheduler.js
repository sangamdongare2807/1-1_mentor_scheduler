// src/components/Scheduler.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Scheduler = () => {
    const [mentors, setMentors] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [duration, setDuration] = useState(30);
    const [startTime, setStartTime] = useState('');

    useEffect(() => {
        // Fetch available mentors based on area of interest
        axios.get('/api/mentors?areaOfInterest=Web Development')
            .then(response => setMentors(response.data));
    }, []);

    const handleSchedule = () => {
        axios.post('/api/schedule', {
            studentId: 1, // Example studentId
            mentorId: selectedMentor.id,
            startTime,
            duration
        }).then(response => {
            console.log('Scheduled successfully:', response.data);
        });
    };

    return (
        <div>
            <h2>Select a Mentor</h2>
            <select onChange={e => setSelectedMentor(mentors.find(m => m.id === parseInt(e.target.value)))}>
                {mentors.map(mentor => (
                    <option key={mentor.id} value={mentor.id}>
                        {mentor.name}
                    </option>
                ))}
            </select>

            <h2>Select Duration</h2>
            <select onChange={e => setDuration(parseInt(e.target.value))}>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
            </select>

            <h2>Select Start Time</h2>
            <input type="datetime-local" onChange={e => setStartTime(e.target.value)} />

            <button onClick={handleSchedule}>Schedule</button>
        </div>
    );
};

export default Scheduler;
