import axios from "axios";

import { comprehensiveProps } from "../Views/Auth/WeeklySummary/WeeklyCalendar";

const service = axios.create({
  baseURL: "https://api.openai.com/v1/chat/completions",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_CHATGPT,
  },
});

const getSummary = async (data: comprehensiveProps[]) =>
  await service
    .post("", {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Generate a weekly summary for meals, exercise, and sleep with each daily summary highlighting only deviations from the planned meals (extra, missing, or altered quantities), along with an adherence percentage. If the meal adherence is perfect, omit the daily summary. For each day, provide brief mentions of exercise and sleep, noting any inconsistencies. The weekly summary should contain: (1) an overall weekly meal adherence percentage, (2) a short evaluation of exercise adherence, and (3) an average or consistency measure for sleep. Response format is JSON structured as follows: {date: 'week-start-date', daily: [{date: 'YYYY-MM-DD', content: 'Daily summary with only deviations and adherence % as very short short paragraph'}], week: 'Weekly summary with adherence percentages and overall evaluation'}.",
        },
        {
          role: "user",
          content: `Here is the data for the week: ${JSON.stringify(
            data.map(
              ({ meal, sleeps, sports, supposed, contents, timestamp }) => {
                const { meal: m, schedule, time } = meal;

                return {
                  timestamp,
                  contents: contents.map(({ id, ...rest }) => ({ ...rest })),
                  supposed: supposed.map(({ id, meal, ...rest }) => ({
                    ...rest,
                  })),
                  meal: { meal: m, schedule, time },
                  sleeps: sleeps.map(({ id, ...rest }) => ({ ...rest })),
                  sports: sports.map(({ id, date, ...rest }) => ({ ...rest })),
                };
              }
            )
          )}. Please summarize.`,
        },
      ],
      max_tokens: 5000,
      temperature: 0.3,
    })
    .then((res) => res.data.choices[0]?.message.content);

export { getSummary };
