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
import { AiOutlineSearch } from 'react-icons/ai' 

type CreateType = {
    user: any
}

const create = ({ user } : CreateType) => {

    const [ query, setQuery ] = useState<string>('')

    const handleSearch = (e: any) => {
        if(e.key === 'Enter') {
            console.log('try and search for:', query)
            fetch(`/api/v1/decks/search?q=${query}`).then((res) => res.text()).then((data) => {
                console.log(data)
            })
        }
    }

    return (
    <div>
        <Header user={user} />
        <div id="search-wrapper">
            <div id="search">
                <div id="search-header">
                    <h1>Search</h1>
                </div>
                <div id="search-bar">
                    <input id="search-bar-input" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleSearch} placeholder='Search for a deck...' />
                    <button onClick={() => handleSearch({ key: 'Enter' })}><AiOutlineSearch /></button>
                </div> 
            </div>
        </div>
    </div>
    )
}

export default create