import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

// it.only("renders without crashing", () => {
//   render(<Application />);
// });

it.only("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);
  return waitForElement(() => getByText("Monday"));
});

// it.only("shows text 'Leopold Silvers' in the document after fire the click event on the 'Tuesday menu button ", () => {
//   const { getByText } = render(<Application />);

//   return waitForElement(() => getByText("Monday")).then(() => {
//     fireEvent.click(getByText("Tuesday"));
//     expect(getByText("Leopold Silvers")).toBeInTheDocument()
//   });
// });

it.only("shows text 'Leopold Silvers' in the document after fire the click event on the 'Tuesday menu button ", async() => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument()
  });
});

