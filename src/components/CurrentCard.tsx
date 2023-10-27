import Card from '@/types/Card'
import { useState, useEffect} from 'react'

type CurrentCardType = {
    card: Card | undefined,
    flip: boolean,
    setFlip: Function
}

const CurrentCard = ({ card, flip, setFlip }: CurrentCardType) => {

  return (
    <div className="container">
        <div className={`card ${flip ? 'flipped' : ''}`} onClick={() => setFlip((p: boolean) => !p)}>
            <div className="front"><h1>{ card?.front }</h1></div>
            <div className="back">
              <h1>{ card?.back }</h1>
              <p>{ card?.subBack }</p>
            </div>
        </div>
    </div>
  )
}

export default CurrentCard