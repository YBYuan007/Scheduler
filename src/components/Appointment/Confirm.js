import React from 'react'; 
import Button from '../Button';

export default function Comfirm (props) {
  console.log("props in Confirm page: ", props);
  return (
    <main className="appointment__card appointment__card--confirm">
    <h1 className="text--semi-bold">{props.message}</h1>
    <section className="appointment__actions">
      <Button danger onClick = {props.onCancel}>Cancel</Button>
      <Button danger onClick = {props.onConfirm}>Confirm</Button>
    </section>
  </main>

  )
} 



// message:String eg. "Delete the appointment?"
// onConfirm:Function to be called when the user clicks the Confirm button
// onCancel:Function to be called when the user clicks the Cancel button