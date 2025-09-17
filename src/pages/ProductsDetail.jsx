import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCompare } from '../context/CompareContext';
import { useFavorites } from '../context/FavoritesContext';

const ProductsDetail = () => {

    // variabile per gestire gli id non esistenti
    const [error, setError] = useState(null);

    //Recupero l'ID dal parametro dell'URL.
    const { id } = useParams();

    // variabile di stato per contenere i products
    const [product, setProduct] = useState(null);

    // destrutturazione del custom hook per il comparatore
    const { compareIds, toggleCompare } = useCompare();

    // destrutturazione del custom hook per i preferiti
    const { favoritiesIds, toggleFavorities } = useFavorites();

    //  funzione per recuperare i singoli prodotti
    useEffect(() => {
        async function getProductDetail() {
            try {
                const res = await fetch(`http://localhost:3001/devices/${id}`);

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
        getProductDetail();
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
                                <img src={product.device.image} className="card-img-top rounded" alt={product.device.title} />
                                <div className="card-body">
                                    <h4 className="card-title mt-4">{product.device.title}</h4>
                                </div>
                                <div className='d-flex justify-content-between mt-3'>
                                    <button
                                        className={`btn ${compareIds.includes(product.device.id) ? 'btn-danger' : 'btn-primary'} `}
                                        onClick={() => toggleCompare(product.device.id)}>
                                        {compareIds.includes(product.device.id) ? <div className='d-flex align-items-center'>Rimuovi<i className="fa-solid fa-scale-unbalanced-flip ms-2"></i></div> : <div className='d-flex align-items-center'>Aggiungi<i className="fa-solid fa-scale-unbalanced-flip ms-2"></i></div>}</button>

                                    <button className={`btn ${favoritiesIds.includes(product.device.id) ? 'btn-danger' : 'btn-warning'}`}
                                        onClick={() => toggleFavorities(product.device.id)}>
                                        {favoritiesIds.includes(product.device.id) ? <i className="fa-solid fa-star text-warning"></i>
                                            : <i className="fa-regular fa-star text-white" ></i>}</button>
                                </div>
                            </div>
                        </div>

                        {/* Dettagli prodotto */}
                        <div className="col-lg-8">
                            <div className="card-detail text-white border-secondary h-100">
                                <div className="card-body">
                                    <h3 className="brand">{product.device.brand}</h3>
                                    <h4 className="card-subtitle mb-2 mt-3 price mb-4 ">{product.device.price} €</h4>
                                    <ul className="list-group bg-white rounded-3 p-3">
                                        <li className="list-group-item bg-transparent d-flex align-items-center border-0 border-bottom pb-3">
                                            <i className="bi bi-tags me-2 text-primary"></i>
                                            <strong className="me-1">Categoria:</strong> {product.device.category}
                                        </li>
                                        <li className="list-group-item bg-transparent d-flex align-items-center border-0 border-bottom py-3">
                                            <i className="bi bi-palette me-2 text-success"></i>
                                            <strong className="me-1">Colori:</strong> {product.device.colors.join(', ')}
                                        </li>
                                        <li className="list-group-item bg-transparent d-flex align-items-center border-0 border-bottom py-3">
                                            <i className="bi bi-memory me-2 text-warning"></i>
                                            <strong className="me-1">RAM:</strong> {product.device.ram} GB
                                        </li>
                                        <li className="list-group-item bg-transparent d-flex align-items-center border-0 border-bottom py-3">
                                            <i className="bi bi-hdd me-2 text-danger"></i>
                                            <strong className="me-1">Memoria:</strong> {product.device.storage} GB
                                        </li>
                                        <li className="list-group-item bg-transparent d-flex align-items-center border-0 pt-3">
                                            <i className="bi bi-phone me-2 text-info"></i>
                                            <strong className="me-1">Display:</strong> {product.device.sizeScreen}"
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="card-detail text-white border-secondary">
                                <div className="card-body">
                                    {product.device.category === 'tablet' ? (
                                        <>
                                            I tablet <strong>{product.device.brand}</strong> rappresentano il perfetto equilibrio tra uno smartphone e un laptop.
                                            Caratterizzati da schermi ampi e interfacce touch intuitive, sono ideali per leggere, studiare, lavorare, guardare film o navigare online.
                                            Leggeri e facili da trasportare, offrono una buona autonomia e compatibilità con accessori come tastiere o pennini digitali.
                                            La loro versatilità li rende adatti sia a un uso professionale che domestico.
                                        </>
                                    ) : product.device.category === 'smartphone' ? (
                                        <>
                                            Gli smartphone <strong>{product.device.brand}</strong> sono dispositivi multifunzione indispensabili nella vita quotidiana.
                                            Consentono di comunicare, navigare su internet, scattare foto, registrare video e utilizzare migliaia di app per ogni esigenza, dal lavoro all’intrattenimento.
                                            Dotati di display touch ad alta risoluzione e processori sempre più potenti, offrono esperienze fluide e personalizzabili.
                                            Grazie alla connettività avanzata (4G, 5G, Wi-Fi, Bluetooth), permettono di restare sempre connessi ovunque ci si trovi.
                                        </>
                                    ) : product.device.category === 'smartwatch' ? (
                                        <>
                                            Gli smartwatch <strong>{product.device.brand}</strong> sono orologi intelligenti progettati per offrire funzionalità aggiuntive direttamente al polso.
                                            Si collegano allo smartphone per ricevere notifiche, controllare la musica, gestire chiamate o monitorare l'attività fisica e la salute (battito cardiaco, sonno, passi, ecc.).
                                            Perfetti per uno stile di vita attivo o per chi cerca comodità e tecnologia in un unico accessorio elegante e funzionale.
                                        </>
                                    ) : (
                                        <>
                                            <strong>{product.device.brand}</strong>
                                        </>
                                    )}
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

export default ProductsDetail;