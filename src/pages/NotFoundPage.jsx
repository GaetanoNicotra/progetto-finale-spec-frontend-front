import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 text-white text-center">
                        <h1 >OPS..! ERRORE 404</h1>
                        <h2>PAGINA NON TORVATA</h2>
                        <Link to={'/'}><h4>Torna alla home page</h4></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFoundPage
