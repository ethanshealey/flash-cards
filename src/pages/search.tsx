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

    const [ query, setQuery ] = useState<string>('')

    return (
        <div>
        <Header user={user} />
        <div id="add-wrapper">
            <div id="add">
            <div id="add-header">
                <h1>Search</h1>
            </div>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search for a deck...' />
            </div>
        </div>
        </div>
    )
}

export default create