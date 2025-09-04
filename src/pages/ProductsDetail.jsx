import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProductsDetail = () => {
    //Recupero l'ID dal parametro dell'URL.
    const { id } = useParams();

    // variabile di stao per contenere i products
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
        <div className="container my-5">
            {product ? (
                <div className="row g-4">
                    {/* Immagine prodotto */}
                    <div className="col-lg-4">
                        <div className="card bg-secondary text-white border-secondary h-100">
                            <img src={product.device.image} className="card-img-top" alt={product.device.title} />
                            <div className="card-body">
                                <h4 className="card-title ">{product.device.title}</h4>
                            </div>
                        </div>
                    </div>

                    {/* Dettagli prodotto */}
                    <div className="col-lg-8">
                        <div className="card  text-white border-secondary h-100">
                            <div className="card-body">
                                <h3 className="card-title text-dark">{product.device.brand}</h3>
                                <h4 className="card-subtitle mb-2 mt-3 text-success">{product.device.price}€</h4>
                                <ul className="list-group list-group-flush">
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
                </div>
            ) : (
                <h3 className="text-white mt-5">Prodotto non trovato o in caricamento...</h3>
            )}
        </div>
    );

}

export default ProductsDetail;