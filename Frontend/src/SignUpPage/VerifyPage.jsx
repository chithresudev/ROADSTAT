import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import './verifyPage.css'; // Import the CSS file

const VerifyEmailPage = () => {
    const { verifyEmail, message, currentEmail } = useAuth();
    const [verificationCode, setVerificationCode] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            verifyEmail(currentEmail, verificationCode);
            setIsSubmitted(true);
        }
        catch(error){
            // console.error('Error verifying email:', error);
            setIsSubmitted(false);
        }
    };

    return (
        <div className='verify-email-main-container'>
        <div className="verify-email-container">
            <h2>Verify Your Email</h2>
            <form onSubmit={handleSubmit} className="verify-email-form">
                <label htmlFor="verificationCode">Verification Code:</label>
                <input
                    type="text"
                    id="verificationCode"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                />
                <button type="submit">Verify</button>
                {isSubmitted && <p className="verify-email-text">{message.text}</p>}
            </form>
        </div>
        </div>
    );
};

export default VerifyEmailPage;
