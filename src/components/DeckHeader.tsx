import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BiArrowBack } from 'react-icons/bi'
import Dropdown from './Dropdown'

type DeckHeaderType = {
    user: any,
    title: string | undefined
}

const DeckHeader = ({ user, title }: DeckHeaderType) => {

    const [ showMenu, setShowMenu ] = useState(false)

    return (
        <div id="header">
            <BiArrowBack id="back-btn" onClick={() => window.history.back()} />
            <h1 id="deck-header">{ title }</h1>
            <div id="header-btns">
                <button id="menu-btn" onClick={() => setShowMenu(p => !p)}><GiHamburgerMenu /></button>
                <div id="menu-btn-dropdown" className={ showMenu ? 'show' : 'hide' }>
                    <Dropdown user={user} />
                </div>
            </div>
        </div>
    )
}

export default DeckHeader