'use client'
import DeckHeader from '@/components/DeckHeader'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import Deck from '@/types/Deck'
import CurrentCard from '@/components/CurrentCard';
import sleep from '@/helpers/sleep';
import { VscDebugRestart } from 'react-icons/vsc'
import { BsPencilFill } from 'react-icons/bs'
import { useRouter } from 'next/navigation';
import { encode } from '@/helpers/base64'

type DeckItemType = {
    user: any
}

const DeckItem = ({ user }: DeckItemType) => {

    const { push } = useRouter();
    const params = useSearchParams()
    const [ isOwner, setIsOwner ] = useState<boolean>(false)
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ deck, setDeck ] = useState<Deck | undefined>(undefined)
    const [ error, setError ] = useState<string>('')
    const [ cardIndex, setCardIndex ] = useState<number>(0)
    const [ flip, setFlip ] = useState<boolean>(false)

    useEffect(() => {
        if(params) {
            setIsLoading(true)
            fetch(`/api/v1/decks/${params.get('id')}?user=${user?.email}`).then((res) => res.json()).then((data) => {
                if(data.deck) data!.deck!.cards = data?.deck?.cards?.sort(() => Math.random() - 0.5)
                setDeck(data.deck)

                if(data?.error) 
                    setError(data.error)

                if(user) {
                    console.log(user.email, data.deck?.createdByEmail)
                    if(user.email === data.deck?.createdByEmail) {
                        setIsOwner(true)
                    }
                }

                setIsLoading(false)
            })
        }
    }, [params, user])

    const edit = () => {
        //const bDeck: string = encode(JSON.stringify(deck))
        push(`/create?deck=${params.get('id')}`)
    }

    const getCurrentCard = () => deck ? deck?.cards[cardIndex] : undefined 
    const restart = () => setCardIndex(0)
    const goPrev = async () => {
        if(flip) {
            setFlip(false)
            await sleep(100)
        }
        setCardIndex(c => c - 1)
    }
    const goNext = async () => {
        if(flip) {
            setFlip(false)
            await sleep(100)
        }
        setCardIndex(c => c + 1)
    }

    return (
        <div>
            <DeckHeader user={user} title={deck?.title} />
            <div id="card-stack-wrapper">
                { isLoading ? <></> : <CurrentCard card={getCurrentCard()} flip={flip} setFlip={setFlip} /> }
                <div className='progress'>
                    <progress value={cardIndex + 1} max={deck?.cards.length} />
                </div>
                <div className='controls'>
                    { isOwner && <button className='restart' onClick={edit}><BsPencilFill /></button> }
                    <button className='restart' onClick={restart} disabled={cardIndex === 0}><VscDebugRestart /></button>
                    <button className='prev' onClick={goPrev} disabled={cardIndex === 0}>Previous</button>
                    <button className='next' onClick={goNext} disabled={cardIndex + 1 === deck?.cards.length}>Next</button>
                </div>
            </div>
        </div>
    )
}

export default DeckItem