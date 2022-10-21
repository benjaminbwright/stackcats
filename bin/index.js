#!/usr/bin/env node
// DEPENDENCIES
import inquirer from "inquirer"
import {
  buildTemplate,
  buildViteApp,
  buildQwikApp
} from "../index.js"

// FUNCTIONS


// USER INTERACTION
inquirer.prompt([
  {
    type: "list",
    message: "What kind of stack would you like to build?",
    name: "stack",
    choices: [
      "Just HTML",
      "HTML, CSS & JS",
      "Vite App",
      "Qwik App"
    ],
    default: "HTML, CSS & JS"
  },
  {
    type: "confirm",
    message: "Initialize as a git repository?",
    name: "isGitRepo"
  }
]).then(({ stack, isGitRepo }) => {
  switch (stack) {
    case "Just HTML":
      buildTemplate("just-html", { isGitRepo });
      break;
    case "HTML, CSS & JS":
      buildTemplate("html-css-js", { isGitRepo });
      break;
    case "Vite App":
      buildViteApp({ isGitRepo });
      break;
    case "Qwik App":
      buildQwikApp({ isGitRepo });
      break;
    default:
      buildTemplate("just-html", { isGitRepo });
  }
})