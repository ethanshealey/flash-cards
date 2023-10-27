// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@/firebase'
import { addDoc, collection, doc } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const { title, visibility, deck, user } = req.body

    console.log(title, visibility, deck, user)

    addDoc(collection(db, "Decks"), {
        cards: deck,
        createdBy: user.username,
        createdByEmail: user.email,
        dateCreated: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        public: visibility,
        title: title
    }).then(() => {
        return res.status(200).json({ message: 'Added Deck Successfully' })
    }).catch((e) => {
        return res.status(200).json({ message: 'Error Adding Deck' })
    })
    
}
