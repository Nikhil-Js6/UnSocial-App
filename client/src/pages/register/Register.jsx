import React, {useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import "./register.css";
import axios from 'axios';

function Register() {

    const [visible, setVisible] = useState(true);
    const [type, setType] = useState("password");
    const [error, setError] = useState(false);
    const history = useHistory();

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const repeatPassword = useRef();

    async function handleSubmit(e) {
        e.preventDefault();
        if(repeatPassword.current.value !== password.current.value){
            setError(true);
        }else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                await axios.post("/auth/register", user);
                history.push("/login");
            }catch(err) {
                console.log(err);
            }
        }
    }


    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <div>
                        <h4 className="registerLogo">Unsocial</h4>
                        <span className="registerDesc">Connect with people around you with UnSocial.</span>
                    </div>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleSubmit}>
                        <input placeholder="Username"
                               className="registerInput"
                               required
                               ref={username}
                        />
                        <input type="email"
                               placeholder="Email"
                               className="registerInput"
                               required
                               minLength="4"
                               ref={email}
                        />
                        <span className="inputWrapper">
                           <input
                               type={type}
                               placeholder="Password"
                               className="registerInput"
                               required
                               minLength="6"
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
                        <span className="inputWrapper">
                           <input
                               type={type}
                               placeholder="Repeat Password"
                               className="registerInput"
                               required
                               minLength="6"
                               ref={repeatPassword}
                           />
                           { visible
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
                                <p className="authError">Passwords don't match!</p>
                            )
                        }
                        <button type="submit" className="registerButton">Sign Up</button>
                        <Link className="loginLink" to="/login">
                        <button className="createButton">
                            Log into Account
                        </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;
