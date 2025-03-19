
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../../components/login/Login.comp'
import { ResetPassword } from '../../components/password_reset/Password_reset.comp';
import { SignupForm } from '../../components/signup/signup.comp';
import { SERVER_URL } from "../../utils/config";
// import { login, signup } from '../../utils/auth';
import './entry.style.css'
export const Entry = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [website, setWebsite] = useState("")
    const [agree, setAgree] = useState(false)
    const [formState, setFormState] = useState('login');
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const {name, value} = e.target;

        if(name === 'email'){
            setEmail(value);
        }
        if(name === 'password'){
            setPassword(value);
        }
        if(name === 'website'){
            setWebsite(value)
            console.log(website)
        }
        if(name === 'agree'){
            setAgree(e.target.checked)
            console.log(agree)
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        
        if (formState === 'signup') {
            if(!email || !password || !website || !agree) {
                alert("Fill up all the form !!!")
                return
            }
            const user = {
                email: email,
                password: password,
                website: website
            }
            axios.post(`${SERVER_URL}/v1/user`, user).then((res) => {
                if (res.data.status === 'success') {
                    setFormState('login')
                } else {
                    alert(res.data.message)
                    console.log("message", res.data.message)
                }
            })
            
        } else if (formState === 'login') {
            if(!email || !password) {
                alert("Fill up all the form !!!")
            }
            const user = {
                email: email,
                password: password,
            }
            axios.post(`${SERVER_URL}/v1/user/login`, user).then((res) =>{
                if (res.data.status === 'success') {
                    localStorage.clear()
                    localStorage.setItem("access-token", res.data.accessJWT)
                    localStorage.setItem("refresh-token", res.data.refreshJWT)
                    localStorage.setItem("email", user.email)
                    navigate('/dashboard')
                } else {
                    console.log('message', res.data.message)
                }
            })
        }
    }

    const handleOnResetSubmit = (e) => {
        e.preventDefault();
        if(!email) {
            alert("Please enter the email")
        }
        console.log(email)
    }
    const formSwitcher = (formState) => {
        setFormState(formState);
    }

    return (
        <div className="entry-page bg-info" style={{backgroundImage: "url(/image/bg.jpg)"}}>

            <div className='jumbotron'>
                {
                formState === 'login' && 
                    <LoginForm 
                        handleOnChange = {handleOnChange}
                        handleOnSubmit = {handleOnSubmit}
                        formSwitcher = {formSwitcher}
                        email = {email}
                        pass = {password}
                        agree = {agree}
                    />
                }
                {
                formState === 'reset' && 
                    <ResetPassword 
                        handleOnChange = {handleOnChange}
                        handleOnResetSubmit = {handleOnResetSubmit}
                        formSwitcher = {formSwitcher}
                        email = {email}
                        pass = {password}
                    />
                }
                {
                    formState === 'signup' && 
                    <SignupForm
                        handleOnChange = {handleOnChange}
                        handleOnSubmit = {handleOnSubmit}
                        formSwitcher = {formSwitcher}
                        agree = {agree}
                        email = {email}
                        pass = {password}

                    />
                }
                
            </div>
        </div>
    )
}