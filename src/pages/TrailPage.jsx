import { Link } from 'react-router-dom'
import { species } from '../data/species'
import { useDiscoveries } from '../hooks/useDiscoveries'

const milestones = [5, 10, 15, 20]

export default function TrailPage() {
  const { discoveries, reset } = useDiscoveries()
  const discoveredSpecies = species.filter((item) => discoveries.includes(item.slug))
  const progress = (discoveries.length / species.length) * 100
  const nextMilestone = milestones.find((value) => discoveries.length < value)

  return (
    <section className="trail-collection-page">
      <header className="trail-collection-hero">
        <div className="container trail-collection-hero__inner" data-reveal>
          <div className="trail-collection-hero__copy">
            <span className="eyebrow">MINHA JORNADA PELA MATA ATLÂNTICA</span>
            <h1>Sua trilha está ganhando vida.</h1>
            <p>
              Cada QR Code encontrado revela uma nova espécie e guarda uma lembrança da sua passagem pelo Festival Gabiroba.
            </p>
          </div>

          <div className="trail-orbit" aria-label={`${discoveries.length} de ${species.length} espécies descobertas`}>
            <div className="trail-orbit__ring" style={{ '--trail-progress': `${progress * 3.6}deg` }}>
              <div className="trail-orbit__center">
                <strong>{discoveries.length}</strong>
                <span>de {species.length}</span>
              </div>
            </div>
            <span className="trail-orbit__label">ESPÉCIES DESCOBERTAS</span>
          </div>
        </div>
      </header>

      <div className="container trail-collection-content">
        <section className="trail-status-card" data-reveal>
          <div className="trail-status-card__top">
            <div>
              <span className="eyebrow">PROGRESSO DA TRILHA</span>
              <h2>
                {discoveries.length === species.length
                  ? 'Trilha completa ✦'
                  : discoveries.length === 0
                    ? 'Sua primeira descoberta está esperando por você.'
                    : `${discoveries.length} ${discoveries.length === 1 ? 'história encontrada' : 'histórias encontradas'}.`}
              </h2>
            </div>
            <strong>{Math.round(progress)}%</strong>
          </div>

          <div className="progress-track large trail-progress-track">
            <span style={{ width: `${progress}%` }} />
          </div>

          <div className="trail-milestones" aria-label="Marcos da trilha">
            {milestones.map((value) => {
              const reached = discoveries.length >= value
              return (
                <div className={`trail-milestone ${reached ? 'is-reached' : ''}`} key={value}>
                  <span>{reached ? '✦' : value}</span>
                  <small>{value === 20 ? 'trilha completa' : `${value} espécies`}</small>
                </div>
              )
            })}
          </div>

          {nextMilestone && discoveries.length > 0 && (
            <p className="trail-next-step">
              Faltam <strong>{nextMilestone - discoveries.length}</strong> {nextMilestone - discoveries.length === 1 ? 'descoberta' : 'descobertas'} para o próximo marco.
            </p>
          )}
        </section>

        <section className="trail-stamps-section">
          <header className="compact-heading" data-reveal>
            <div>
              <span className="eyebrow">COLEÇÃO DE DESCOBERTAS</span>
              <h2>{discoveries.length ? 'Espécies que já cruzaram seu caminho.' : 'Sua coleção começa aqui.'}</h2>
            </div>
            <p>
              As espécies encontradas ganham um selo na sua coleção. Continue procurando as mudas espalhadas pelo Festival.
            </p>
          </header>

          {discoveredSpecies.length > 0 ? (
            <div className="trail-stamp-grid">
              {discoveredSpecies.map((item, index) => (
                <Link
                  className="trail-stamp-card"
                  to={`/especies/${item.slug}`}
                  key={item.slug}
                  data-reveal
                  style={{ '--stamp-index': index }}
                >
                  <div className="trail-stamp-card__image">
                    {item.image && <img src={item.image} alt={item.imageAlt || item.commonName} loading="lazy" />}
                    <span className="trail-stamp-card__seal" aria-hidden="true">✦</span>
                  </div>
                  <div className="trail-stamp-card__copy">
                    <span>{String(item.id).padStart(2, '0')} · ENCONTRADA</span>
                    <h3>{item.commonName}</h3>
                    <p>Revisitar espécie →</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="trail-empty-state" data-reveal>
              <span className="trail-empty-state__symbol" aria-hidden="true">✦</span>
              <h3>Nenhuma espécie descoberta ainda.</h3>
              <p>Encontre uma muda no Festival, escaneie o QR Code e volte aqui para ver sua coleção crescer.</p>
              <Link className="button button-primary" to="/especies">Conhecer as espécies</Link>
            </div>
          )}
        </section>

        <section className="trail-map-section" data-reveal>
          <div>
            <span className="eyebrow">AINDA HÁ MATA PARA DESCOBRIR</span>
            <h2>{species.length - discoveries.length} {species.length - discoveries.length === 1 ? 'espécie ainda espera' : 'espécies ainda esperam'} por você.</h2>
            <p>Use a coleção de espécies como guia e procure os QR Codes pelo Festival.</p>
          </div>
          <Link className="button button-ghost trail-map-button" to="/especies">Voltar para espécies</Link>
        </section>

        {discoveries.length > 0 && (
          <div className="trail-reset-area" data-reveal>
            <button className="text-link trail-reset-button" onClick={reset}>Reiniciar minha trilha</button>
            <span>Isso apaga apenas as descobertas salvas neste aparelho.</span>
          </div>
        )}
      </div>
    </section>
  )
}
