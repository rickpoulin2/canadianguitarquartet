import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Navbar, Offcanvas, Container, Col } from 'react-bootstrap'
import MyLink from '../page/mylink'

import './header.scss'

const Header = ({ siteData, altPage }) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const homeLink = `/${siteData?.node_locale}/`
  const navData = siteData?.headerNavigation?.map((i) =>
    <li className="nav-item" key={i.id}><MyLink obj={i} addClasses="nav-link" activeClass="active" onClick={handleClose} /></li>
  )
  const headerNav = (
    <>
      <Col as="nav" lg="">
        <ul className="navbar-nav">
          {navData}
        </ul>
      </Col>
    </>
  )

  let siteLogo = ""
  if (siteData?.siteLogo?.gatsbyImageData) {
    siteLogo = <GatsbyImage image={siteData.siteLogo.gatsbyImageData} className="site-logo" alt="site logo" />
  } else if (siteData?.siteLogo?.svg?.originalContent) {
    siteLogo = <div id="cgq-logo" dangerouslySetInnerHTML={{ __html: siteData.siteLogo.svg.originalContent }}></div>
  }

  let headerSocials = siteData?.headerSocials?.map((i) =>
    <li key={i.id}><MyLink obj={i} addClasses="nav-link" /></li>
  )
  let footerSocials = siteData?.footerNavigation?.map((i) =>
    <li key={i.id}><MyLink obj={i} addClasses="nav-link" /></li>
  )

  return (
    <header id="mainnav">
      <Navbar variant="dark" expand="lg">
        <Container fluid="lg">
          <Navbar.Brand as="div">
            <Link to={homeLink} className="site-heading" id="top-of-page">
              {siteLogo}
              <p className="visually-hidden">{siteData?.siteTitle}</p>
            </Link>
          </Navbar.Brand>
          <div className="desktop-nav">
            {headerNav}
            <ul class="nav navbar-socials">
              {headerSocials}
            </ul>
            <div className="navbar-lang">
              <Link to={altPage} className="btn btn-outline-light">{siteData?.languageToggleText}</Link>
            </div>
          </div>
          <Navbar.Toggle aria-controls="mobilenav" onClick={handleShow} />
          <Offcanvas id="mobilenav" show={show} onHide={handleClose} placement="end" aria-labelledby="mobilenav-heading">
            <Offcanvas.Header closeButton="true" closeVariant="white">
              <Link to={homeLink} className="site-heading">
                <Offcanvas.Title as="p" className="h3" id="mobilenav-heading">{siteData?.siteTitle}</Offcanvas.Title>
              </Link>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {headerNav}
              <div className="navbar-lang">
                <Link to={altPage} className="btn btn-outline-primary">{siteData?.languageToggleText}</Link>
              </div>
              <ul class="nav navbar-socials">
                {footerSocials}
              </ul>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header

export const query = graphql`
  fragment Header on ContentfulSiteGlobals {
    node_locale
    siteTitle
    siteLogo {
      gatsbyImageData(layout:FIXED)
      svg {
        originalContent
      }
    }
    languageToggleText
    headerNavigation {
      ... MyLink
    }
    headerSocials {
      ... MyLink
    }
    footerNavigation {
      ... MyLink
    }
  }
`