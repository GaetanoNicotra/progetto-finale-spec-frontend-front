import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductsList from './pages/ProductsList'
import ProductsDetail from './pages/ProductsDetail'
import DefaultLayouts from './layouts/DefaultLayouts'
import NotFoundPage from './pages/NotFoundPage'
import ComparisonPage from './pages/ComparisonPage'
import { CompareProvider } from './context/CompareContext'

function App() {

  return (
    <>
      <CompareProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayouts />}>
              <Route path="/" element={<ProductsList />} />
              <Route path="/product/:id" element={<ProductsDetail />} />
              <Route path='/confrontaPrezzi' element={<ComparisonPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CompareProvider>
    </>
  )
}

export default App
