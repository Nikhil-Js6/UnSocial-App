import "./login.css";
import React, { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AuthContext } from '../../context/authContext';
import { loginCall } from '../../apiCalls';
import { CircularProgress } from '@mui/material';

function Login() {

    const [visible, setVisible] = useState(true);
    const [type, setType] = useState("password");

    const email = useRef();
    const password = useRef();

    const { isFetching, error, dispatch } = useContext(AuthContext);

    const handleSubmit = (e) => {
       e.preventDefault();
       loginCall(
           { 
             email: email.current.value,
             password: password.current.value 
           },
           dispatch
        );
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <div>
                        <h4 className="loginLogo">Unsocial</h4>
                        <span className="loginDesc">Connect with people around you with UnSocial.</span>
                    </div>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                            <input type="email"
                                required
                                placeholder="Email"
                                className="loginInput"
                                ref={email}
                                />
                            <span className="inputWrapper">
                            <input type={type}
                                placeholder="Password"
                                required
                                minLength ="6"
                                className="loginInput"
                                ref={password}
                            />
                            {visible
                                ? <VisibilityOff className="visibiltyIcon"
                                        onClick={()=>{
                                        setType("text");
                                        setVisible(!visible);
                                        }}
                                    />
                                : <Visibility className="visibiltyIcon"
                                        onClick={()=>{
                                        setType("password");
                                        setVisible(!visible);
                                        }}
                                    />
                            }
                            </span>
                            {
                               error && (
                                  <p className="authError">Wrong username or password!</p>
                               )
                            }
                            <button className="loginButton" type="submit" disabled={isFetching}>
                                { isFetching
                                    ? <CircularProgress color="inherit" size="22px" thickness="5"/>
                                    : "Log in" 
                                }
                            </button>
                        <span className="loginForget">
                            <hr />
                            Forgot Password?
                            <hr />
                        </span>
                        <Link className="registerLink" to="/register">
                        <button className="createButton">
                            Create a new Account.
                        </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
