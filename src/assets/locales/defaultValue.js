const fs = require("fs");

const setDefaultValues = (filePath) => {
  try {
    // Read the JSON file
    const data = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(data);

    // Helper function to recursively process nested objects
    const processObject = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          processObject(obj[key]); // Recursively process nested objects
        } else if (obj[key] === "") {
          obj[key] = key; // Set the value to the last key segment
        }
      }
    };

    processObject(json);

    // Write the updated JSON back to the file
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2), "utf-8");
    console.log(`Default values set in ${filePath}`);
  } catch (error) {
    console.error(`Error processing file: ${error.message}`);
  }
};

// Replace with your JSON file path
const filePath = "en/translation.json";
setDefaultValues(filePath);
