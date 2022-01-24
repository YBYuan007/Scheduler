import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "../helpers/selectors";

export default function useApplicationData() {
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {},
  // });

  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    // press the correct interview to update , id && interview , similar to bookInterview , within the appointments
  };

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOT = "SET_SPOT";

  function reducer(prevState, action) {
    // only care about the return new state
    switch (action.type) {
      case SET_DAY:
        return { ...prevState, day: action.day }; // ...prevState copied the original state, action.day is the parameter I need to pass in?
      case SET_APPLICATION_DATA: // update / fetch days, appointments, and interviewers
        return {
          ...prevState,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
        };

      case SET_INTERVIEW: // the selected interview??  this one is within the initialappointments.
        const appointment = {
          ...prevState.appointments[action.id],
          interview: { ...action.interview },
        };

        const appointments = {
          ...prevState.appointments,
          [action.id]: appointment,
        };
        console.log("here is set_interview ");
        return { ...prevState, appointments: appointments };

      case SET_SPOT:
        console.log("what is prevState", prevState);
        const todayAppointments = getAppointmentsForDay(
          prevState,
          prevState.day
        );
        let count = 0;
        for (let i of todayAppointments) {
          if (i.interview === null || Object.keys(i.interview).length === 0) {
            count++;
          }
        }
        console.log("what is count", count);

        const daySpots = prevState.days.map((eachDay) => {
          if (eachDay.name === prevState.day) {
            return { ...eachDay, spots: count };
          } else {
            return eachDay;
          }
        });

        console.log("what is dayspots", daySpots);
        return { ...prevState, days: daySpots };

      default:
        throw new Error(
          ` Tried to reduce with unsuppoerted actiontype: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  // const setDay = (day) => setState({ ...state, day });
  const setDay = (day) => dispatch({ type: SET_DAY, day: day });

  // const updateSpots = (state) => {
  // const todayAppointments = getAppointmentsForDay(state, state.day);
  // let count = 0;
  // for (let i of todayAppointments) {
  //   if (i.interview === null) {
  //     count++;
  //   }
  // }

  // const daySpots = state.days.map(eachDay => {
  //   if (eachDay.name === state.day) {
  //     return {...eachDay, spots: count}
  //   } else {
  //     return eachDay
  //   }
  // })

  // const newDay = {...state, days: daySpots}

  // dispatch({type: SET_SPOT, state: state});

  // setState((prev) => {
  // const daysB = [...prev.days];
  // const newDays = daysB.map((eachDay) => {
  //   if (eachDay.name === prev.day) {
  //           if eachDay.name ("Monday, Tuesday ... ") equals to selected date, then update the spot number
  //     return { ...eachDay, spots: count };
  //   } else {
  //     return eachDay;
  //   }
  // });
  //   return { ...prev, days: newDays };
  // });
  // };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((res) => {
      // console.log("res from promise", res)
      // setState((prev) => ({
      //   ...prev,
      //   days: res[0].data,
      //   appointments: res[1].data,
      //   interviewers: res[2].data,
      // }));
      dispatch({
        type: SET_APPLICATION_DATA,
        days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data,
      });
    });
  }, []);

  const bookInterview = (id, interview) => {
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: { ...interview },
    // };

    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment,
    // };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      dispatch({ type: SET_INTERVIEW, id: id, interview: interview });
      // const newSate = { ...state, appointments };
      // setState(newSate);
      // updateSpots(newSate);
      console.log(" bookinterview before setSpot dispatch");
      dispatch({ type: SET_SPOT, state: state });
      console.log(" bookinterview after setSpot dispatch");
    });
  };

  const cancelInterview = (id) => {
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: null,
    // };

    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment,
    // };

    // const newSate = { ...state, appointments };

    return axios.delete(`/api/appointments/${id}`, { id }).then(() => {
      dispatch({ type: SET_INTERVIEW, id: id, interview: null });
      // setState(newSate);
      // updateSpots(newSate);
      console.log(" cancelInterview before setSpot dispatch");
      dispatch({ type: SET_SPOT, state: state });
      console.log(" cancelInterview after setSpot dispatch");
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
