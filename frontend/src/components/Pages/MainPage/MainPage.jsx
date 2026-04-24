import React from "react";
import Contact from "./Contact";
import Hero from "./Hero";
import Forum from "./Forum";

function MainPage() {
  return (
    <div>
      {/* //hero, forum, contact 순서대로 쌓기(불러오기) */}
      <Hero />
      <Forum />
      <Contact />
    </div>
  );
}

export default MainPage;
