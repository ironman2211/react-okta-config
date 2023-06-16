import React, { useEffect, useState } from 'react'
import { useOktaAuth } from '@okta/okta-react'
import { useSelector } from 'react-redux';
import Header from '../components/Header.js';
import { Triangle } from 'react-loader-spinner'
import { selectUser } from '../app/User/UserSlice.js';
export default function Home() {
    const { authState, oktaAuth } = useOktaAuth();


    const [user, setUser] = useState({});

    const handleLogout = async () => {
        try {
            return await oktaAuth.signOut();
        } catch (error) {
            // Handle the error
            console.log('Logout error:', error);
        }
    };
    const userInfoSS = useSelector(selectUser);
    userInfoSS.name !== '' && console.log(userInfoSS)


    if (!authState) {
        return (
            <div style={{ height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: '2rem' }}>
                <Triangle
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="triangle-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />
                <p>
                    loading User Info
                </p>
            </div>
        );
    }

    return (
        <div>
            <Header></Header>
            {
                authState.isAuthenticated ? <div style={{ padding: '1rem' }}>
                    <p style={{color:'#246a73'}}>
                        <b style={{color:'#246a73'}}>

                        Welcome 
                        </b>
                        <br/>
                        {userInfoSS.name}
                        <br/>
                        {userInfoSS.email}
                    </p>

                    <h1 style={{ margin: "1rem 0" }}> You are Authenticated...🎉</h1>
                    <button id="login-button" type="button" onClick={handleLogout} style={{ padding: '.4rem 1rem', color: "#e9fffc", border: 'none', backgroundColor: "#5eddbf", borderRadius: '.4rem' }}>Logout</button>
                </div> :
                    <div style={{ padding: '1rem' }}>

                        <h1 style={{ margin: "1rem 0" }} > Please Login to Continue</h1>

                        <p>
                            You are not Authenticated 🔏
                        </p>
                        {/* <button id="login-button" type="button" onClick={login} style={{ padding: '.4rem 1rem', color: "#e9fffc", border: 'none', backgroundColor: "#5eddbf", borderRadius: '.4rem' }}>Login</button>  */}


                    </div>

            }
        </div>
    )



}

// const login = async () => oktaAuth.signInWithRedirect({ originalUri: '/dashboard' });