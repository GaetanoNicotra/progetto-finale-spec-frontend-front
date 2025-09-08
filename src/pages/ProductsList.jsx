import React, { useEffect, useState } from 'react'
import ProductsCards from '../components/ProductsCards'

const ProductsList = () => {

    return (
        <>
            {/* jumbotron video */}
            <video width="100%" height="320" muted loop autoPlay playsInline className="object-fit-none" >
                <source src="./public\video\Unveiling Camera _ Galaxy S25 Ultra _ Samsung.mp4" type="video/mp4"></source>
            </video >

            <div className="container">
                <div className="row">
                    <ProductsCards />
                </div>
            </div>
        </>
    )
}

export default ProductsList
