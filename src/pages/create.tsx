'use client'
import Header from '@/components/Header'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Card from '@/types/Card';
import AddCardItem from '@/components/AddCardItem';
import { decode } from '@/helpers/base64'
import Deck from '@/types/Deck';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import toast from 'react-hot-toast';

type CreateType = {
    user: any
}

const create = ({ user } : CreateType) => {

  const { push } = useRouter();
  const query = useSearchParams()

  const [ deckId, setDeckId ] = useState<string | null>(null)
  const [ isLoading, setIsLoading ] = useState<boolean>(true)
  const [ title, setTitle ] = useState<string>()
  const [ publicPrivate, setPublicPrivate ] = useState<boolean>(true)
  const [ cards, setCards ] = useState<Card[]>([
    { front: '', back: ''}
  ])

  useEffect(() => {
    if(!user) push('/')
    setIsLoading(false)
  }, [])

  useEffect(() => {
    const bDeck: string | null = query.get('deck')
    if(bDeck) {
      const editDeck: Deck = JSON.parse(decode(bDeck))
      console.log(editDeck)
      setCards((_: any) => editDeck.cards)
      setPublicPrivate(editDeck.public)
      setTitle(editDeck.title)
      setDeckId(editDeck.id)
    }
  }, [query])

  const deleteCard = (idx: number) => {
    console.log(`delete #${idx}`, cards)
    //const modifiedDeck: Card[] = [ ...cards ]
    setCards(p => [ ...p.filter((c: Card, i: number) => idx !== i) ])
  }

  const handleFrontChange = (idx: number, content: string) => {
    const tempCards: Card[] = [ ...cards ]
    tempCards[idx].front = content
    setCards((_: Card[]) => [ ...tempCards ])
  }

  const handleBackChange = (idx: number, content: string) => {
    const tempCards: Card[] = [ ...cards ]
    tempCards[idx].back = content
    setCards((_: Card[]) => [ ...tempCards ])
  }

  const createDeck = () => {
    if(deckId) {
      console.log('update deck ', deckId)
      const deckRef = doc(db, "Decks", deckId)
      updateDoc(deckRef, {
        cards: cards,
        title: title,
        public: publicPrivate
      }).then(() => {
        toast.success('Deck created!',
            {
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            })
        push(`deck?id=${deckId}`)
      })
    }
    else {
      fetch(`/api/v1/decks/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          visibility: publicPrivate,
          deck: cards,
          user: user
        })
      }).then(() => {
        push('/')
      })
    }
  }

  return isLoading || !user ? (<h1></h1>) : (
    <div>
      <Header user={user} />
      <div id="add-wrapper">
        <div id="add">
          <div id="add-header">
            <h1>Create a new Deck</h1>
            <div className='add-header-btns'>
              <div className="radio-inputs">
                <label className="radio">
                  <input type="radio" name="radio" checked={publicPrivate} onClick={() => setPublicPrivate(true)} />
                  <span className="name">Public</span>
                </label>
                <label className="radio">
                  <input type="radio" name="radio" checked={!publicPrivate} onClick={() => setPublicPrivate(false)} />
                  <span className="name">Private</span>
                </label>
              </div>
              <button onClick={createDeck}>{ deckId ? 'Update' : 'Create' }</button>
            </div>
          </div>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter a Title...' />
          {
            cards.map((card: Card, idx: number) => (
              <AddCardItem key={`card-${idx}`} index={idx} term={card.front} definition={card.back} setTerm={handleFrontChange} setDefinition={handleBackChange} deleteCard={deleteCard} />
            ))
          }
          <div className='add-card-btn' onClick={() => setCards((p: Card[]) => [ ...p, { front: '', back: '' } ])}>
            + Add Card
          </div>
        </div>
      </div>
    </div>
  )
}

export default create