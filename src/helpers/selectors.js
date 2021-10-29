
export function getAppointmentsForDay(state, day) {
let result = []; 
    const allowed = state.days.filter(eachDay => eachDay.name === day); 

    for (let i of allowed) {
      for (let j = 0 ; j < i.appointments.length ; j ++ ) {
        let vv = i.appointments[j]; 
        if (state.appointments[vv] ) {
          result.push(state.appointments[vv]);
        } 
      }
    }
    console.log("result: ", result);
    return result;

}

// module.exports = {getAppointmentsForDay}; 

