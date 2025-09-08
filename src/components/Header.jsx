import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <header>
                <Link to={'/'}><h2 className='text-white custom-b-l'>TechnoShop 🖥️</h2></Link>
                <div className='d-flex align-items-center'>
                    <Link className='no-decoration custom-b-r fs-5' to={'/confrontaPrezzi'}>Confronta <i className="fa-solid fa-arrow-right-arrow-left"></i></Link>
                    <p className='fs-2 custom-b-r'>⭐</p>
                </div>

            </header>
        </>
    )
}

export default Header
