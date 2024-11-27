const { execSync } = require("child_process");

const changedFiles = execSync("git diff --name-only HEAD^ HEAD")
  .toString()
  .trim()
  .split("\n");

const ignoredFiles = [
  ".md",
  ".github/*",
  ".env.example",
  ".gitignore",
  "LICENSE",
];

const shouldDeploy = changedFiles.some(
  (file) => !ignoredFiles.some((ignore) => file.includes(ignore))
);

if (!shouldDeploy) {
  console.log("No significant changes detected. Skipping deployment...");
  process.exit(0);
}

console.log("Changes detected. Proceeding with deployment...");
process.exit(1);
