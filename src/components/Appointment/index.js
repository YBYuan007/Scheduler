import React from 'react'; 
import "./styles.scss";
import Header from './Header'; 
import Show from './Show'; 
import Empty from './Empty';



export default function Appointment (props) {
  return (
    <article className = "appointment"> 
      <Header time = {props.time} />
        {props.interview ? 
        <Show student= {props.interview.student}
              interviewer = {props.interview.interviewer.name}
              /> 
        : 
        <Empty /> }

    </article>
  )
}



// All Appointment components will render a Header that takes in a time prop.
// If props.interview (an interview object) is truthy 
// the Appointment will render the Show component, 
// else it should render the Empty component.