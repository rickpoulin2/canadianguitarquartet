import React, { useState } from 'react'
import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image'
import { Navbar, Offcanvas, Container, Col } from 'react-bootstrap';
//import MyLink from './mylink'

import './header.scss'

const Header = ({ siteLogo, siteHeadingStart = "", siteHeadingEnd = "", navItems = [], buttonLink }) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const navData = navItems?.map((i) =>
    <li className="nav-item" key={i.id}></li>
  )
  const headerNav = (
    <>
      <Col as="nav" lg="">
        <ul className="navbar-nav">
          {navData}
        </ul>
      </Col>
      <div className="navbar-cta">
      </div>
    </>
  )

  return (
    <header>
      <nav class="navbar navbar-expand-lg">
        <div class="container-lg">
          <div class="navbar-brand">
            <a href="home.html" class="d-inline-flex link-body-emphasis text-decoration-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 110">

                <path d="M 23 5 V 31" />
                <path d="M 16 81 H 30" />
                <path d="M 9 65 A 12 12 0 0 1 16 44" />
                <path d="M 38 65 A 22 22 0 0 1 24 102" />
                <circle cx="23" cy="57" r="3" />

                <text x="85" y="25">Canadian</text>
                <path d="M 280 15 H 300" />
                <text x="85" y="65">Guitar</text>
                <path d="M 230 55 H 300" />
                <text x="85" y="105">Quartet</text>
                <path d="M 255 95 H 300" />
              </svg>
            </a>
            <p class="h1 visually-hidden">Canadian Guitar Quartet</p>
          </div>
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div class="offcanvas-header">
              <a href="home.html" class="d-inline-flex link-body-emphasis text-decoration-none">
                <img src="img/sitelogo.png" style={{ maxHeight: "30px", marginRight: "1em" }} />
              </a>
              <p class="h3 offcanvas-title" id="offcanvasDarkNavbarLabel">Canadian Guitar Quartet</p>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <nav class="col-lg">
                <ul class="navbar-nav">
                  <li class="nav-item"><a href="home.html" class="nav-link px-3">Home</a></li>
                  <li class="nav-item"><a href="about.html" class="nav-link px-3 active">About</a></li>
                  <li class="nav-item"><a href="events.html" class="nav-link px-3">Events</a></li>
                  <li class="nav-item"><a href="presskit.html" class="nav-link px-3">Press Kit</a></li>
                  <li class="nav-item"><a href="updates.html" class="nav-link px-3">Updates</a></li>
                  <li class="nav-item"><a href="contact.html" class="nav-link px-3">Contact</a></li>
                </ul>
              </nav>
              <div class="navbar-lang">
                <a href="#" class="btn btn-outline-light">Français</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Navbar variant="dark" expand="lg">
        <Container fluid="lg">
          <Navbar.Brand as="div">
            <Link to="/" className="site-heading" id="top-of-page">
              <p className="h1"><span>{siteHeadingStart}</span> {siteHeadingEnd}</p>
            </Link>
          </Navbar.Brand>
          <div className="desktop-nav">
            {headerNav}
          </div>
          <Navbar.Toggle aria-controls="mobilenav" onClick={handleShow} />
          <Offcanvas id="mobilenav" show={show} onHide={handleClose} placement="end" aria-labelledby="mobilenav-heading">
            <Offcanvas.Header closeButton="true" closeVariant="white">
              <Link to="/" className="site-heading">
                <Offcanvas.Title as="p" className="h3" id="mobilenav-heading">{siteHeadingStart} {siteHeadingEnd}</Offcanvas.Title>
              </Link>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {headerNav}
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header

/*
export const query = graphql`
  fragment Header on ContentfulSiteGlobals {
  }
`
*/