import React from "react";
import "./App.scss";

import engData from "./data/en_US.json";
import pigData from "./data/la_PG.json";

import stLogo from "./images/stranger-things_raw.png";

//import {} from 'react-bootstrap';
import { DropdownButton, Dropdown } from "react-bootstrap";

let ENG = "English";
let PIG = "igPay atinLay";

class App extends React.Component {
  state = { language: ENG, data: engData };

  setLanguage = (newLanguage, newData) => {
    this.setState({ language: newLanguage, data: newData });
  };

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

  render() {
    console.log(this.state.data);
    return (
      <div>
        {this.render_titleBar()}

        <div className="navBar">
          {this.render_navLink("Inspiration", "#inspiration")}
          {this.render_navLink("Gallery", "#gallery")}
          {this.render_navLink("Episodes", "episodes")}
        </div>

        <div className="contentWrapper">
          <h1 className="heading">{this.state.data.heading}</h1>

          <div className="inspiration" id="inspiration">
            <h2 className="sectionTitle">Inspiration</h2>

            <div className="insp-row row1">
              <div className="logo">
                <img src={stLogo} alt="Stranger Things logo" />
              </div>
              <div>
                <p className=" description">{this.state.data.description}</p>
              </div>
            </div>

            <p className="snippet">{this.state.data.snippets[0]}</p>

            <div className="insp-row row2">
              <p>TEST</p>
              <video controls>
                <source src={this.state.data["video-embed"]} type="mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
