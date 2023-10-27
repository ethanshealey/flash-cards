// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  count: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const { email } = req.query

    const q = query(collection(db, 'Decks'), where('createdByEmail', '==', email))
    getDocs(q).then((qs: any) => {
      const decks = qs.docs.map((item: any) => { return { ...item.data(), id: item.id } })
      res.status(200).json({ count: decks.length })
    })
}
