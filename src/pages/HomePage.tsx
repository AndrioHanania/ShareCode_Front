import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="container">
      <h1 className="heading">Welcome to the JavaScript Code Share Platform</h1>
      <h2 className="subheading">
        Where you can share your code with your mentor for weekly lessons
      </h2>
      <div className="explanation">
        <div className="step">
          <div className="number">1.</div>
          <p className="description">
            The mentor chooses a JavaScript question from the{" "}
            <Link to="/lobby" className="styled-link">
              Lobby
            </Link>{" "}
            page.
          </p>
        </div>
        <div className="step">
          <div className="number">2.</div>
          <p className="description">
            The session starts, and the mentor shares their screen.
          </p>
        </div>
        <div className="step">
          <div className="number">3.</div>
          <p className="description">
            The student enters the session using the provided session ID on the{" "}
            <Link to="/code-block" className="styled-link">
              Code Block
            </Link>{" "}
            page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
