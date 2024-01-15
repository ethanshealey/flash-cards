import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useRouter } from 'next/navigation'
import Dropdown from './Dropdown'

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
                    <Dropdown user={user} />
                </div>
            </div>
        </div>
    )
}

export default Header