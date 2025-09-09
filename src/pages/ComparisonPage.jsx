// src/pages/ComparePage.jsx
import React, { useEffect, useState } from 'react';
import { useCompare } from '../context/CompareContext';
import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';

const ComparePage = () => {

    // destrutturazione del custom hook per i preferiti
    const { favoritiesIds, toggleFavorities } = useFavorites();

    // destrutturo dal custom hook la variabile con gli id e la funzione di clear
    const { compareIds, clearCompare, toggleCompare } = useCompare();

    // variabile per contenere i prodotti selezionati
    const [products, setProducts] = useState([]);

    // recupero i prodotti con l'id selezionato tramite promise.all per caricare più prodotti in parallelo
    useEffect(() => {
        async function fetchComparedProducts() {
            try {
                const results = await Promise.all(
                    //  Il map (crea un nuovo array) e trasforma ogni id in una chiamata fetch
                    compareIds.map(id =>
                        fetch(`http://localhost:3001/devices/${id}`)
                            .then(res => res.json())));

                setProducts(results);

            } catch (error) {
                console.error("Errore nel caricamento dei prodotti da confrontare", error);
            }
        };

        // verifico se sono presnti id nell'array
        if (compareIds.length > 0) {
            // quindi richiamo la funzione
            fetchComparedProducts();
        } else {
            setProducts([]);
        }
    }, [compareIds]);

    if (products.length < 2) {
        return <div className='container'><h3 className=' text-white mt-5'>Seleziona almeno due prodotti da confrontare!</h3>
            <Link to={'/'}><button className='btn btn-success mt-5'>Aggiungi prodotti</button></Link></div>;
    }

    return (
        <>
            <div className="container mt-4 mb-5">
                <h2 className='text-white mb-4'>Confronto Prodotti</h2>
                <div className='mb-5'>
                    <button className="btn btn-danger mb-4 me-3" onClick={clearCompare}>Svuota</button>
                    <Link to={'/'}><button className='btn btn-success mb-4 '>Aggiungi prodotti</button></Link>
                </div>
                <div className="row">
                    {products.map((p) => (
                        <div className="col-lg-2 col-md-3 col-sm-2 mb-3" key={p.device.id}>
                            <div className="card p-3 mb-3 h-100 prefer">
                                <div className='list-comparison'>
                                    <h6 className='fs-5 text-success mb-3'>{p.device.category} </h6>
                                    <h5>{p.device.title}</h5>
                                    <h6>{p.device.brand}</h6>
                                    <Link to={`/product/${p.device.id}`}><img src={p.device.image} alt="img-product" className='overlay' /></Link>
                                    <p><strong>Prezzo:</strong> € {p.device.price}</p>
                                    <p><strong>Colori:</strong> {p.device.colors.join(', ')}</p>
                                    <p><strong>RAM:</strong> {p.device.ram} GB</p>
                                    <p><strong>Memoria:</strong> {p.device.storage} GB</p>
                                    <p><strong>Display:</strong> {p.device.sizeScreen} "</p>
                                </div>

                                <div className='d-flex justify-content-around mt-auto'>
                                    <button
                                        className='btn btn-danger z-3 w-50 p-0'
                                        onClick={() => toggleCompare(p.device.id)}>Rimuovi</button>
                                    <button className={`btn ${favoritiesIds.includes(p.device.id) ? 'btn-danger' : 'btn-warning '}  z-3`}
                                        onClick={() => toggleFavorities(p.device.id)}>
                                        {favoritiesIds.includes(p.device.id) ? <i className="fa-solid fa-star text-warning"></i>
                                            : <i className="fa-regular fa-star text-white" ></i>}</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ComparePage;
