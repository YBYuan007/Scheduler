import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";
import useVisualMode from "hooks/useVisualMode";
import Appointment from "./index";

export default function Form(props) {
  console.log("this is form props: ", props);
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // console.log("this is person is the interviewer: ", interviewer, setInterviewer);
  const reset = () => {
    setError("");
    setStudent("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
    // back(EMPTY);
  };

  const validate = (student, interviewer) => {
    setError("");
    if (student === "") {
      setError("student name cannot be blank");
      return;
    }
     props.onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <section className="appointment__validation"> {error} </section>

        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>

      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => validate(student, interviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}

// {mode === EMPTY && <Appointment {...props}/>}
// interview object includes information: student: "name", interviewer: {id: name: avatar:}
