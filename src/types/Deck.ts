import Card from "./Card"

type Deck = {
    id: string,
    title: string,
    public: boolean,
    createdBy: string,
    createdByEmail: string,
    dateCreated: string,
    cards: Card[],
    dateModified: string
}

export default Deck