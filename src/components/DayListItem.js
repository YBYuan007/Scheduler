import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  let DayListClass = classNames(
    "day-list__item",
    { "day-list__item": false, "day-list__item--selected": props.selected },
    { "day-list__item": false, "day-list__item--full": props.spots === 0 }
  );

  return (
    <li
      className={DayListClass}
      data-testid="day"
      onClick={() => props.onChange(props.name)}
    >
      <h2 className="text--regular"> {props.name}</h2>
      {props.spots > 1 && (
        <h3 className="text--light">{props.spots} spots remaining</h3>
      )}
      {props.spots === 1 && <h3 className="text--light">1 spot remaining</h3>}
      {props.spots === 0 && <h3 className="text--light">no spots remaining</h3>}
    </li>
  );
}
