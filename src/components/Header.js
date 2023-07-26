import React, { useEffect, useState } from 'react'
import { useOktaAuth } from '@okta/okta-react'
import { Link } from 'react-router-dom/cjs/react-router-dom';

export default function Header() {
    const [header, setHeader] = useState('')
    const { authState, oktaAuth } = useOktaAuth();
    const login = async () => oktaAuth.signInWithRedirect({ originalUri: '/dashboard' });

    useEffect(() => {
        return setHeader(window.location.pathname.replace('/', ''))
    }, [])
    const handleLogout = async () => {
        try {
            localStorage.removeItem('persist:root')
            return await oktaAuth.signOut();
        } catch (error) {
            // Handle the error
            console.log('Logout error:', error);
        }
    };
    return (
        <div style={{ display: "flex", gap: "1rem", background: "#6dccbf", padding: "1.5rem ", justifyContent: 'space-between', alignItems: "center" }}>

            <a href="/dashboard" style={{ textDecoration: "none", color: "#e9fffc", fontSize: '1.2rem' }}>{header.toUpperCase()}</a>
            <div style={{ height: '2rem', display: 'flex', alignItems: 'center', gap: "2rem", justifyContent: 'flex-end', }} >
                <a href="/" style={{ textDecoration: "none", color: "white", fontSize: '1rem' }}>Home</a>
                <a href="/locked" style={{ textDecoration: "none", color: "white", fontSize: '1rem' }}>
                    locked
                </a>

                <a href="/dashboard" style={{ textDecoration: "none", color: "white", fontSize: '1rem' }}>Dashboard</a>
                {
                    authState.isAuthenticated ?
                        <button id="login-button" type="button" onClick={handleLogout} style={{ padding: '.4rem 1rem', color: "#6dccbf", border: 'none', backgroundColor: "#e9fffc", borderRadius: '.4rem' }}>Logout</button> :
                        <button id="login-button" type="button" onClick={login} style={{ padding: '.4rem 1rem', color: "#6dccbf", border: 'none', backgroundColor: "#e9fffc", borderRadius: '.4rem' }}>Login</button>
                        
                    }
                    <Link to='/login'>ff</Link>
            </div>
        </div>
    )
}
