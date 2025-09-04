import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductsList from './pages/ProductsList'
import ProductsDetail from './pages/ProductsDetail'
import DefaultLayouts from './layouts/DefaultLayouts'
import NotFoundPage from './pages/NotFoundPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayouts />}>
            <Route path="/" element={<ProductsList />} />
            <Route path="/product/:id" element={<ProductsDetail />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
