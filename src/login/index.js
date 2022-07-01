import { useState } from 'react';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [jwt, setJwt] = useState("", "jwt");
    const [errorMsg, setErrorMsg] = useState(null);

    function sendLoginRequest() {
        const reqBody = {
            username: username,
            password: password,
        };
        

        fetch("http://localhost:9191/auth-service/v1/login", {
            headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            method: "post",
            body: JSON.stringify(reqBody),
        })
            .then((response) => {
                return response.json()
                    .then((json) => {
                        if (response.status === 200)
                            return Promise.all([json, response.headers])
                        return Promise.reject(json);
                    })
            })
            .then(([body, headers]) => {
                setJwt(headers.get("authorization"));
            }).catch(err => {
                console.log(err);
                alert(err.message);
            });
    }
    return (
        <div className="main-container">
            <div className="container">
                <div className="header">
                    <span>
                        <div className="header-mg">Sign In</div>
                    </span>
                </div>
                <div className="login-form">
                    <div className="clearfix textbox-mg textbox">
                        <input type="text" id="email" name="email" placeholder="Email or Username"  className="textbox-font textbox-border textbox-align inputtext" value={username} onChange={(event) => setUsername(event.target.value)}></input>
                    </div>
                    <div className="clearfix textbox-mg textbox">
                        <input type="password" id="password" name="password" placeholder="Password"  className="textbox-font textbox-border textbox-align inputtext" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                    </div>
                    <div className="login-button-mg button-mg">
                        <button id="loginbutton" name="login" type="button" className="login-button button-align" onClick={() => sendLoginRequest()}>Login</button>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Login;