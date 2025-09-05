import React, { useEffect, useState } from 'react'
import ProductsCards from '../components/ProductsCards'

const ProductsList = () => {

    return (
        <>
            <div className="container ">
                <div className="row">
                    <ProductsCards />
                </div>
            </div>
        </>
    )
}

export default ProductsList
