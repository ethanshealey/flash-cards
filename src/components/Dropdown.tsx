import Link from 'next/link'
import React from 'react'
import { BiSolidUser, BiSearchAlt2, BiHomeAlt } from 'react-icons/bi'
import { MdOutlineCreate, MdLogout } from 'react-icons/md'

type DropdownType = {
    user: any
}

const Dropdown = ({ user }: DropdownType) => {
  return (
    <> 
        {
            user ? <>
                <Link className="menu-btn-dropdown-item" href="/"><BiHomeAlt /> Home</Link>
                <Link className="menu-btn-dropdown-item" href="/profile"><BiSolidUser /> Account</Link>
                <Link className="menu-btn-dropdown-item" href="/create"><MdOutlineCreate /> Create Deck</Link>
                <Link className="menu-btn-dropdown-item" href="/search"><BiSearchAlt2 /> Search</Link>
                <hr />
                <Link className="menu-btn-dropdown-item warn-text" href="/logout"><MdLogout style={{ transform: 'rotate(180deg)' }} /> Sign Out</Link>
            </> : <>
                <Link className="menu-btn-dropdown-item"  href="/"><BiHomeAlt /> Home</Link>
                <Link className="menu-btn-dropdown-item" href="/search"><BiSearchAlt2 /> Search</Link>
                <Link className="menu-btn-dropdown-item"  href="/login"><MdLogout /> Log In</Link>
            </>
        }
    </>
  )
}

export default Dropdown