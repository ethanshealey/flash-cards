// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@/firebase'
import { collection, getDocs, or, query, where } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'
import lunr from 'lunr'

type Data = {
    response: any[]
}

type QueryType = {
  q: string,
  email: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const q: string = req.query.q as string
    const email: string = req.query.email as string

    let dbresults: any[] = []

    const dbq = query(collection(db, 'Decks'), or(
      where('public', '==', true), 
      where('createdByEmail', '==', email ?? '')
    ))

    await getDocs(dbq).then((qs: any) => {

        qs.forEach((doc: any) => {
          dbresults.push({ 
            title: doc.data().title, 
            cards: doc.data().cards.map((card: any) => card.front + ' ' + card.back), 
            id: `${dbresults.length + 1}` ,
            actual: { ...doc.data(), id: doc.id }
          })
        })
    })

    const idx = await lunr(async function(this: any) {

      this.field('title')
      this.field('cards')

      for(let i = 0; i < dbresults.length; i++) {
        this.add(dbresults[i])
      }

    })

    const results = idx.search(q)
    const resultSet: any[] = []

    results.forEach((r: any) => {
      const curr = dbresults.filter((d) => d.id === r.ref)[0]
      resultSet.push(curr.actual)
    })

    return res.status(200).json({ response: resultSet })

}
