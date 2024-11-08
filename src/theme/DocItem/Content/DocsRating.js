import React, { useState } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const DocsRating = ({ label }) => {
  if (!ExecutionEnvironment.canUseDOM) return null;

  const location = window.location;
  const [haveVoted, setHaveVoted] = useState(false);
  const [liked, setLiked] = useState(false);

  const giveFeedback = (value) => {
    if (window.ga) {
      window.ga("send", {
        hitType: "event",
        eventCategory: "button",
        eventAction: "feedback",
        eventLabel: label,
        eventValue: value,
      });
    }
    setLiked(value === 1);
    setHaveVoted(true);
  };

  const feedbackMessage = haveVoted
    ? liked
      ? "Thanks for letting us know!"
      : `Thanks for your feedback! If you need further help, visit our 
          <a href="https://slack.openmainframeproject.org/">Slack Channel</a> 
          or <a href="https://github.com/zowe/docs-site/issues/new?assignees=&labels=&template=---doc-error-report.md&title=Issue with docs.zowe.org${location.pathname}">report an issue</a>.`
    : (
        <div className="text--center">
          <h3>Was this topic helpful?</h3>
          <div className="display-flex justify-content--center">
            <button onClick={() => giveFeedback(1)} className="user-options">Yes</button>
            <button onClick={() => giveFeedback(0)} className="user-options">No</button>
          </div>
        </div>
      );

  return <div className="docsRating margin-auto margin-top--lg">{feedbackMessage}</div>;
};

export default DocsRating;
