import { useState, useEffect } from "react";
import DeckList from "@/components/DeckList";
import Header from "@/components/Header";
import Deck from "@/types/Deck";
import AddDeckSkeleton from "@/components/AddDeckSkeleton";

type HomeType = {
  user: any
}

export default function Home({ user }: HomeType) {

  const [ publicDecks, setPublicDecks ] = useState<Deck[]>([])
  const [ userDecks, setUserDecks ] = useState<Deck[]>([])

  useEffect(() => {
    fetch('/api/v1/decks/public').then((res) => res.json()).then((data) => {
      setPublicDecks((_: any) => [ ...data.decks ])
    })
  }, [])

  useEffect(() => {
    if(user) {
      fetch('/api/v1/decks/user-decks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: user?.email })
      }).then((res) => res.json()).then((data) => {
        setUserDecks((_: any) => [ ...data.decks ])
      })
    }
  }, [user])

  return (
    <div>
      <Header user={user} />
      <main id="welcome-billboard">
        <h1>Welcome { user ? 'back to your' : 'to your new' }<br />favorite place for<br /><span className='accent'>Flash Cards</span>!</h1>
        <img src="./study-2.svg" style={{ transform: 'rotateY(180deg)' }} />
      </main>
      <div id="curve" />
      <div id="content">
        {
          user && (
            <div id="user-decks">
              <h1>Your Decks</h1>
              <DeckList decks={userDecks} haveAddButton />
            </div>
          )
        }
        <div id="public-decks">
          <h1>Check out some Public Decks</h1>
          <DeckList decks={publicDecks} />
        </div>
      </div>
    </div>
  )
}
