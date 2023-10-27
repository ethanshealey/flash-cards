'use client'
import { auth, collection, db, getDocs, query, where } from '@/firebase'
import '@/styles/globals.scss'
import '@/styles/mobile.scss'
import { onAuthStateChanged } from 'firebase/auth'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function App({ Component, pageProps }: AppProps) {

  const pathname = usePathname()
  const { push } = useRouter();
  const [ isLoading, setIsLoading ] = useState(true)
  const [ user, setUser ] = useState<any>(undefined)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if(u) {
        const q = query(collection(db, "Users"), where("email", "==", u.email))
        getDocs(q).then((qs: any) => {
          const _u = qs.docs[0].data()
          setUser(_u)
          setIsLoading(false)
        })
      }
      else {
        setUser(undefined)
        setIsLoading(false)
      }
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if(!user && ["/create", "/profile"].includes(pathname)) {
      push('/')
    }
  }, [pathname])

  return (
    <>
      <Head>
          <title>Study | ethanshealey.com</title>
          <meta name="description" content="A flash card app for all your studying needs!" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      { isLoading ? <div>Loading...</div> : <Component {...pageProps} user={user} /> }
    </>
  )
}
