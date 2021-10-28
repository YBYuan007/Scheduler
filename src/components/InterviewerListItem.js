import React from 'react'; 
import 'components/InterviewerListItem.scss'; 
import classNames from 'classnames'; 

export default function InterviewerListItem (props) {

  let InterviewerListClass = classNames (
    "interviewers__item", 
    {"interviewers__item" : false , "interviewers__item--selected" : props.selected}
  )

  let InterviewerListImgClass = classNames (
    "interviewers__item-image", 
    {"interviewers__item-image" : false, "interviewers__item-image--selected-image" : props.selected}
  )

 return (
  // <li className = {InterviewerListClass} onClick = {() => props.setInterviewer(props.id)}>
  <li className = {InterviewerListClass} onClick = {props.setInterviewer}>
    <img 
    className = {InterviewerListImgClass}
    src = {props.avatar}
    alt = {props.name}
    />
    {props.selected ? props.name : null}
  </li> 
 )
} 


// id:number - the id of the interviewer
// name:string - the name of the interviewer
// avatar:url - a url to an image of the interviewer
// selected:boolean
// setInterviewer:function