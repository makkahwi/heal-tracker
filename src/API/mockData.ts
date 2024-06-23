import moment from "moment";

export const mockScheduleData = [
  [
    { element: "Bread", count: "1 Slice" },
    { element: "Various Vegetables", count: "Slices" },
    { element: "Olive", count: "4 Pieces" },
    { element: "Yoghurt", count: "1 Cup" },
    {
      element: "Egg",
      count: "2",
      alternatives: [
        { element: "Labaneh", count: "90gm" },
        { element: "Areesh Cheese", count: "90gm" },
        { element: "Chickpeas", count: "100gm" },
        { element: "Lentil", count: "100gm" },
      ],
    },
  ],
  [
    {
      element: "Salad",
      count: "1",
      alternatives: [{ element: "Various Vegetables", count: "Slices" }],
    },
    { element: "Yoghurt", count: "1 Cup" },
    { element: "Fruit", count: "1 Small Piece" },
    { element: "Walnuts", count: "4 Pieces" },
  ],
  [{ element: "Green Tea", count: "1 Cup" }],
  [
    {
      element: "Chicken Breast",
      count: "120gm",
      alternatives: [
        { element: "Fish", count: "120gm" },
        { element: "Beef", count: "120gm" },
      ],
    },
    {
      element: "Salad",
      count: "1",
    },
    { element: "Rice", count: "300gm" },
  ],
  [{ element: "Yoghurt", count: "1 Cup" }],
];

export const mockConsumptionData = [
  {
    timestamp: moment(),
    meal: "Breakfast",
    contents: [
      { element: "Bread", count: "1 Slice" },
      { element: "Various Vegetables", count: "Slices" },
      { element: "Olive", count: "4 Pieces" },
      { element: "Yoghurt", count: "1 Cup" },
      {
        element: "Egg",
        count: "2",
      },
    ],
    supposed: [
      { element: "Bread", count: "1 Slice" },
      { element: "Various Vegetables", count: "Slices" },
      { element: "Olive", count: "4 Pieces" },
      { element: "Yoghurt", count: "1 Cup" },
      {
        element: "Egg",
        count: "2",
        alternatives: [
          { element: "Labaneh", count: "90gm" },
          { element: "Areesh Cheese", count: "90gm" },
          { element: "Chickpeas", count: "100gm" },
          { element: "Lentil", count: "100gm" },
        ],
      },
    ],
  },
  {
    timestamp: moment(),
    meal: "Lunch",
    contents: [
      { element: "Various Vegetables", count: "Slices" },
      { element: "Olive", count: "4 Pieces" },
    ],
    supposed: [
      {
        element: "Chicken Breast",
        count: "120gm",
        alternatives: [
          { element: "Fish", count: "120gm" },
          { element: "Beef", count: "120gm" },
        ],
      },
      {
        element: "Salad",
        count: "1",
      },
      { element: "Rice", count: "300gm" },
    ],
  },
];
