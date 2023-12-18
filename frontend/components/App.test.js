import React from "react"
import { render, screen } from "@testing-library/react"
import AppFunctional from "./AppFunctional"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom/extend-expect"

beforeEach(() => {
  render(<AppFunctional />)
})

test("up coordinate test", async () => {
  const upButton = screen.getByTestId("upButton");
  userEvent.click(upButton);
  const message = await screen.findByText(/(2,1)/);
  expect(message).toBeInTheDocument();
})
test("down coordinate test", async () => {
  const downButton = screen.getByTestId("downButton");
  userEvent.click(downButton);
  const message = await screen.findByText(/(2,3)/);
  expect(message).toBeInTheDocument();
})
test("right coordinate test", async () => {
  const rightButton = screen.getByTestId("rightButton");
  userEvent.click(rightButton);
  const message = await screen.findByText(/(3,2)/);
  expect(message).toBeInTheDocument();
})
test("left coordinate test", async () => {
  const leftButton = screen.getByTestId("leftButton");
  userEvent.click(leftButton);
  const message = await screen.findByText(/(1,2)/);
  expect(message).toBeInTheDocument();
})
