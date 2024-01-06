import { useState } from 'react'
import { BsTrash3 } from 'react-icons/bs'

type AddCardItemType = {
    index: number,
    term: string,
    definition: string,
    setTerm: Function,
    setDefinition: Function,
    deleteCard: Function
}

const AddCardItem = ({ index, term, definition, setTerm, setDefinition, deleteCard }: AddCardItemType) => {
  return (
    <div className='add-card-item'>
        <div className='add-card-item-header'>
            <h2>{ index + 1 }</h2>    
            <BsTrash3 onClick={() => deleteCard(index)} />
        </div>   
        <div className='add-card-content'>
            <div className='term'>
                <textarea value={term} onChange={(e) => setTerm(index, e.target.value)} />
                <p>Term</p>
            </div>
            <div className='definition'>
                <textarea value={definition} onChange={(e) => setDefinition(index, e.target.value)} />
                <p>Definition</p>
            </div>
        </div> 
    </div>
  )
}

export default AddCardItem