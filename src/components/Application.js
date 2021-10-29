import React, {useState, useEffect} from "react";
import DayList from 'components/DayList'; 
import axios from "axios";
import { getAppointmentsForDay } from "../helpers/selectors.js";

import "components/Application.scss";
import Appointment from "components/Appointment";
import { action } from "@storybook/addon-actions/dist/preview";



export default function Application(props) {
  const [state, setState] = useState ({
    day: "Monday",
    days: [],
    appointments:{}}
  )
  const dailyAppointments = getAppointmentsForDay(state,state.day);
  // const dailyAppointments = [];
  // console.log("daily appointments: ",dailyAppointments);

  const setDay = day => setState({ ...state, day }); // retain the setDay other info
  // const setDays = days => setState(prev => ({ ...prev, days })); // retain the setDays other info

  useEffect( () => {
    Promise.all ([
      axios.get ('http://localhost:8001/api/days'), 
      axios.get ('http://localhost:8001/api/appointments')
      // axios.get ('http://localhost:8001/api/interviewers')
    ])
    .then ((res) => {
      console.log(res[1].data);
      setState(prev => ({...prev, days: res[0].data, appointments: res[1].data}))
    })
  },[]);

  const parsedAppointment = dailyAppointments.map(appointment => {
    return <Appointment key={appointment.id}
                        time = {appointment.time}
                        interview = {appointment.interview}
                        />
  },[])

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu" >
          <DayList 
          days = {state.days}
          value = {state.day}
          onChange = {setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {parsedAppointment}
      </section>
    </main>
  );
}

