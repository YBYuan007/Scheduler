import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "../helpers/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    console.log("useApplicationData")
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((res) => {
      setState((prev) => ({
        ...prev,
        days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data,
      }));
    });
  }, []);

  const updateSpots = (state) => {
    const todayAppointments = getAppointmentsForDay(state, state.day);
    let count = 0;
    for (let i of todayAppointments) {
      if (i.interview === null) {
        count++;
      }
    }

    setState((prev) => {
      const daysB = [...prev.days];
      const newDays = daysB.map((eachDay) => {
        if (eachDay.name === prev.day) {
          return { ...eachDay, spots: count };
        } else {
          return eachDay;
        }
      });
      return { ...prev, days: newDays };
    });
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        const newSate = { ...state, appointments };
        setState(newSate);
        updateSpots(newSate);
      });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const newSate = { ...state, appointments };
    
    return axios.delete(`/api/appointments/${id}`, { id })
    .then(() => {
      setState(newSate);
      updateSpots(newSate);
    })
    
  };

  return { state, setDay, bookInterview, cancelInterview };
}
