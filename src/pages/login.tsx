'use client'
import Header from '@/components/Header'
import { useState } from 'react'
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type LoginType = {
    user: any
}

const login = ({ user }: LoginType) => {

    const { push } = useRouter();

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const onLogin = () => {
        signInWithEmailAndPassword(auth, email, password).then((res) => {
            toast.success('Logged in',
            {
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            })
            push('/')
        }).catch(e => {
            toast.error(e.message,
            {
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            })
            console.log(e.message)
        })
    }

    return (
        <>
            <Header user={user} />
            <div id="login-wrapper">
                <div id="login">
                    <h3>Login</h3>
                    <fieldset>
                        <label>Email</label>
                        <input placeholder='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </fieldset>
                    <fieldset>
                        <label>Password</label>
                        <input placeholder='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </fieldset>
                    <fieldset>
                        <button onClick={onLogin}>Log In</button>
                        <p>Don't have an account?<br /><Link href="/register">Make one now!</Link></p>
                    </fieldset>
                </div>
            </div>
        </>
    )
}

export default login