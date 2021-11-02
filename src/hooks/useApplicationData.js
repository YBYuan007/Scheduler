import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData () {

  const [state, setState] = useState ({
    day: "Monday",
    days: [],
    appointments:{},
    interviewers: {}}
  )

  const setDay = day => setState({ ...state, day }); // retain the setDay other info

  useEffect( () => {
    Promise.all ([
      axios.get ('http://localhost:8001/api/days'), 
      axios.get ('http://localhost:8001/api/appointments'),
      axios.get ('http://localhost:8001/api/interviewers')
    ])
    .then ((res) => {
      setState(prev => ({...prev, days: res[0].data, appointments: res[1].data, interviewers: res[2].data}))
    })
  },[]);


  const bookInterview = (id, interview) => { 
    // console.log("application----> bookInterview: ", id, interview); 
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    setState({...state, appointments});
    // console.log(setState);

   return axios.put(`http://localhost:8001/api/appointments/${id}`, 
        interview)

  }

  const cancelInterview = (id) => {
    // console.log("application -----> cancelInterview: ", id) ; 
    const appointment = {
      ...state.appointments[id], 
      interview: null 
    }
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    } 

    setState({...state, appointments});

   return axios.delete(`http://localhost:8001/api/appointments/${id}`, 
    {
      id
    })
  }
  return { state, setDay, bookInterview, cancelInterview };
} 


// The state object will maintain the same structure.
// The setDay action can be used to set the current day.
// The bookInterview action makes an HTTP request and updates the local state.
// The cancelInterview action makes an HTTP request and updates the local state.