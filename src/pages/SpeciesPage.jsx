import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import DiscoveryToast from '../components/DiscoveryToast'
import { getDisplayScientificName, species, speciesContent } from '../data/species'
import { useDiscoveries } from '../hooks/useDiscoveries'

export default function SpeciesPage() {
  const { slug } = useParams()
  const location = useLocation()
  const item = useMemo(() => species.find((s) => s.slug === slug), [slug])
  const { discoveries, discover } = useDiscoveries()
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const fromQr = new URLSearchParams(location.search).get('origem') === 'qrcode'
    if (fromQr && item) {
      const added = discover(item.slug)
      if (added) setShowToast(true)
    }
  }, [discover, item, location.search])

  if (!item) return <section className="container page-section"><h1>Espécie não encontrada.</h1></section>

  const content = speciesContent[item.slug]

  return (
    <>
      {showToast && <DiscoveryToast speciesName={item.commonName} total={discoveries.length + 1} onClose={() => setShowToast(false)} />}
      <article className="species-page">
        <header className="species-hero poster-section">
          <div className="container">
            <span className="eyebrow">VOCÊ ENCONTROU ✦</span>
            <div className="species-hero__number">{String(item.id).padStart(2, '0')} / 20</div>
            <h1>{item.commonName}</h1>
            {getDisplayScientificName(item.scientificName) && <p className="scientific-name">{getDisplayScientificName(item.scientificName)}</p>}
            <p className="species-intro">{content?.intro}</p>
          </div>
        </header>


        <section className="species-art-panel">
          <figure className="species-feature-photo"><img src={item.image} alt={item.imageAlt || item.commonName} /></figure>
        </section>

        <InfoSection number="01" title="Conheça" tone="cream"><p>{content.know}</p></InfoSection>
        <InfoSection number="02" title="Uma história da mata" tone="sand"><p>{content.history}</p></InfoSection>
        <InfoSection number="03" title={content.flavorsTitle || 'Sabores'} tone="mustard">
          <p>{content.flavors}</p>
          {content.chips?.length > 0 && <div className="chips">{content.chips.map((x) => <span key={x}>{x}</span>)}</div>}
        </InfoSection>
        <InfoSection number="04" title="Na natureza" tone="green"><p>{content.nature}</p></InfoSection>
        <InfoSection number="05" title="Cultive" tone="cream">
          <div className="cultivation-grid">{content.cultivation.map(([label, text]) => <div key={label}><span>{label}</span><strong>{text}</strong></div>)}</div>
        </InfoSection>
        <InfoSection number="06" title="Você sabia?" tone="pink"><p>{content.curiosity}</p></InfoSection>

        <footer className="species-footer container">
          <span className="eyebrow">FIM DA DESCOBERTA</span>
          <h2>Você conheceu {item.commonName}.</h2>
          <div className="hero-actions">
            <Link className="button button-primary" to="/minha-trilha">Ver minha trilha</Link>
            <Link className="button button-ghost" to="/especies">Explorar outras espécies</Link>
          </div>
        </footer>
      </article>
    </>
  )
}

function InfoSection({ number, title, tone, children }) {
  return <section className={`info-section tone-${tone}`}><div className="container info-section__inner"><span className="section-number">{number}</span><div><span className="eyebrow">{title.toUpperCase()}</span><h2>{title}</h2>{children}</div></div></section>
}
