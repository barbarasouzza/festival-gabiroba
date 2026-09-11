import { Link } from 'react-router-dom'
import { getDisplayScientificName } from '../data/species'

export default function SpeciesCard({ item, discovered }) {
  return (
    <Link className={`species-card ${discovered ? 'is-discovered' : ''}`} to={`/especies/${item.slug}`} data-reveal>
      <div className="species-card__top">
        <span className="species-number">{String(item.id).padStart(2, '0')}</span>
        <span className="species-status">{discovered ? 'ENCONTRADA ✦' : 'DESCOBRIR →'}</span>
      </div>

      {item.image ? (
        <div className="species-photo-wrap">
          <img className="species-photo" src={item.image} alt={item.imageAlt || item.commonName} loading="lazy" />
        </div>
      ) : (
        <div className="species-illustration species-illustration--card" aria-hidden="true">
          <span className="leaf leaf-a" />
          <span className="leaf leaf-b" />
          <span className="fruit" />
        </div>
      )}

      <div className="species-card__copy">
        <h3>{item.commonName}</h3>
        {getDisplayScientificName(item.scientificName) && <p>{getDisplayScientificName(item.scientificName)}</p>}
      </div>
    </Link>
  )
}
