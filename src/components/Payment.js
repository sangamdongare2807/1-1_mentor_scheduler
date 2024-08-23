// src/components/Payment.js
import React, {useEffect, useState } from 'react';
import axios from 'axios';

const Payment = ({ studentId, duration, preferredMentor }) => {
    const [amount, setAmount] = useState(2000);

    useEffect(() => {
        const baseAmount = duration === 30 ? 2000 : duration === 45 ? 3000 : 4000;
        const finalAmount = preferredMentor ? baseAmount + 1000 : baseAmount;
        setAmount(finalAmount);
    }, [duration, preferredMentor]);

    const handlePayment = () => {
        axios.post('/api/payment', {
            studentId,
            amount,
            duration,
            preferredMentor
        }).then(response => {
            console.log('Payment successful:', response.data);
        });
    };

    return (
        <div>
            <h2>Payment</h2>
            <p>Amount: {amount}</p>
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default Payment;
