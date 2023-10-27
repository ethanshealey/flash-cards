import Header from '@/components/Header'
import React from 'react'
import Link from 'next/link';

type RegisterType = {
    user: any
}

const register = ({ user }: RegisterType) => {
  return (
    <>
        <Header user={user} />
        <div id="login-wrapper">
            <div id="login">
                <h3>Register</h3>
                <fieldset>
                    <label>Email</label>
                    <input placeholder='Email' type='email' />
                </fieldset>
                <fieldset>
                    <label>Password</label>
                    <input placeholder='Password' type='password' />
                </fieldset>
                <fieldset>
                    <label>Confirm Password</label>
                    <input placeholder='Confirm Password' type='password' />
                </fieldset>
                <fieldset>
                    <button>Register</button>
                    <p>Have an account?<br /><Link href="/login">Log In!</Link></p>
                </fieldset>
            </div>
        </div>
    </>
  )
}

export default register