import Header from '@/components/Header'
import { useState, useEffect } from 'react'
import Link from 'next/link';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import Spinner from '@/components/Spinner';
import { useRouter } from 'next/navigation';

type RegisterType = {
    user: any
}

const register = ({ user }: RegisterType) => {

    const { push } = useRouter();
    const [ username, setUsername ] = useState<string>('')
    const [ usernameTaken, setUsernameTaken ] = useState<boolean>(false)
    const [ usernameTakenIsLoading, setUsernameTakenIsLoading ] = useState<boolean>(false)
    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const [ confPassword, setConfPassword ] = useState<string>('')
    const [ isValid, setIsValid ] = useState<boolean>(false)
    let timeout: any

    const onRegister = () => {
        if(isValid) {
            console.log('create account')
            createUserWithEmailAndPassword(auth, email, password).then((u: any) => {
                fetch('/api/v1/users/initialize', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        u: { ...u, username: username }
                    })
                }).then((res) => res.json()).then((data) => {
                    push('/')
                })
            })
        }
        else {
            console.log('aint no way dawg')
        }
    }

    useEffect(() => {
        clearTimeout(timeout)
        if(username.length) {
            setUsernameTakenIsLoading(true)
            timeout = setTimeout(() => {
                fetch(`/api/v1/validate/username?u=${username}`).then((res) => res.json()).then((data) => {
                    console.log(data)
                    if(!data.valid) setUsernameTaken(true)
                    else setUsernameTaken(false)
                    setUsernameTakenIsLoading(false)
                })
            }, 1000)
        }
        return () => clearTimeout(timeout)
    }, [username])

    useEffect(() => {
        setIsValid((username && !usernameTaken && email && password && (password === confPassword)) ? true : false)
    }, [username, usernameTaken, email, password, confPassword])

    return (
        <>
            <Header user={user} />
            <div id="login-wrapper">
                <div id="login">
                    <h3>Register</h3>
                    <fieldset>
                        <label>Username</label>
                        <input placeholder='Username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                        <span className={`username-status ${usernameTakenIsLoading ? '' : usernameTaken ? 'user-taken' : 'user-available'}`}>{ usernameTakenIsLoading ? <Spinner width={'15px'} /> : `Username is ${ usernameTaken ? 'taken' : 'available' }`}</span>
                    </fieldset>
                    <fieldset>
                        <label>Email</label>
                        <input placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </fieldset>
                    <fieldset>
                        <label>Password</label>
                        <input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </fieldset>
                    <fieldset>
                        <label>Confirm Password</label>
                        <input placeholder='Confirm Password' type='password' value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                    </fieldset>
                    <fieldset>
                        <button onClick={onRegister} disabled={!isValid}>Register</button>
                        <p>Have an account?<br /><Link href="/login">Log In!</Link></p>
                    </fieldset>
                </div>
            </div>
        </>
    )
}

export default register