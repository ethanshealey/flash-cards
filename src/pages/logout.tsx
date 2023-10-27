'use client'
import { auth } from '@/firebase'
import { signOut } from 'firebase/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';

const logout = () => {

    const { push } = useRouter();

    useEffect(() => {
        signOut(auth)
        push('/')
    }, [])

    return (
        <></>
    )
}

export default logout