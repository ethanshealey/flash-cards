// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  decks: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const q = query(collection(db, 'Decks'), where('public', '==', true))
    getDocs(q).then((qs: any) => {
      const decks = qs.docs.map((item: any) => { return { ...item.data(), id: item.id } })
      res.status(200).json({ decks: decks })
    })
}
