import React from "react";

import { render, cleanup, waitForElement } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it.only("renders without crashing", () => {
  render(<Application />);
});

it.only("defaults to Monday and changes the schedule when a new day is selected", () => {
  const {getByText} = render(<Application />);

  console.log("getbytext",Object.keys(getByText));
  return waitForElement (() => getByText("Monday"));
});
