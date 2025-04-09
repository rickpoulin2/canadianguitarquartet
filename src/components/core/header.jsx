import React, { useState } from 'react'
import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image'
import { Navbar, Offcanvas, Container, Col } from 'react-bootstrap';
//import MyLink from './mylink'

import './header.scss'

const Header = ({ siteLogo, siteHeading = "", navItems = [], langLinkText }) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  /*const navData = navItems?.map((i) =>
    <li className="nav-item" key={i.id}></li>
  )*/
  const navData = (<>
    <li class="nav-item"><a href="home.html" class="nav-link px-3">Home</a></li>
    <li class="nav-item"><a href="about.html" class="nav-link px-3 active">About</a></li>
    <li class="nav-item"><a href="events.html" class="nav-link px-3">Events</a></li>
    <li class="nav-item"><a href="presskit.html" class="nav-link px-3">Press Kit</a></li>
    <li class="nav-item"><a href="updates.html" class="nav-link px-3">Updates</a></li>
    <li class="nav-item"><a href="contact.html" class="nav-link px-3">Contact</a></li>
  </>)
  const headerNav = (
    <>
      <Col as="nav" lg="">
        <ul className="navbar-nav">
          {navData}
        </ul>
      </Col>
    </>
  )

  return (
    <header>
      <Navbar variant="dark" expand="lg">
        <Container fluid="lg">
          <Navbar.Brand as="div">
            <Link to="/" className="site-heading" id="top-of-page">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 110">
                <g id="cgq-logo">
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
                </g>
              </svg>
              <p class="visually-hidden">{siteHeading}</p>
            </Link>
          </Navbar.Brand>
          <div className="desktop-nav">
            {headerNav}
            <div class="navbar-lang">
              <a href="#" class="btn btn-outline-light">{langLinkText}</a>
            </div>
          </div>
          <Navbar.Toggle aria-controls="mobilenav" onClick={handleShow} />
          <Offcanvas id="mobilenav" show={show} onHide={handleClose} placement="end" aria-labelledby="mobilenav-heading">
            <Offcanvas.Header closeButton="true" closeVariant="white">
              <Link to="/" className="site-heading">
                <Offcanvas.Title as="p" className="h3" id="mobilenav-heading">{siteHeading}</Offcanvas.Title>
              </Link>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {headerNav}
              <div class="navbar-lang">
                <a href="#" class="btn btn-outline-primary">{langLinkText}</a>
              </div>
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