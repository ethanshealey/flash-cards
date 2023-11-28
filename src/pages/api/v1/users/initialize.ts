// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@/firebase'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const { u } = req.body

    console.log(u)

    await addDoc(collection(db, "Users"), {
      email: u.user.email,
      picture: `https://api.dicebear.com/7.x/identicon/svg?seed=${u.user.email.replace(/[^a-zA-Z ]/g, "")}`,
      username: u.username
    })

    return res.status(200).json({ message: "Account Created" })
}
