import { render } from "@testing-library/react";
import { Popup } from "./Popup";

test("renders learn react link", () => {
  render(<Popup />);
  expect("this is the best extension!").toBeTruthy();
});
