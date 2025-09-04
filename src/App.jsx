import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductsList from './pages/ProductsList'
import ProductsDetail from './pages/ProductsDetail'
import DefaultLayouts from './layouts/DefaultLayouts'
import NotFoundPage from './pages/NotFoundPage'
import { ProductsProvider } from './contexts/ProductsContext'

function App() {

  return (
    <>
      <BrowserRouter>
        <ProductsProvider>
          <Routes>
            <Route element={<DefaultLayouts />}>
              <Route path="/" element={<ProductsList />} />
              <Route path="/product/:id" element={<ProductsDetail />} />
              <Route path='*' element={<NotFoundPage />} />
            </Route>
          </Routes>
        </ProductsProvider>
      </BrowserRouter>
    </>
  )
}

export default App
