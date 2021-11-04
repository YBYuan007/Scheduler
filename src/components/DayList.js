import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const parsedDayList = props.days.map((Day) => {
    return (
      <DayListItem
        key={Day.id}
        name={Day.name}
        spots={Day.spots}
        selected={Day.name === props.value}
        onChange={props.onChange}
      />
    );
  });

  return <ul>{parsedDayList}</ul>;
}
