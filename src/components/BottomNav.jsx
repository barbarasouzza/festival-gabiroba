import { Link, NavLink } from 'react-router-dom'

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      <NavLink to="/" end>Início</NavLink>
      <NavLink to="/especies">Espécies</NavLink>
      <Link to="/#sobre">Sobre</Link>
    </nav>
  )
}
