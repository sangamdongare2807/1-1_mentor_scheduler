// src/components/MentorSelection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MentorSelection = ({ onSelectMentor }) => {
    const [mentors, setMentors] = useState([]);
    const [areaOfInterest, setAreaOfInterest] = useState('Web Development');

    useEffect(() => {
        // Fetch mentors based on area of interest
        axios.get(`/api/mentors?areaOfInterest=${areaOfInterest}`)
            .then(response => setMentors(response.data))
            .catch(error => console.error('Error fetching mentors:', error));
    }, [areaOfInterest]);

    return (
        <div>
            <h2>Select an Area of Interest</h2>
            <select value={areaOfInterest} onChange={e => setAreaOfInterest(e.target.value)}>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Machine Learning">Machine Learning</option>
            </select>

            <h2>Select a Mentor</h2>
            <select onChange={e => onSelectMentor(mentors.find(m => m.id === parseInt(e.target.value)))}>
                {mentors.map(mentor => (
                    <option key={mentor.id} value={mentor.id}>
                        {mentor.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default MentorSelection;
