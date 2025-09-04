import React from 'react'
import { useParams } from 'react-router-dom';
import { useProducts } from '../contexts/ProductsContext';

const ProductsDetail = () => {

    const { id } = useParams();
    const { products } = useProducts();

    const product = products.find(p => String(p.id) === id);

    return (
        <div className="container">
            {product ? (
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card">
                            <img src="..." className="card-img-top" alt="img-articolo" />
                            <div className="card-body">
                                <p className="card-text">{product.title}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                                <a href="#" className="card-link">Card link</a>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-white fs-4 mt-5">Prodotto non trovato o in caricamento...</div>
            )}
        </div>
    )
}

export default ProductsDetail
