import React, { useState } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const firstDataRow = [
  {
    title: "帳號指南",
    link: "/support/account",
    icon: "https://i.pixi.mg/i/bcec042d9f0934ed844142c8.png",
    description: (
      <>
        獲取關於帳號的各種問題
      </>
    ),
  },
  {
    title: "論壇指南",
    link: "/support/forum",
    icon: "https://i.pixi.mg/i/0f22ac87f01fc3bcf4eb5e1a.png",
    description: (
      <>
        獲取關於雙龍體育論壇的各種問題
      </>
    ),
  },
  {
    title: "聯繫客服指南",
    link: "/support/contact",
    icon: "https://i.pixi.mg/i/9fc6afa4a247e7e23342bac0.png",
    description: (
      <>
        了解如何聯繫雙龍體育
      </>
    ),
  },
];

const secondDataRow = [
  {
    title: "文章撰寫中",
    link: "/support",
    description: (
      <>
       文章撰寫中
      </>
    ),
  },
  {
    title: "文章撰寫中",
    link: "/support",
    description: (
      <>
        文章撰寫中
      </>
    ),
  },
  {
    title: "文章撰寫中",
    link: "/support",
    description: (
      <>
      文章撰寫中
      </>
    ),
  },
];

function Feature({ title, link, icon, description }) {
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      <Link
        to={useBaseUrl(link)}
        className={
          hovered
            ? clsx("padding--lg margin-bottom--lg item shadow--tl", styles.card)
            : clsx("padding--lg margin-bottom--lg item shadow--lw", styles.card)
        }
        onMouseOver={toggleHover}
        onMouseOut={toggleHover}
      >
        <div>
          <div className={clsx(styles.titles)}>
            <h4>{title}</h4>
            <p>{description}</p>
          </div>
          <img
            alt="尚無圖片"
            style={{ height: "70px", width: "70px" }}
            src={useBaseUrl(icon)}
          />
        </div>
      </Link>
    </div>
  );
}

function Features() {
  return (
    <>
      {firstDataRow && firstDataRow.length > 0 && (
        <section className={clsx("home-container", styles.features)}>
          <div className={clsx("row margin-horiz--lg")}>
            <div className={clsx("col col--2")}>
              <h3 className="container-h3">瀏覽所有類別</h3>
            </div>
            <div className={clsx("col col--10")}>
              <div className={clsx("row")}>
                {firstDataRow.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
            <div className={clsx("col col--2")}></div>
            <div className={clsx("col col--10")}>
              <div className={clsx("row")}>
                {secondDataRow.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Features;
