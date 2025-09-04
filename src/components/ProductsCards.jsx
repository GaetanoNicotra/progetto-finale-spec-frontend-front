import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ProductsCards = () => {

    // variabile di stato per salvare i prodotti
    const [products, setProducts] = useState([]);

    // variabile di stato per la ricerca per titolo
    const [searchProduct, setSearchProduct] = useState('')

    // variabile di stato per la ricerca di genere
    const [searchGenre, setSearchGenre] = useState('')

    // variabile di stato per ordinamento A-Z Z-A
    const [order, setOrder] = useState('A-Z')

    // funzione per recuperare tutti i prodotti
    useEffect(() => {
        async function getProducts() {
            try {
                const resDevice = await fetch('http://localhost:3001/devices')

                const devices = await resDevice.json()

                setProducts(devices)
            } catch (error) {
                console.error('Errore nel recupero dei dati', error)
            }
        }
        getProducts()
    }, [])

    // ricerca per genere
    const filteredGenre = searchGenre ? products.filter(p => p.category === searchGenre) : products;

    // ricerca per titolo
    const filteredProducts = filteredGenre.filter(p => p.title.toLowerCase().includes(searchProduct.toLocaleLowerCase()))

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
            <div className='d-flex operation mb-4 mt-4'>

                <p>Cerca prodotti</p>
                <input type="text"
                    value={searchProduct}
                    placeholder='Cerca per titolo..'
                    onChange={(e) => setSearchProduct(e.target.value)}
                    required
                />

                <p>Ordina da:</p>
                <select value={order} onChange={(e) => setOrder(e.target.value)}>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>

                <p>Ordina per Categoria</p>
                <select value={searchGenre} onChange={(e) => setSearchGenre(e.target.value)} >
                    <option value="">Tutti</option>
                    <option value="smartphone">Smartphone</option>
                    <option value="tablet">Tablet</option>
                    <option value="smartwatch">Smartwatch</option>
                </select>

            </div>

            {orderedProducts.length === 0 ? <div className='text-white fs-2 mt-3'>Nessun risultato trovato..</div>
                : orderedProducts.map((p) => {
                    return (

                        <div className='col-lg-3 col-md-4 col-sm-6 mb-4' key={p.id}>
                            <Link to={`/product/${p.id}`}>
                                <div className='card p-2 h-100'>
                                    <h5>{p.title}</h5>
                                    <p>{p.category} {p.category === 'tablet' ? '🖥️' : p.category === 'smartphone' ? '📱' : p.category === 'smartwatch' ? '⌚' : '🛴'}</p>
                                </div>
                            </Link>
                        </div>

                    )
                })}
        </>
    )
}

export default ProductsCards
