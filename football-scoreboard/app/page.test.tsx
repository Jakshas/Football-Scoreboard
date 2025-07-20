/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Page from "./page";

it("App Router: Works with Server Components", () => {
  render(<Page />);
});

it("Start a game", async ()=>{
  const user = userEvent.setup()
  render(<Page/>)
  await user.type(screen.getByTestId("homeTeamName"), "England")
  await user.type(screen.getByTestId("awayTeamName"), "Mexico")
  await user.click(screen.getByTestId("startGame"))
  expect(screen.getByTestId("homeTeamName")).toHaveTextContent("England")
  expect(screen.getByTestId("awayTeamName")).toHaveTextContent("Mexico")
})


it("Finish a game", async ()=>{
  const user = userEvent.setup()
  render(<Page/>)
  await user.type(screen.getByTestId("homeTeamName"), "England")
  await user.type(screen.getByTestId("awayTeamName"), "Mexico")
  await user.click(screen.getByTestId("startGame"))
  await user.click(screen.getByTestId("endMatch"))
  expect(screen.getByTestId("homeTeamName")).toHaveTextContent("")
  expect(screen.getByTestId("awayTeamName")).toHaveTextContent("")
})

it("Update Score", async ()=>{
    const user = userEvent.setup()
  render(<Page/>)
  await user.type(screen.getByTestId("homeTeamName"), "England")
  await user.type(screen.getByTestId("awayTeamName"), "Mexico")
  await user.click(screen.getByTestId("startGame"))
  await user.type(screen.getByTestId("awayTeamGoal"), "1")
  await user.type(screen.getByTestId("homeTeamGoal"), "2")
  expect(screen.getByTestId("scoreLabel")).toHaveTextContent("England:2 Mexico:1")
})

it("Updated Score not below 0", async ()=>{
      const user = userEvent.setup()
  render(<Page/>)
  await user.type(screen.getByTestId("homeTeamName"), "England")
  await user.type(screen.getByTestId("awayTeamName"), "Mexico")
  await user.click(screen.getByTestId("startGame"))
  await user.type(screen.getByTestId("awayTeamGoal"), "-1")
  await user.type(screen.getByTestId("homeTeamGoal"), "-2")
  expect(screen.getByTestId("scoreLabel")).toHaveTextContent("England:2 Mexico:1")
})

it("Get a summary of games by total score", async ()=>{
    const user = userEvent.setup()
  render(<Page/>)
  await user.type(screen.getByTestId("homeTeamName"), "England")
  await user.type(screen.getByTestId("awayTeamName"), "Mexico")
  await user.click(screen.getByTestId("startGame"))
  await user.type(screen.getByTestId("awayTeamGoal"), "1")
  await user.type(screen.getByTestId("homeTeamGoal"), "2")
  await user.click(screen.getByTestId("endMatch"))
  await user.click(screen.getByTestId("viewSumarry"))
  expect(screen.getByTestId("scoreList")).toHaveTextContent("England 2 - Mexico 1")
})

it("Get a summary of games by total score and never should be haigher", async ()=>{
      const user = userEvent.setup()
  render(<Page/>)
  await user.type(screen.getByTestId("homeTeamName"), "England")
  await user.type(screen.getByTestId("awayTeamName"), "Mexico")
  await user.click(screen.getByTestId("startGame"))
  await user.type(screen.getByTestId("awayTeamGoal"), "1")
  await user.type(screen.getByTestId("homeTeamGoal"), "2")
  await user.click(screen.getByTestId("endMatch"))
  await user.type(screen.getByTestId("homeTeamName"), "France")
  await user.type(screen.getByTestId("awayTeamName"), "Chile")
  await user.click(screen.getByTestId("startGame"))
  await user.type(screen.getByTestId("awayTeamGoal"), "2")
  await user.type(screen.getByTestId("homeTeamGoal"), "1")
  await user.click(screen.getByTestId("endMatch"))
  await user.click(screen.getByTestId("viewSumarry"))
  expect(screen.getByTestId("scoreList")).toHaveTextContent("France 1 - Chile 2England 2 - Mexico 1")
})