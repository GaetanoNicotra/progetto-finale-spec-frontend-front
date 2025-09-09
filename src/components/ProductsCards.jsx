import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';
import { useFavorites } from '../context/FavoritesContext';
import { debounce } from 'lodash';

const ProductsCards = () => {
    // variabile di stato per salvare tutti i prodotti
    const [products, setProducts] = useState([]);

    // variabile di stato per la ricerca per titolo
    const [searchProduct, setSearchProduct] = useState('')

    // variabile di stato per la ricerca di genere
    const [searchGenre, setSearchGenre] = useState('')

    // variabile di stato per ordinamento A-Z Z-A
    const [order, setOrder] = useState('A-Z')

    // destrutturazione del custom hook per il comparatore
    const { compareIds, toggleCompare } = useCompare();

    // destrutturazione del custom hook per i preferiti
    const { favoritiesIds, toggleFavorities } = useFavorites();

    // Stato per input di ricerca titolo (debounced)
    const [searchInput, setSearchInput] = useState('');

    // funzione per recuperare tutti i prodotti
    useEffect(() => {
        async function getProducts() {
            try {
                const resDevice = await fetch('http://localhost:3001/devices');
                const data = await resDevice.json();
                setProducts(data);
            } catch (error) {
                console.error('Errore nel recupero prodotti:', error);
            }
        }
        getProducts();
    }, []);

    // Funzione di debounce per il filtro per titolo
    const debouncedProduct = useCallback(
        debounce((valDigitato) => {
            setSearchProduct(valDigitato);
        }, 500),
        []
    );

    // Quando cambia il valore input aggiorna lo stato input immediatamente ma solo dopo il debounce
    const InputChange = (e) => {
        // prendo il testo scritto nell'input
        const valDigitato = e.target.value;
        setSearchInput(valDigitato); // mantengo il valore visibile nell’input così l’utente vede ciò che digita
        debouncedProduct(valDigitato); //chiamo la funzione di debounce che aggiorna setSearchProduct dopo 500ms
    };

    // ricerca per genere
    const filteredGenre = searchGenre ? products.filter((p) => p.category === searchGenre) : products;

    // ricerca filtro per titolo 
    const filteredProducts = filteredGenre.filter((p) =>
        p.title.toLowerCase().includes(searchProduct.toLowerCase()));

    // ordinamento alfabetico
    const orderedProducts = [...filteredProducts].sort((a, b) => {
        if (order === 'A-Z') {
            return a.title.trim().localeCompare(b.title);
        } else if (order === 'Z-A') {
            return b.title.trim().localeCompare(a.title);
        } else {
            return 0;
        }
    });

    return (
        <>
            <div className='d-flex operation mb-4 mt-4 p-2'>
                <div className='me-5'>
                    <p>Cerca prodotti</p>
                    <input type="text"
                        value={searchInput}
                        placeholder='Cerca per titolo..'
                        onChange={InputChange}
                        required
                    />
                </div>

                <div className='me-5'>
                    <p>Ordina da:</p>
                    <select value={order} onChange={(e) => setOrder(e.target.value)}>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>
                </div>

                <div>
                    <p>Ordina per Categoria</p>
                    <select value={searchGenre} onChange={(e) => setSearchGenre(e.target.value)} >
                        <option value="">Tutti</option>
                        <option value="smartphone">Smartphone</option>
                        <option value="tablet">Tablet</option>
                        <option value="smartwatch">Smartwatch</option>
                    </select>
                </div>
            </div>

            {orderedProducts.length === 0 ? <div className='text-white fs-2 mt-3'>Nessun risultato trovato..</div>
                : orderedProducts.map((p) => {
                    return (

                        <div className='col-lg-3 col-md-4 col-sm-6 mb-4' key={p.id}>
                            <div className='card card-home p-2 h-100'>
                                <Link to={`/product/${p.id}`} className="no-decoration">
                                    <h5>{p.title}</h5>
                                    <p className='fs-6'>{p.category} {p.category === 'tablet' ? '🖥️' : p.category === 'smartphone' ? '📱' : p.category === 'smartwatch' ? '⌚' : '🛴'}</p>
                                </Link>

                                <div className='d-flex justify-content-around'>
                                    <button
                                        className={`btn ${compareIds.includes(p.id) ? 'btn-outline-danger' : 'btn-outline-primary'} `}
                                        onClick={() => toggleCompare(p.id)}>
                                        {compareIds.includes(p.id) ? 'Rimuovi' : <i class="fa-solid fa-scale-unbalanced-flip"></i>}</button>

                                    <button className={`btn ${favoritiesIds.includes(p.id) ? 'btn-danger' : 'btn-outline-warning'}`}
                                        onClick={() => toggleFavorities(p.id)}>
                                        {favoritiesIds.includes(p.id) ? <i className="fa-solid fa-star text-warning"></i>
                                            : <i className="fa-regular fa-star text-warning" ></i>}</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
        </>
    )
}

export default ProductsCards


