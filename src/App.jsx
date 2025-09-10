import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductsList from './pages/ProductsList'
import ProductsDetail from './pages/ProductsDetail'
import DefaultLayouts from './layouts/DefaultLayouts'
import NotFoundPage from './pages/NotFoundPage'
import ComparisonPage from './pages/ComparisonPage'
import { CompareProvider } from './context/CompareContext'
import Favorites from './pages/Favorites'
import { FavoritiesProvider } from './context/FavoritesContext'
import ScootersPage from './pages/ScootersPage'
import ScootersDetail from './pages/ScootersDetail'

function App() {

  return (
    <>
      <FavoritiesProvider>
        <CompareProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<DefaultLayouts />}>
                <Route path="/" element={<ProductsList />} />
                <Route path="/product/:id" element={<ProductsDetail />} />
                <Route path='/confrontaPrezzi' element={<ComparisonPage />} />
                <Route path='/favorites' element={<Favorites />} />
                <Route path='/scooters' element={<ScootersPage />} />
                <Route path='/scooters/:id' element={<ScootersDetail />} />
                <Route path='*' element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CompareProvider>
      </FavoritiesProvider>
    </>
  )
}

export default App
