import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importer useNavigate

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();  // Initialisation de useNavigate

    const handleLogin = (e) => {
        e.preventDefault();

        setError('');
        setMessage('');

        fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Échec de la connexion. Vérifiez vos identifiants.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Réponse du serveur:', data);
            setMessage('Connexion réussie !');
            navigate('/');  // Rediriger vers la page d'accueil ou une autre page
        })
        .catch(error => {
            console.error('Erreur lors de la connexion:', error);
            setError(error.message);
        });
    };

    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Nom d'utilisateur:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Connexion</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
    );
}

export default Login;
