import React from "react";

const About = () => {
  const [theme] = React.useState(localStorage.getItem("theme") || "light");
  return( 
  <div className={theme === "dark" ? "dark-mode" : " "}>
    About
    </div>);
};

export default About;
