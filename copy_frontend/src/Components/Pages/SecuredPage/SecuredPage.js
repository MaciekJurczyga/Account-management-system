import React, { useState } from 'react';
import fetchUserData from '../../Fun/FetchUserData/FetchUserData';
import sendMessageToUser from '../../Fun/Message/Message';
import './SecuredPage.css'; // Importowanie pliku CSS dla stylizacji
import LogoutButton from '../../Fun/LogOut/Handle_Log_Out'
import {useNavigate} from "react-router-dom";
import axios from "axios";

const SecuredPage = () => {
    const [responseData, setResponseData] = useState(null);
    const [showButton, setShowButton] = useState(true);
    const [message, setMessage] = useState('');
    const [messageSent, setMessageSent] = useState(false);
    const navigator = useNavigate();
    const handleGetData = async () => {
        try {
            const data = await fetchUserData();
            setResponseData(data);
            setShowButton(false);
        } catch (error) {
            if(error.response && error.response.status === 403){
                navigator("/");
                localStorage.removeItem("jwtToken");
                axios.defaults.headers.common['Authorization'] = null;
                alert('Token wygasł. Proszę zalogować się ponownie.');
            }
            else{
                console.log("wystąpił nieoczekiwany błąd")
            }
        }
    };


    const handleMessageSend = async () => {
        try {
            await sendMessageToUser(message);
            setMessageSent(true);
        } catch (error) {
            if(error.response && error.response.status === 403){
                navigator("/");
                localStorage.removeItem("jwtToken");
                axios.defaults.headers.common['Authorization'] = null;
                alert('Token wygasł. Proszę zalogować się ponownie.');
            }
            console.error("Wystąpił nieoczekiwany błąd");
        }
    };

    return (
        <div className="secured-page-container">
            <div className="log-out-button">
                <LogoutButton/>
            </div>
            <div className="centered-box">
                {showButton && (
                    <div>
                        <h2>Pobierz swój email</h2>
                        <button onClick={handleGetData}>Pobierz dane z serwera</button>
                    </div>
                )}

                {responseData && (
                    <div>
                        <h2>Otrzymane dane:</h2>
                        <pre>{JSON.stringify(responseData, null, 2)}</pre>
                    </div>
                )}

                {responseData && !messageSent && (
                    <div>
                        <h2>Wyślij wiadomość:</h2>
                        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                        <button onClick={handleMessageSend}>Wyślij wiadomość</button>
                    </div>
                )}

                {messageSent && (
                    <div>
                        <h2>Wiadomość została pomyślnie wysłana!</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SecuredPage;
