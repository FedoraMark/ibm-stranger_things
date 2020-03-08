import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import _ from "lodash";

import "./App.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import engData from "./data/en_US.json";
import pigData from "./data/la_PG.json";
import stLogo from "./images/stranger-things_raw.png";

let ENG = "English";
let PIG = "igPay atinLay";

class App extends React.Component {
  state = { language: ENG, data: engData };

  // FUNCTIONS
  setLanguage = (newLanguage, newData) => {
    this.setState({ language: newLanguage, data: newData });
  };

  // RENDER PARTS
  render_titleBar = () => {
    return (
      <div className="titleBar">
        <h1 className="title">IBM RTP Stranger Things Fanclub</h1>

        <DropdownButton variant="danger" title="Language" alignRight>
          <Dropdown.Item
            eventKey="1"
            active={this.state.language === ENG}
            onSelect={e => this.setLanguage(ENG, engData)}
          >
            {ENG}
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="2"
            active={this.state.language === PIG}
            onSelect={e => this.setLanguage(PIG, pigData)}
          >
            {PIG}
          </Dropdown.Item>
        </DropdownButton>
      </div>
    );
  };

  render_navLink = (title, id) => {
    return (
      <div className="navBox">
        <a href={id} className="navLink">
          {title}
        </a>
      </div>
    );
  };

  render_locationList = () => {
    return (
      <div className="locationWrapper">
        <h4>Locations include:</h4>
        <ul className="locations">
          {_.map(this.state.data.locations, location => {
            return <li>{location}</li>;
          })}
        </ul>
      </div>
    );
  };

  render_galleryCarousel = () => {
    return (
      <Carousel
        className="galleryWrapper"
        showThumbs={false}
        dynamicHeight
        infiniteLoop
      >
        {_.map(this.state.data.gallery, slide => {
          return (
            <div>
              <img src={slide.src} alt={slide.text} />
              <p className="legend">{slide.text}</p>
            </div>
          );
        })}
      </Carousel>
    );
  };

  // MAIN RENDER
  render() {
    console.log(this.state.data);
    return (
      <div>
        {this.render_titleBar()}

        <div className="navBar">
          {this.render_navLink("Top", "#")}
          {this.render_navLink("Inspiration", "#inspiration")}
          {this.render_navLink("Gallery", "#gallery")}
          {this.render_navLink("Episodes", "#episodes")}
        </div>

        <div className="contentWrapper">
          <h1 className="heading">{this.state.data.heading}</h1>

          <p className="snippet">{this.state.data.snippets[0]}</p>

          <div className="section inspiration" id="inspiration">
            <h2 className="sectionTitle">Inspiration</h2>

            <div className="insp-row row1">
              <div>
                <img className="logo" src={stLogo} alt="Stranger Things logo" />
                <p className="description">{this.state.data.description}</p>
                <p className="description">{this.state.data.snippets[1]}</p>
                <p className="description">{this.state.data.snippets[2]}</p>
              </div>
            </div>

            <div className="insp-row row2">
              <div className="quote">
                <div className="textWrapper">
                  <span className="quoteMarks">&#10077;</span>
                  <p className="text">{this.state.data.quote.text}</p>
                  <span className="quoteMarks">&#10078;</span>
                </div>
                <p className="author">
                  &ndash;&nbsp;{this.state.data.quote.author}
                </p>
              </div>

              <iframe
                title="embed"
                className="video"
                src={this.state.data["video-embed"]}
                width="640"
                height="400"
                frameBorder="0"
                allowFullScreen="true"
              ></iframe>
            </div>
          </div>

          <div className="section gallery" id="gallery">
            <h2 className="sectionTitle">Gallery</h2>

            <div className="galleryWrapper">
              {this.render_locationList()}
              {this.render_galleryCarousel()}
            </div>
          </div>

          <div className="section episodes" id="episodes">
            <h2 className="sectionTitle">Episodes</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
