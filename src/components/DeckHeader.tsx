import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BiSolidUser, BiSearchAlt2, BiHomeAlt, BiArrowBack } from 'react-icons/bi'
import { MdOutlineCreate, MdLogout } from 'react-icons/md'
import { PiCardsBold } from 'react-icons/pi'
import Link from 'next/link';
import Deck from '@/types/Deck'

type DeckHeaderType = {
    user: any,
    title: string | undefined
}

const DeckHeader = ({ user, title }: DeckHeaderType) => {

    const [ showMenu, setShowMenu ] = useState(false)

    return (
        <div id="header">
            <BiArrowBack id="back-btn" onClick={() => window.history.back()} />
            <h1>{ title }</h1>
            <div id="header-btns">
                <button id="menu-btn" onClick={() => setShowMenu(p => !p)}><GiHamburgerMenu /></button>
                <div id="menu-btn-dropdown" className={ showMenu ? 'show' : 'hide' }>
                    { 
                        user ? <>
                            <Link className="menu-btn-dropdown-item" href="/"><BiHomeAlt /> Home</Link>
                            <Link className="menu-btn-dropdown-item" href="/profile"><BiSolidUser /> Account</Link>
                            {/* <Link className="menu-btn-dropdown-item" href="/"><PiCardsBold /> Your Decks</Link> */}
                            <Link className="menu-btn-dropdown-item" href="/"><MdOutlineCreate /> Create Deck</Link>
                            <Link className="menu-btn-dropdown-item" href="/"><BiSearchAlt2 /> Search</Link>
                            <hr />
                            <Link className="menu-btn-dropdown-item warn-text" href="/logout"><MdLogout style={{ transform: 'rotate(180deg)' }} /> Sign Out</Link>
                        </> : <>
                            <Link className="menu-btn-dropdown-item"  href="/"><BiHomeAlt /> Home</Link>
                            <Link className="menu-btn-dropdown-item"  href="/login"><MdLogout /> Log In</Link>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default DeckHeader