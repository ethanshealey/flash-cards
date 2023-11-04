'use client'
import { auth } from '@/firebase'
import { signOut } from 'firebase/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const logout = () => {

    const { push } = useRouter();

    useEffect(() => {
        toast.success('Logged out',
            {
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            })
        signOut(auth)
        push('/')
    }, [])

    return (
        <></>
    )
}

export default logout