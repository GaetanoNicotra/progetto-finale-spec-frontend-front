import { createContext, useContext, useState } from 'react';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {

    // variabile per salvare gli id
    const [compareIds, setCompareIds] = useState([]);

    const toggleCompare = (id) => {
        setCompareIds(prev =>
            prev.includes(id)
                // verifico se l’id del prodotto è già presente nell’array
                ? prev.filter(item => item !== id)
                // se non c'è lo inserisco nell'array compareId
                : [...prev, id]
        );
    };

    // funzione per svuotare l'array della page comparatore
    const clearCompare = () => setCompareIds([]);

    return (
        <CompareContext.Provider value={{ compareIds, toggleCompare, clearCompare }}>
            {children}
        </CompareContext.Provider>
    );
};

// Custom hook per accedere facilmente al CompareContext
// useContext permette di leggere il valore di un Context
// CompareContext contiene i dati e le funzioni del comparatore prodotti
// Chiamando useCompare() in un componente ottengo quello che c'è in CompareContext
export const useCompare = () => useContext(CompareContext);
