import SpeciesCard from '../components/SpeciesCard'
import { species } from '../data/species'
import { useDiscoveries } from '../hooks/useDiscoveries'

export default function TrailPage() {
  const { discoveries, reset } = useDiscoveries()
  const progress = (discoveries.length / species.length) * 100

  return (
    <section className="container page-section trail-page">
      <span className="eyebrow">MINHA JORNADA PELA MATA ATLÂNTICA</span>
      <h1>{discoveries.length} de 20 espécies descobertas</h1>
      <div className="progress-track large"><span style={{ width: `${progress}%` }} /></div>
      <p className="muted">Encontre as mudas pelo evento e escaneie seus QR Codes para completar a trilha.</p>
      <div className="species-grid compact">
        {species.map((item) => (
          <SpeciesCard key={item.slug} item={item} discovered={discoveries.includes(item.slug)} />
        ))}
      </div>
      <button className="button button-ghost reset-button" onClick={reset}>Reiniciar trilha</button>
    </section>
  )
}
