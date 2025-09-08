import { createContext, useContext, useState } from 'react';

const FavoritiesContext = createContext();

export const FavoritiesProvider = ({ children }) => {

    // stato per salvare gli id dei prodotti favoriti
    const [favoritiesIds, setFavoritiesIds] = useState([]);

    const toggleFavorities = (id) => {
        // verifico se l’id del prodotto è già presente nell’array
        setFavoritiesIds(prev => prev.includes(id) ? prev.filter(p => p !== id)
            // se non c'è lo inserisco nell'array favoritiesIds
            : [...prev, id]);
    };

    // funzione per svuotare l'array
    const clearFavorities = () => setFavoritiesIds([]);

    return (
        <FavoritiesContext.Provider value={{ favoritiesIds, toggleFavorities, clearFavorities }}>
            {children}
        </FavoritiesContext.Provider>
    )

}

// Custom hook per usare il context 
export const useFavorites = () => useContext(FavoritiesContext);