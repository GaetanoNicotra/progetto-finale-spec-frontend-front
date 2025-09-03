import React from 'react'
import { useState, useEffect } from 'react'

const ProductsCards = () => {

    // variabile di stato per la ricerca per titolo
    const [searchProduct, setSearchProduct] = useState('')

    // variabile di stato per i dati dell'API
    const [products, setProducts] = useState([])

    // funzione per recuperare tutti i prodotti
    useEffect(() => {
        async function getProducts() {
            try {
                const [resDevice, resScooters] = await Promise.all([
                    fetch('http://localhost:3001/devices'),
                    fetch('http://localhost:3001/electricscooters')
                ])

                const [devices, scooters] = await Promise.all([
                    resDevice.json(),
                    resScooters.json()])

                setProducts([...devices, ...scooters])
            } catch (error) {
                console.error('Errore nel recupero dei dati', error)
            }
        }
        getProducts()
    }, [])

    // ricerca per titolo
    const filteredProducts = products.filter(p => p.title.toLowerCase().includes(searchProduct.toLocaleLowerCase()))

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
                <select>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>

                <p>Ordina per Categoria</p>
                <select>
                    <option value="smartphone">Smartphone</option>
                    <option value="tablet">Tablet</option>
                    <option value="smartwatch">Smartwatch</option>
                    <option value="electricscooter">Electricscooter</option>
                </select>
            </div>
            {filteredProducts.map((p, index) => {
                return (

                    <div className='col-lg-3 col-md-4 col-sm-6 mb-4' key={index}>
                        <div className='card p-2 h-100'>
                            <h5>{p.title}</h5>
                            <p>{p.category} {p.category === 'tablet' ? '🖥️' : p.category === 'smartphone' ? '📱' : p.category === 'smartwatch' ? '⌚' : '🛴'}</p>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default ProductsCards
