import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  prettyDOM,
  getByText,
  getAllByTestId
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

// it.only("renders without crashing", () => {
//   render(<Application />);
// });
describe("Application", () => {
  it.only("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    return waitForElement(() => getByText("Monday"));
  });

  it.only("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it.only("loads data, books an interview and reduces the spots remaining for the first day by 1", async() => {
    const { container } = render(<Application />);
    
     await waitForElement(() => getByText(container, "Archie Cohen")).then(()=> {
      //  console.log(prettyDOM(container))
       const allArticle = getAllByTestId(container, "appointment"); 
       const firstArticle = allArticle[0]; 
       console.log(prettyDOM(firstArticle));
     })
  });
});

// it.only("shows text 'Leopold Silvers' in the document after fire the click event on the 'Tuesday menu button ", () => {
//   const { getByText } = render(<Application />);

//   return waitForElement(() => getByText("Monday")).then(() => {
//     fireEvent.click(getByText("Tuesday"));
//     expect(getByText("Leopold Silvers")).toBeInTheDocument()
//   });
// });
