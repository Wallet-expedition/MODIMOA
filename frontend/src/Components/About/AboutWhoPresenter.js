import React from "react";

import GitHubIcon from "@material-ui/icons/GitHub";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

const authorList = [
  {
    name: "이명재",
    github: "LeeMir",
    email: "manofgodmj@gmail.com",
    role: "FE",
  },
  {
    name: "이상민",
    github: "poiu694",
    email: "olmnuiui70@gmail.com",
    role: "FE",
  },
  {
    name: "곽수인",
    github: "suin0730",
    email: "ei654028@gmail.com",
    role: "BE",
  },
  {
    name: "이현광",
    github: "Hyun-git",
    email: "mabr2845@gmail.com",
    role: "BE",
  },
];

const ProfileImg = ({ github }) => {
  return (
    <a href={`https://github.com/${github}`}>
      <img
        className="author-profile-img"
        src={`https://github.com/${github}.png`}
        alt="github-profile"
      />
    </a>
  );
};

const AuthorIcon = ({ github, email }) => {
  return (
    <div className="author-icon-container">
      <a href={`https://github.com/${github}`}>
        <GitHubIcon />
      </a>
      <a href={`mailto:${email}`}>
        <MailOutlineIcon />
      </a>
    </div>
  );
};

const AuthorBox = ({ info }) => {
  return (
    <div className="author-box-container">
      <ProfileImg github={info.github} />
      <span className="author-name">{info.name}</span>
      <AuthorIcon github={info.github} email={info.email} />
    </div>
  );
};

const AboutWhoPresenter = () => {
  return (
    <>
      <section className="about-who-container">
        <h1>FE</h1>
        <div className="author-container">
          {authorList
            .filter((person) => person.role === "FE")
            .map((person) => (
              <AuthorBox key={person.github} info={person} />
            ))}
        </div>
      </section>
      <section className="about-who-container">
        <h1>BE</h1>
        <div className="author-container">
          {authorList
            .filter((person) => person.role === "BE")
            .map((person) => (
              <AuthorBox key={person.github} info={person} />
            ))}
        </div>
      </section>
    </>
  );
};

export default AboutWhoPresenter;
