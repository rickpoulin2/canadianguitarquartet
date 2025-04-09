import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
//import MyLink from './mylink'
//import RichText from './richtext'

import './footer.scss'

const Footer = ({ copyrightLine, content, navItems = [], buildTime }) => {
  /*const navData = navItems?.map((i) =>
    <li key={i.id}></li>
  );*/
  const navData = (<>
    <li><a class="nav-link" target="_blank" href="https://www.facebook.com/cgqguitar" title="Facebook"><i class="fab fa-facebook"></i></a></li>
    <li><a class="nav-link" target="_blank" href="https://www.youtube.com/@cgqguitar" title="YouTube"><i class="fab fa-youtube"></i></a></li>
    <li><a class="nav-link" target="_blank" href="https://open.spotify.com/artist/227hOhA544j4C73lUdyboz" title="Spotify"><i class="fab fa-spotify"></i></a>
    </li>
    <li><a class="nav-link" target="_blank" href="https://soundcloud.com/canadian-guitar-quartet" title="Soundcloud"><i class="fab fa-soundcloud"></i></a>
    </li>
    <li><a class="nav-link" target="_blank" href="https://music.apple.com/ca/artist/canadian-guitar-quartet/548113628" title="Apple Music"><i
      class="fab fa-apple"></i></a></li></>)

  return (
    <footer>
      <div>
        <Container>
          <Row>
            <Col xs="12" md="7">
              <p className="footer-copyright">{copyrightLine}</p>
              <p>Web design by Rick Poulin.</p>
            </Col>

            <Col as="nav" xs="12" md="5">
              <ul className="nav">
                {navData}
              </ul>
              <div className="last-built">
                Last built: {new Date(buildTime).toLocaleString('en-CA', { timeZone: 'America/Toronto' })} ET
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  )
}

export default Footer

/*
export const query = graphql`
  fragment Footer on ContentfulSiteGlobals {
  }
`
*/