import { render, screen } from "@testing-library/react";

import App from "./App";

test("renders HEAL landing title", async () => {
  render(<App />);

  const heading = await screen.findByRole("heading", {
    name: /welcome to healthy eating and lifestyle tracker/i,
  });

  expect(heading).toBeInTheDocument();
});
