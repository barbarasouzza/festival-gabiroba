import { NavLink } from 'react-router-dom'

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      <NavLink to="/" end>Início</NavLink>
      <NavLink to="/especies">Espécies</NavLink>
      <NavLink to="/minha-trilha">Minha trilha</NavLink>
      <a href="/#sobre">Sobre</a>
    </nav>
  )
}
