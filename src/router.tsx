import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
const IndexPage = lazy(() => import('./views/IndexPage'));
const FavoritePage = lazy(() => import('./views/FavoritePage'));
const GenerateAI = lazy(() => import('./views/GenerateAI'));

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={
                        <Suspense fallback='Cargando...'>
                            <IndexPage />
                        </Suspense>
                    } index />
                    <Route path="/favorites" element={
                        <Suspense fallback='Cargando...'>
                            <FavoritePage />
                        </Suspense>
                    } />
                    <Route path="/generate" element={
                        <Suspense fallback='Cargando...'>
                            <GenerateAI />
                        </Suspense>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
