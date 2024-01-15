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
import SearchResult from '@/components/SearchResult';
import Spinner from '@/components/Spinner';

type CreateType = {
    user: any
}

const create = ({ user } : CreateType) => {

    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ query, setQuery ] = useState<string>('')
    const [ results, setResults ] = useState<Deck[]>([])

    useEffect(() => {
        setIsLoading(true)
        fetch(`/api/v1/decks/all?email=${user?.email ?? ''}`).then((res) => res.json()).then((data) => {
            setResults(data.decks)
            setIsLoading(false)
        })
    }, [])

    const handleSearch = (e: any) => {
        if(e.key === 'Enter') {
            setIsLoading(true)
            console.log('try and search for:', query)
            fetch(`/api/v1/decks/search?q=${query}&email=${user.email}`).then((res) => res.json()).then((data) => {
                setResults(data.response)
                setIsLoading(false)
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
                {   !isLoading ? 
                    results.map((deck: Deck) => (
                        <SearchResult key={deck.id} deck={deck} />
                    )) : (
                        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignContent: "center" }}>
                            <Spinner width={'50px'} />
                        </div>
                    )
                }
            </div>
        </div>
    </div>
    )
}

export default create