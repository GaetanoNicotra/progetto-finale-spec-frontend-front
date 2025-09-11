import React from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { useCompare } from '../context/CompareContext'

const Header = () => {

    // destrutturazione del custom hook per i preferiti
    const { favoritiesIds } = useFavorites();

    // destrutturo dal custom hook la variabile con gli id e la funzione di clear
    const { compareIds } = useCompare();

    return (
        <>
            <header>
                <Link to={'/'}><h2 className='text-white custom-b-l'>TechnoShop 🖥️</h2></Link>

                <div className='d-flex align-items-center custom-b-r'>

                    <Link className='no-decoration custom-b-r fs-5 position-relative' to={'/confrontaPrezzi'}>
                        Confronta<i className="fa-solid fa-scale-unbalanced-flip ms-2"></i>
                        {compareIds.length > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {compareIds.length}
                            </span>
                        )}</Link>

                    <Link to={'/scooters'} className='me-4 fs-2 no-decoration'>🛴</Link>

                    <Link to="/favorites" className="position-relative text-white text-decoration-none ms-3">
                        <i className="fa-solid text-warning fs-2"><p className='pt-2'>⭐</p></i>
                        {favoritiesIds.length > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {favoritiesIds.length}
                            </span>
                        )}
                    </Link>

                </div>

            </header >
        </>
    )
}

export default Header
