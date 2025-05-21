import React, { useEffect, useState, useContext, useCallback } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getSrc } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import Section from './section'

import './hero.scss'
import AppContext from '../core/app-context'
import { Container, Row } from 'react-bootstrap'

function shuffle(array) {
  let currentIndex = array.length
  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }
}

// todo: preload

const Hero = ({ obj, siteData }) => {
  const context = useContext(AppContext)
  const [mainBg, setMainBg] = useState(null)
  const [rotatorBg, setRotatorBg] = useState(null)
  const [preloadBg, setPreloadBg] = useState(null)
  const [rotatorActive, setRotatorActive] = useState(false)

  const maskImage = obj.portraitImage?.gatsbyImageData
  const styles = "block-hero " + (obj.styles ? obj.styles : "")
  const bgs = obj.backgroundImages
  if (obj.randomizeOrder) {
    shuffle(bgs)
  }

  let siteLogo = ""
  if (siteData?.siteLogo?.gatsbyImageData) {
    siteLogo = <GatsbyImage image={siteData.siteLogo.gatsbyImageData} className="site-logo" alt="site logo" />
  } else if (siteData?.siteLogo?.svg?.originalContent) {
    siteLogo = <div id="cgq-logo" dangerouslySetInnerHTML={{ __html: siteData.siteLogo.svg.originalContent }}></div>
  }

  let idx = 0
  const heroAnim = useCallback(() => {
    idx = (idx + 1) % (bgs.length * 2)
    //console.log('meow', idx, rotatorActive)
    if (idx % 2 === 0) {
      setMainBg(getSrc(bgs[idx % bgs.length]))
    } else {
      setRotatorBg(getSrc(bgs[idx % bgs.length]))
    }
    setPreloadBg(getSrc(bgs[(idx + 1) % bgs.length]))
    setRotatorActive(idx % 2 === 1)
  })

  const intervalDelay = obj.transitionInterval > 3000 ? obj.transitionInterval : 15000
  let intervalSingleton = null
  useEffect(() => {
    //console.log('meow effect')
    setMainBg(getSrc(bgs[0]))
    if (intervalSingleton == null)
      intervalSingleton = setInterval(heroAnim, intervalDelay)
  }, [])

  return (
    <section className={styles} style={{ backgroundImage: `url('${mainBg}')` }}>
      <div className={`rotator ${rotatorActive ? 'active' : ''}`} style={{ backgroundImage: `url('${rotatorBg}')` }}></div>
      <div className='rotator-preload' style={{ backgroundImage: `url('${preloadBg}')` }}></div>
      <Container>
        <Row>
          <div className="hero-image">
            <GatsbyImage image={maskImage} alt="composer portrait" transformOptions={{ fit: "contain" }} />
          </div>
          <div className="navbar-brand">
            {siteLogo}
            <p className="h1 visually-hidden">{obj.heading}</p>
          </div>
          <div className="navbar-lang">
            <Link to={context.altSlug} className="btn btn-light">{siteData?.languageToggleText}</Link>
          </div>
        </Row>
      </Container>
    </section>
  )
}

export default Hero

export const query = graphql`
  fragment ContentfulBlockHero on ContentfulBlockHero {
    heading
    styles
    portraitImage {
      gatsbyImageData
    }
    backgroundImages {
      gatsbyImageData
    }
    randomizeOrder
    transitionInterval
  }
`