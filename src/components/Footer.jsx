import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4 mt-5">
            <div className="container d-flex flex-column flex-md-row justify-content-between align-items-start">

                <div>
                    <h6>Seguici</h6>
                    <div className="d-flex gap-2 flex-column">
                        <hr />
                        <a href="#" className="text-primary"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="text-danger"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="text-info"><i className="fab fa-twitter"></i></a>
                    </div>
                </div>
                <div className="mb-4 mb-md-0">
                    <h5>TechnoShop</h5>
                    <hr />
                    <p>Email: info@technoshop.com</p>
                    <p>Tel: +39 xxx xxx xx </p>
                    <p>© 2025 TechnoShop. Tutti i diritti riservati.</p>
                </div>

                <div className="mb-4 mb-md-0">
                    <h6>Link utili</h6>
                    <hr />
                    <a href="#" className="d-block text-primary text-decoration-none">Chi siamo</a>
                    <a href="#" className="d-block text-primary text-decoration-none">Privacy</a>
                    <a href="#" className="d-block text-primary text-decoration-none">Termini di servizio</a>
                </div>



            </div>
        </footer>
    );
};

export default Footer;
