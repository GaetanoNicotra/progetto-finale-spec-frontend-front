import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <header>
                <Link to={'/'}><h2 className='text-white '>TechnoShop 🖥️</h2></Link>
                <Link to={'/confrontaPrezzi'}>Confronta Prezzi</Link>
                <p>⭐</p>
            </header>
        </>
    )
}

export default Header
