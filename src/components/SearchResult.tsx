import Deck from '@/types/Deck'
import Link from 'next/link'
import React from 'react'

type SearchResultType = {
  deck: Deck
}

const SearchResult = ({ deck }: SearchResultType) => {
  return (
    <Link href={`/deck?id=${deck.id}`} className="result-list-item">
      <h2>{ deck?.title }</h2>
      <p className='terms'>{deck?.cards?.length} term{ deck?.cards?.length !== 1 ? 's' : '' }</p>
      <div className='created-by'>
        <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${deck.createdByEmail}`} alt="profile picture" />
        <p className='created-by-name'>{ deck?.createdBy }</p>
        <p className={`visibility-${deck.public}`}><div className={`visibility-icon-${deck.public}`} />{ deck?.public ? 'Public' : 'Private' }</p>
      </div>
    </Link>
  )
}

export default SearchResult