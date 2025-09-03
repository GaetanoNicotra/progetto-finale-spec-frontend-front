import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductsList from './pages/ProductsList'
import ProductsDetail from './pages/ProductsDetail'
import DefaultLayouts from './layouts/DefaultLayouts'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayouts />}>
            <Route path="/" element={<ProductsList />} />
            <Route path="/product/:id" element={<ProductsDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
