import React, { useEffect, useState } from 'react'
import ProductsCards from '../components/ProductsCards'

const ProductsList = () => {

    return (
        <>
            <div className="container ">
                <h4 className='mt-4 mb-4'>Ecco qui la lista di tutti i nostri articoli</h4>
                <div className="row">
                    <ProductsCards />
                </div>
            </div>
        </>
    )
}

export default ProductsList
