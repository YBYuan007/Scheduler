import React from 'react'; 
import 'components/InterviewerList.scss';
import InterviewerListItem from 'components/InterviewerListItem'; 

export default function InterviewerList (props) {
const parsedInterviewerList = props.interviewers.map (ind => { 
  return <
    InterviewerListItem
          id = {ind.id}
          name = {ind.name}
          avatar = {ind.avatar}
          selected = {ind.id === props.value}
          setInterviewer = {()=>props.onChange(ind.id)}
          />
})

  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewers</h4>
    <ul className="interviewers__list">{parsedInterviewerList}</ul>
    </section>
    )
} 

// id:number - the id of the interviewer
// name:string - the name of the interviewer
// avatar:url - a url to an image of the interviewer
// selected:boolean
// setInterviewer:function


// interviewers:array - an array of objects as seen above
// setInterviewer:function - a function that accepts an interviewer id. This function will simply be passed down to the InterviewerListItem
// interviewer:number - a number that represents the id of the currently selected interviewer

