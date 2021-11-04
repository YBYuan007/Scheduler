import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";

function InterviewerList(props) {
  const parsedInterviewerList = props.interviewers.map((ind) => {
    return (
      <InterviewerListItem
        id={ind.id}
        name={ind.name}
        avatar={ind.avatar}
        selected={ind.id === props.value}
        setInterviewer={() => props.onChange(ind.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">{parsedInterviewerList}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
