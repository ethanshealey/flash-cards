import DeckList from '@/components/DeckList'
import Header from '@/components/Header'
import Deck from '@/types/Deck'
import { useEffect, useState } from 'react'

type ProfileType = {
    user: any
}

const Profile = ({ user }: ProfileType) => {

  const [ decksCreated, setDecksCreated ] = useState<number>(0)
  const [ userDecks, setUserDecks ] = useState<Deck[]>([])

  useEffect(() => {
    fetch(`/api/v1/decks/count?email=${user.email}`).then((res) => res.json()).then((data) => {
      console.log(data)
      setDecksCreated(data.count)
    })
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
        <div id="profile-wrapper">
          <div id="profile">
            <div id="profile-header">
              <h1>Your Account</h1>
            </div>
            <div id="profile-content">
              <div id="username">
                <img src={user.picture} width="50px" />
                <h2>{ user.username }</h2>
              </div>
              <hr />
              <div id="details">
                <div id="email">
                  <h4>Email:</h4>
                  <h4>{ user.email }</h4>
                </div>
                <div id="stats">
                  <h4>Decks Created:</h4>
                  <h4>{ decksCreated }</h4>
                </div>
              </div>
            </div>
            <h2 style={{ marginLeft: '15px' }}>Your Decks</h2>
            <DeckList decks={userDecks} />
          </div>
        </div>
      </div>
  )
}

export default Profile