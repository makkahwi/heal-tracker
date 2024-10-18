import axios from "axios";

import { comprehensiveProps } from "../Views/Auth/Dashboard/WeeklyCalendar";

const service = axios.create({
  baseURL: "https://api.openai.com/v1/completions",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.CHATGPT,
  },
});

const getSummary = async (data: comprehensiveProps[]) =>
  await service.post("", {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are an assistant that summarizes data for a week of meals mainly anf minor other things. Meals summary should be showing the percentage of commitment to schedule, what were the meals or meal elements out of the schedule, overall meals time commitment. Data would also include medicines consumption (which is only 1 medicine to be taken once a weekly for now), daily sleep times, and sports. Those parts just show an overall summary for them. What I want you to return is a daily summary associated with date, and week summary in following form { daily: [{date: '', content: ''}], week: '' }",
      },
      {
        role: "user",
        content: `Here is the data for the week: ${JSON.stringify(
          data.map(
            ({
              meal,
              medicines,
              sleeps,
              sports,
              supposed,
              contents,
              timestamp,
            }) => {
              const { meal: m, schedule, time } = meal;

              return {
                timestamp,
                contents: contents.map(({ id, ...rest }) => ({ ...rest })),
                supposed: supposed.map(({ id, meal, ...rest }) => ({
                  ...rest,
                })),
                meal: { meal: m, schedule, time },
                medicines: medicines.map(({ id, date, ...rest }) => ({
                  ...rest,
                })),
                sleeps: sleeps.map(({ id, ...rest }) => ({ ...rest })),
                sports: sports.map(({ id, date, ...rest }) => ({ ...rest })),
              };
            }
          )
        )}. Please summarize.`,
      },
    ],
    max_tokens: 200,
    temperature: 0.7,
  });

export { getSummary };
