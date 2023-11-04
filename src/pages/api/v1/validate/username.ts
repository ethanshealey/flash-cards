// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  valid: boolean
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const { u } = req.query

    const q = query(collection(db, 'Users'), where('username', '==', u))
    getDocs(q).then((qs: any) => {
      const search: string | undefined = qs.docs[0]?.data()?.username
      return res.status(200).json({ valid: !(search === u) })
    })
}
