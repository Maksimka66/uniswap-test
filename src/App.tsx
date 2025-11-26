import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import BuyPage from './pages/BuyPage'
import LimitPage from './pages/LimitPage'
import SwapPage from './pages/SwapPage'
import SellPage from './pages/SellPage'

import './App.css'

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/swap' element={<SwapPage />} />
                <Route path='/limit' element={<LimitPage />} />
                <Route path='/buy' element={<BuyPage />} />
                <Route path='/sell' element={<SellPage />} />
            </Routes>
        </>
    )
}

export default App

