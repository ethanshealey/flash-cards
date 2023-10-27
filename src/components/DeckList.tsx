import Deck from '@/types/Deck'
import React from 'react'
import DeckListItem from './DeckListItem'
import AddDeckSkeleton from './AddDeckSkeleton'

type DeckListType = {
  decks: Deck[],
  haveAddButton?: boolean
}

const DeckList = ({ decks, haveAddButton }: DeckListType) => {
  return (
    <div className="deck-list">
      {
        decks.map((deck: Deck) => (
          <DeckListItem key={`deck-${deck.id}`} deck={deck} />
        ))
      }
      {
        haveAddButton && <AddDeckSkeleton />
      }
    </div>
  )
}

export default DeckList