// src/pages/ComparePage.jsx
import React, { useEffect, useState } from 'react';
import { useCompare } from '../context/CompareContext';

const ComparePage = () => {

    // destrutturo dal custom hook la variabile con gli id e la funzione di clear
    const { compareIds, clearCompare } = useCompare();

    // variabile per contenere i prodotti selezionati
    const [products, setProducts] = useState([]);

    // recupero i prodotti con l'id selezionato
    useEffect(() => {
        async function fetchComparedProducts() {
            try {
                const results = await Promise.all(
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
        return <h3 className='text-white'>Seleziona almeno due prodotti da confrontare!</h3>;
    }

    return (
        <div className="container mt-4">
            <h2>Confronto Prodotti</h2>
            <div className="row">
                {products.map((p) => (
                    <div className="col-md-6" key={p.device.id}>
                        <div className="card p-3 mb-3">
                            <h4>{p.device.title}</h4>
                            <p><strong>Categoria:</strong> {p.device.category}</p>
                            <p><strong>Prezzo:</strong> €{p.device.price}</p>
                            <p><strong>colori:</strong> {p.device.colors.join(', ')}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="btn btn-warning" onClick={clearCompare}>Svuota il confronto</button>
        </div>
    );
};

export default ComparePage;
