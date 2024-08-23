// src/App.js
import React, { useState } from 'react';
import MentorSelection from './components/MentorSelection';
import Scheduler from './components/Scheduler';
import Payment from './components/Payment';

const App = () => {
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [isScheduled, setIsScheduled] = useState(false);

    const studentId = 1; // Example student ID

    const handleScheduleSuccess = () => {
        setIsScheduled(true);
    };

    const handlePaymentSuccess = () => {
        alert('Payment Successful! Session scheduled.');
        setIsScheduled(false);
        setSelectedMentor(null);
    };

    return (
        <div className="App">
            <h1>1x1 Mentor Scheduler</h1>
            {!selectedMentor ? (
                <MentorSelection onSelectMentor={setSelectedMentor} />
            ) : !isScheduled ? (
                <Scheduler
                    mentor={selectedMentor}
                    studentId={studentId}
                    onScheduleSuccess={handleScheduleSuccess}
                />
            ) : (
                <Payment
                    studentId={studentId}
                    duration={30} // Example duration
                    preferredMentor={true} // Example preference
                    onPaymentSuccess={handlePaymentSuccess}
                />
            )}
        </div>
    );
};

export default App;
