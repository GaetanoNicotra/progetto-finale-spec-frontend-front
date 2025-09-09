import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <header>
                <Link to={'/'}><h2 className='text-white custom-b-l'>TechnoShop 🖥️</h2></Link>
                <div className='d-flex align-items-center'>
                    <Link className='no-decoration custom-b-r fs-5' to={'/confrontaPrezzi'}>Confronta <i class="fa-solid fa-scale-unbalanced-flip"></i></Link>
                    <Link className='no-decoration' to={'/favorites'}><p className='fs-2 custom-b-r'>⭐</p></Link>
                </div>

            </header >
        </>
    )
}

export default Header
