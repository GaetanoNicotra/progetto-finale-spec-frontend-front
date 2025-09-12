import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCompare } from '../context/CompareContext';
import { useFavorites } from '../context/FavoritesContext';

const ScootersDetail = () => {

    // variabile per gestire gli id non esistenti
    const [error, setError] = useState(null);

    //Recupero l'ID dal parametro dell'URL.
    const { id } = useParams();

    // variabile di stato per contenere i products
    const [product, setProduct] = useState(null);

    // destrutturazione del custom hook per i preferiti
    const { favoritiesIds, toggleFavorities } = useFavorites();

    //  funzione per recuperare i singoli prodotti
    useEffect(() => {
        async function getProductDetail2() {

            try {
                const res = await fetch(`http://localhost:3001/electricscooters/${id}`);

                // Controllo se la risposta non è OK 
                if (!res.ok) {
                    throw new Error('Prodotto non trovato');
                }
                const data = await res.json();

                setProduct(data);
            } catch (error) {
                console.error('Errore nel recupero dei dati', error);
                // Imposta 'product' su 'null' per mostrare il messaggio di errore.
                setProduct(null);
                setError('Prodotto non trovato')
            }
        }
        getProductDetail2();
    }, [id]);


    if (error) {
        return (
            <div className="container my-5 text-white">
                <h2>Prodotto non trovato..! </h2>
            </div>
        );
    }

    return (
        <>
            <div className="container my-5">
                {product ? (
                    <div className="row g-4">
                        {/* Immagine prodotto */}
                        <div className="col-lg-4">
                            <div className="card-detail text-white border-secondary h-100">
                                <img src={product.electricscooter.image} className="card-img-top rounded" alt={product.electricscooter.title} />
                                <div className="card-body">
                                    <h4 className="card-title mt-4">{product.electricscooter.title}</h4>
                                </div>

                            </div>
                        </div>

                        {/* Dettagli prodotto */}
                        <div className="col-lg-8">
                            <div className="card-detail text-white border-secondary h-100">
                                <div className="card-body">
                                    <h3 className="brand">{product.electricscooter.brand}</h3>
                                    <h4 className="card-subtitle mb-2 mt-3 price mb-4">{product.electricscooter.price} €</h4>
                                    <ul className="list-detail">
                                        <li className="list-group-item pt-3">
                                            <strong>Categoria:</strong> {product.electricscooter.category}
                                        </li>
                                        <hr />
                                        <li className="list-group-item">
                                            <strong>Colori:</strong> {product.electricscooter.colors.join(', ')}
                                        </li>
                                        <hr />
                                        <li className="list-group-item">
                                            <strong>Potenza batteria:</strong> {product.electricscooter.batteryPower} Wh
                                        </li>
                                        <hr />
                                        <li className="list-group-item pb-3">
                                            <strong >Velocità max:</strong> {product.electricscooter.speed} km/h
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="card-detail text-white border-secondary">
                                <div className="card-body">
                                    I monopattini elettrici <strong>{product.electricscooter.brand}</strong> offrono una soluzione di mobilità urbana moderna, sostenibile e pratica.
                                    Perfetti per spostamenti brevi in città, combinano velocità, autonomia e compattezza in un design leggero e pieghevole.
                                    Dotati di motori silenziosi e batterie ricaricabili, garantiscono una guida fluida e a basso impatto ambientale.
                                    Ideali per evitare il traffico, risparmiare sui costi di trasporto e muoversi in libertà, sono sempre più scelti da studenti, lavoratori e viaggiatori urbani.
                                </div>
                            </div>
                        </div>
                        <div className="col-12 card-deetail text-white">
                        </div>
                    </div>
                ) : (
                    <div><h3 className='text-white'>Prodotto in caricamento..</h3>
                        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-25" >
                            <span className="loader"></span>
                        </div></div>
                )}
            </div>
        </>
    );
}

export default ScootersDetail;