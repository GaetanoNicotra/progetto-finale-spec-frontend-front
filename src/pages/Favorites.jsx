import React from 'react'
import { useFavorites } from '../context/FavoritesContext'
import { useState, useEffect } from 'react'

const Favorites = () => {

    // destrutturo dal custom hook le funzioni e le variabili che mi sevono
    const { favoritiesIds, toggleFavorities, clearFavorities } = useFavorites();

    // variabile per contenere i prodotti favoriti selezionati
    const [prodFavorities, setProdFavorities] = useState([])

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
        // verifico se sono presnti id nell'array
        if (favoritiesIds.length > 0) {
            // quindi richiamo la funzione
            fetchFavoritiesProd();
        } else {
            setProdFavorities([]);
        }
    }, [favoritiesIds])

    if (prodFavorities.length < 0) {
        return <div className='container'><h3 className=' text-white mt-5'>La lista dei preferiti è vuota!</h3>
            <Link to={'/'}><button className='btn btn-success mt-5'>Aggiungi prodotti</button></Link></div>;
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-2 col-md-3 col-sm-2">
                        {prodFavorities.map((p) => (
                            <div>
                                <div className="card">
                                    <h4>{p.device.title}</h4>
                                    <h4>{p.device.brand}</h4>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Favorites
