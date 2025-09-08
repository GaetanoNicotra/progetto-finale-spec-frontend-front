import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProductsDetail = () => {
    //Recupero l'ID dal parametro dell'URL.
    const { id } = useParams();

    // variabile di stato per contenere i products
    const [product, setProduct] = useState(null);

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
            }
        }
        getProductDetail();
    }, [id]);

    return (
        <>



            <div className="container my-5">
                {product ? (
                    <div className="row g-4">
                        {/* Immagine prodotto */}
                        <div className="col-lg-4">
                            <div className="card-detail text-white border-secondary h-100">
                                <img src={product.device.image} className="card-img-top" alt={product.device.title} />
                                <div className="card-body">
                                    <h4 className="card-title mt-2">{product.device.title}</h4>
                                </div>
                            </div>
                        </div>

                        {/* Dettagli prodotto */}
                        <div className="col-lg-8">
                            <div className="card-detail  text-white border-secondary h-100">
                                <div className="card-body">
                                    <h3 className="brand">{product.device.brand}</h3>
                                    <h4 className="card-subtitle mb-2 mt-3 price">{product.device.price} €</h4>
                                    <ul className="list-group list-group-flush bg-dark">
                                        <li className="list-group-item  text-black">
                                            <strong>Categoria:</strong> {product.device.category}
                                        </li>
                                        <li className="list-group-item  text-black">
                                            <strong>Colori:</strong> {product.device.colors.join(', ')}
                                        </li>
                                        <li className="list-group-item  text-black">
                                            <strong>RAM:</strong> {product.device.ram} GB
                                        </li>

                                        <li className="list-group-item  text-black">
                                            <strong>Memoria:</strong> {product.device.storage} GB
                                        </li>
                                        <li className="list-group-item text-black">
                                            <strong>Display:</strong> {product.device.sizeScreen}"
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">{product.device.description}</div>
                    </div>
                ) : (
                    <h3 className="text-white mt-5">Prodotto non trovato o in caricamento...</h3>
                )}
            </div>
            <video width="100%" height="200" muted loop autoPlay playsInline className="object-fit-none" >
                <source src="../public/video/Unveiling Performance _ Galaxy S25 Ultra _ Samsung.mp4" type="video/mp4"></source>
            </video >
        </>
    );

}

export default ProductsDetail;