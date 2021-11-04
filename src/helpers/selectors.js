export function getAppointmentsForDay(state, day) {
  let result = [];
  const allowed = state.days.filter((eachDay) => eachDay.name === day);

  for (let i of allowed) {
    for (let j = 0; j < i.appointments.length; j++) {
      let vv = i.appointments[j];
      if (state.appointments[vv]) {
        result.push(state.appointments[vv]);
      }
    }
  }
  console.log("list of appointments for this day: ", result);
  return result;
}

export function getInterview(state, interview) {
  let result = {};
  if (interview) {
    result.student = interview.student;
    const interviewerNum = interview.interviewer; //10
    result.interviewer = state.interviewers[interviewerNum];
    return result;
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  let result = [];
  const allowed = state.days.filter((eachDay) => eachDay.name === day);

  for (let i of allowed) {
    for (let j = 0; j < i.interviewers.length; j++) {
      let vv = i.interviewers[j]; 
      if (state.interviewers[vv]) {
        result.push(state.interviewers[vv]);
      }
    }
  }
  return result;
}
