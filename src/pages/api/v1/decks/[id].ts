// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@/firebase'
import Deck from '@/types/Deck'
import { collection, getDocs, query, where } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  deck?: Deck
  error?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const { id, email } = req.query

    //if(!email) return

    const q = query(collection(db, 'Decks'), where('__name__', '==', id))
    getDocs(q).then((qs: any) => {
      const deck = qs.docs.map((item: any) => { 
        return { 
          ...item.data(), 
          id: item.id 
        }
      })
      if(deck.public || deck.createdByEmail === email)
        return res.status(200).json({ deck: deck[0] })
      else
        return res.status(200).json({ error: "You do not have access to this deck" })
    })
}
