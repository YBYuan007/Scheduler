import React, {useState, useEffect} from "react";
import DayList from 'components/DayList'; 
import axios from "axios";
import { getAppointmentsForDay , getInterview, getInterviewersForDay } from "../helpers/selectors.js";
import "components/Application.scss";
import Appointment from "components/Appointment/index";
import useApplicationData from "../hooks/useApplicationData";
// import { action } from "@storybook/addon-actions/dist/preview";

export default function Application(props) {
  console.log("props from application: ", props)
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  

  const parsedAppointment = getAppointmentsForDay(state, state.day).map(appointment => {
    const dailyInterviewers = getInterviewersForDay(state, state.day);
    return <Appointment key={appointment.id}
                        {...appointment}
                        
                        interview = {getInterview(state, appointment.interview)}
                        
                        interviewers = {dailyInterviewers}
                        bookInterview = {bookInterview}
                        cancelInterview = {cancelInterview}
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

