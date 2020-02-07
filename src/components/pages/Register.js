import React, { useEffect, useState } from "react";
import axios from "axios";

const Register = props => {
    const [username, setUsername] = useState({});
    const [password, setPassword] = useState({});

    const handleChange = event => {
        switch (event.target.name) {
            case 'username':
                setUsername(event.target.value)
                break;

            case 'password':
                setPassword(event.target.value)
                break;
        
            default:
                break;
        }
    }

    const handleSubmit = event => {
        event.preventDefault();

        const user = {
            username: username,
            password: password,
        };

        axios.post(`http://battlecat.stark.mmi-unistra.fr/users`, user)
        .then(res => {
        })
    }

    return (
        <div>
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <ul>
                    <li>
                        <label>Identifiant : </label>
                        <input type="text" name="username" onChange={handleChange}></input>
                    </li>
                    <li>
                        <label>Mot de passe : </label>
                        <input type="password" name="password" onChange={handleChange}></input>
                    </li>
                    <button>S'inscrire</button>
                </ul>
            </form>
        </div>
    );
};


export default Register;