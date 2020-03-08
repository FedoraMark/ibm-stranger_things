import React from "react";
import { DropdownButton, Dropdown, Table } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";
import _ from "lodash";

import "./App.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import engData from "./data/en_US.json";
import pigData from "./data/la_PG.json";
import stLogo from "./images/stranger-things_raw.png";

let ENG = "English";
let PIG = "igPay atinLay";

let EP_SORT = "episodes";
let RT_SORT = "rating";

class App extends React.Component {
  state = {
    language: ENG,
    data: engData,
    episodeSort: EP_SORT,
    isAscending: true
  };

  // FUNCTIONS
  setLanguage = (newLanguage, newData) => {
    this.setState({ language: newLanguage, data: newData });
  };

  setSort = column => {
    if (this.state.episodeSort === column) {
      this.setState({ isAscending: !this.state.isAscending });
      return;
    }

    this.setState({ episodeSort: column, isAscending: column === EP_SORT });
  };

  convertToSortName = string => {
    return string
      .replace("One", "1")
      .replace("Two", "2")
      .replace("Three", "3")
      .replace("Four", "4")
      .replace("Five", "5")
      .replace("Six", "6")
      .replace("Seven", "7")
      .replace("Eight", "8")
      .replace("Nine", "9");
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
            return <li key={location}>{location}</li>;
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
            <div key={slide.src}>
              <img src={slide.src} alt={slide.text} />
              <p className="legend">{slide.text}</p>
            </div>
          );
        })}
      </Carousel>
    );
  };

  render_episodeTable = () => {
    var sortedEpisodeData = {};

    if (this.state.episodeSort === RT_SORT) {
      // rating sort
      sortedEpisodeData = _.sortBy(this.state.data["episode-list"], [
        o => {
          return o.rating;
        }
      ]);
    } else if (this.state.episodeSort === EP_SORT) {
      // numeric episode+season sort
      _.each(this.state.data["episode-list"], (value, key) => {
        sortedEpisodeData[key] = {
          ...value,
          sortName: this.convertToSortName(value.name)
        };
      });

      sortedEpisodeData = _.sortBy(sortedEpisodeData, ["season", "sortName"]);
    }

    // if descending
    if (!this.state.isAscending) {
      sortedEpisodeData = _.reverse(sortedEpisodeData);
    }

    return (
      <Table
        className="episodeTable"
        striped
        bordered
        hover
        responsive
        variant="dark"
      >
        <thead>
          <tr>
            <th className="season">Season</th>
            <th
              className="nameHeader sortable"
              onClick={e => {
                this.setSort(EP_SORT);
              }}
            >
              {this.state.episodeSort === EP_SORT ? (
                this.render_sortArrow()
              ) : (
                <span className="sortArrow invisible">&#9660;</span>
              )}
              <span className="dotted">Name</span>
            </th>
            <th
              className="ratingHeader sortable"
              onClick={e => {
                this.setSort(RT_SORT);
              }}
            >
              {this.state.episodeSort === RT_SORT ? (
                this.render_sortArrow()
              ) : (
                <span className="sortArrow invisible">&#9660;</span>
              )}
              <span className="dotted">Rating</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedEpisodeData.map((episode, index) => {
            return (
              <tr key={episode.name}>
                <td className="season">{episode.season}</td>
                <td>"{episode.name}"</td>
                <td>{episode.rating}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  render_sortArrow = () => {
    var arrow = "";
    switch (this.state.isAscending) {
      case true:
        return <span className="sortArrow">&#9650;</span>;
      case false:
        return <span className="sortArrow">&#9660;</span>;
      default:
        return <span className="sortArrow invisible">&#9660;</span>;
    }
  };

  // MAIN RENDER
  render() {
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
                allowFullScreen
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

            {this.render_episodeTable()}
          </div>
        </div>

        <footer className="footer"></footer>
      </div>
    );
  }
}

export default App;
