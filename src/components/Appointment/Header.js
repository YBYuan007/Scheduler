import React from 'react'; 


export default function Header (props) {
return  (<header className="appointment__time">
    <h4 className="text--semi-bold">{props.time} <hr/></h4>
    <hr className="appointment__separator" />
  </header>)

} 

// The Header contains a reference to the time of the appointment and 
// a separator line which is is rendered by the HTML horizontal rule hr / tag.

//accepting the following props: 
// time:String - the time of the appointment (e.g "12pm")