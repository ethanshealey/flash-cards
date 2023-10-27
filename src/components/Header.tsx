import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BiSolidUser, BiSearchAlt2, BiHomeAlt } from 'react-icons/bi'
import { MdOutlineCreate, MdLogout } from 'react-icons/md'
import { PiCardsBold } from 'react-icons/pi'
import Link from 'next/link';
import { useRouter } from 'next/navigation'

type HeaderType = {
    user: any
}

const Header = ({ user }: HeaderType) => {

    const { push } = useRouter();
    const [ showMenu, setShowMenu ] = useState(false)

    return (
        <div id="header">
            <h1 onClick={() => push("/")}>Study <span>ethanshealey.com</span></h1>
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

export default Header