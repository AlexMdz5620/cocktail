import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
  const [searchFilter, setSearchFilter] = useState({
    ingredient: '',
    category: '',
  })
  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === '/', [pathname]);

  const categories = useAppStore(state => state.categories);
  const fetchCategories = useAppStore(state => state.fetchCategories);
  const searchRecipies = useAppStore(state => state.searchRecipies);
  const showNotification = useAppStore(state => state.showNotification);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchFilter({
      ...searchFilter,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(searchFilter).includes('')) {
      showNotification({ text: 'Todos los campos son obligatorios', error: true });
      return;
    }

    searchRecipies(searchFilter);
  }

  return (
    <header className={isHome ? "bg-[url('/bg.jpg')] bg-center bg-cover" : 'bg-slate-800'}>
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img className="w-32" src="/logo.svg" alt="logotipo" />
          </div>
          <nav className="flex gap-5">
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'}
            >
              Inicio
            </NavLink>
            <NavLink to="/favorites" className={({ isActive }) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'} >
              Favoritos
            </NavLink>
            <NavLink to="/generate" className={({ isActive }) => isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'} >
              Generar con IA
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <form
            className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="space-y-5">
              <label
                htmlFor="ingredient"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Nombre o Ingrediente
              </label>
              <input
                type="text"
                name="ingredient"
                id="ingredient"
                className="bg-white p-3 w-full rounded-lg focus:outline-none"
                placeholder="Nombre o Ingrediente - Ej: Vodka, Tequila, Café..."
                value={searchFilter.ingredient}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-5">
              <label
                htmlFor="category"
                className="block text-white uppercase font-extrabold text-lg"
              >
                Categoría
              </label>
              <select
                name="category"
                id="category"
                className="bg-white p-3 w-full rounded-lg focus:outline-none"
                value={searchFilter.category}
                onChange={handleChange}
              >
                <option value="">-- Seleccione --</option>
                {categories.drinks.map(drink => (
                  <option key={drink.strCategory} value={drink.strCategory}>{drink.strCategory}</option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value='Buscar Recetas'
              className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
            />
          </form>
        )}
      </div>
    </header>
  )
}
