import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
//Components
import ExploreContent from "../components/ExploreContent/ExploreContent";
//import DiscoverYourPath from "../components/DiscoverYourPath/DiscoverYourPath";
import SearchBar from '@theme/SearchBar'
import ChatwootWidget from '../components/ChatwootWidget'


function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout description="歡迎來到雙龍體育支援中心.">
      <header className={clsx("hero", styles.heroBanner)}>
        <div className="container">
          
          <h1 className="hero__title">我們能幫助你什麼嗎？</h1>
          <div className="searchDiv">
            <SearchBar />
          </div>
        </div>
      </header>
      <hr></hr>
      <ExploreContent />
      <hr></hr>
      <main>
     </main>
    </Layout>
  );
}

export default Home;
