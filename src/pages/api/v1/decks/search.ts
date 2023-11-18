// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@/firebase'
import { collection, getDocs, or, query, where } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'
const {  Document } = require("flexsearch");

type Data = {
    response: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const { q } = req.query

    const searchDoc = new Document()

    // const dbq = query(collection(db, 'Decks'), or(
    //     where('public', '==', true), 
    //     where('createdByEmail', '==', 'ethan.shealey@gmail.com')
    // ))

    // getDocs(dbq).then((qs: any) => {
    //     qs.forEach((doc: any) => {
    //         //document?.add(doc.id, doc.data())
    //     })
    // })

    return res.status(200).json({ response: `Tried to search for ${q}` })

}
