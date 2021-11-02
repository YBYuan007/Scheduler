import React, { useState } from 'react'; 
import InterviewerList from "../InterviewerList";
import Button from "../Button";
import useVisualMode from 'hooks/useVisualMode';
import Appointment from './index';

export default function Form (props) {
  console.log("this is form props: ", props);
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);


  // console.log("this is person is the interviewer: ", interviewer, setInterviewer);
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset(); 
    props.onCancel();
    // back(EMPTY);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left" >
        <form autoComplete="off"  onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            /*
              This must be a controlled component
              your code goes here
            */
          value= {student}
          onChange = {(event) => setStudent(event.target.value)}
          />
        </form>

        <InterviewerList 
        interviewers = {props.interviewers} 
        value = {interviewer} 
        onChange = {setInterviewer}
        />
      </section>

      <section className="appointment__card-right" >
        <section className="appointment__actions">
          {/* {console.log("let me check mode1", mode)} */}
          <Button danger onClick={(cancel)} >Cancel</Button>
          <Button confirm onClick = {() => {
                                    console.log("student name: ", student, "interviewer number is: ", interviewer); 
                                    props.onSave(student, interviewer); 
                                    // const interview = {student, interviewer: {id: interviewer, name: , avatar: }}
                                    // props.bookInterview ( appointment id and interview as arguments from within the save function. )
                                   }} >Save</Button>
          {/* {console.log("let me check mode2", mode)} */}
          
        </section>
      </section>
    </main>
  
  )
}



// {mode === EMPTY && <Appointment {...props}/>}
// interview object includes information: student: "name", interviewer: {id: name: avatar:}


