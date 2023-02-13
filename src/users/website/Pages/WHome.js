import React from "react";
import About from "../Components/About";
import Courses from "../Components/Courses";
import Homebanner from "../Components/Homebanner";
import Media from "../Components/Media";
import WebsiteHome from "../Screens/WebsiteHome";

export default function WHome() {
  return (
    <WebsiteHome>
      {/* hello */}
      <Homebanner />
      <About />
      <Media />
      <Courses />
    </WebsiteHome>
  );
}
