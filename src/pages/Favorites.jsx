import React from 'react'
import { useFavorites } from '../context/FavoritesContext'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCompare } from '../context/CompareContext';
const Favorites = () => {

    // destrutturo dal custom hook le funzioni e le variabili che mi sevono
    const { favoritiesIds, toggleFavorities, clearFavorities } = useFavorites();

    // destrutturazione del custom hook per il comparatore
    const { compareIds, toggleCompare } = useCompare();

    // variabile per contenere i prodotti favoriti selezionati
    const [prodFavorities, setProdFavorities] = useState([]);

    // recupero i prodotti con l'id selezionato tramite promise.all per caricare più prodotti in parallelo
    useEffect(() => {
        async function fetchFavoritiesProd() {
            try {
                const results = await Promise.all(
                    favoritiesIds.map(id =>
                        fetch(`http://localhost:3001/devices/${id}`)
                            .then(resp => resp.json())
                    )
                )
                setProdFavorities(results);

            } catch (error) {
                console.error("Errore nel caricamento dei prodotti da confrontare", error);
            }
        }

        // verifico se sono presenti id nell'array
        if (favoritiesIds.length > 0) {
            // quindi richiamo la funzione
            fetchFavoritiesProd();
        } else {
            setProdFavorities([]);
        }

    }, [favoritiesIds])

    if (favoritiesIds.length === 0) {
        return <div className='container'><h3 className=' text-white mt-5'>La lista dei preferiti è vuota!</h3>
            <Link to={'/'}><button className='btn btn-success mt-5'>Aggiungi prodotti</button></Link></div>;
    }

    return (
        <>
            <div className="container">
                <div className="row mb-5">
                    <h3 className='text-white mt-4 mb-3'>Ecco la lista dei tuti articoli preferiti</h3>
                    <div className='mb-3'>
                        <button className="btn btn-danger mb-3 me-3" onClick={clearFavorities}>Svuota</button>
                        <Link to={'/'}><button className='btn btn-success mb-3'>Aggiungi prodotti</button></Link>
                    </div>
                    {prodFavorities.map((p) => (
                        <div key={p.device.id} className="col-lg-2 col-md-3 col-sm-2 mt-4 mb-5">
                            <Link className='no-decoration' to={`/product/${p.device.id}`}>
                                <div className="card-detail h-100 prefer">
                                    <img src={p.device.image} className="card-img-top rounded" alt="img-favorities" />
                                    <div className="card-body">
                                        <h5 className="card-title mt-3 mb-3">{p.device.title}</h5>
                                    </div>
                                    <p className="card-text mt-2 price w-50 mt-auto">{p.device.price} &#8364;</p>
                                </div>
                            </Link>

                            <div className='d-flex justify-content-around'>
                                <button
                                    className={`btn ${compareIds.includes(p.device.id) ? 'btn-danger' : 'btn-primary'} mt-2 `}
                                    onClick={() => toggleCompare(p.device.id)}>
                                    {compareIds.includes(p.device.id) ? <i className="fa-solid fa-scale-unbalanced-flip"></i> : <i className="fa-solid fa-scale-unbalanced-flip"></i>
                                    }</button>
                                <button
                                    className='btn btn-danger mt-2'
                                    onClick={() => toggleFavorities(p.device.id)}>
                                    Rimuovi</button>
                            </div>

                        </div>
                    ))}
                </div>
            </div >
        </>
    )
}

export default Favorites

