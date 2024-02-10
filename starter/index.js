const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Ensures the output directory exists because I had an error saying the directory doesn't exist and this has fixed the probem. Because if the User doesn't have the directory then this creates it for them.
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

const render = require("./src/page-template.js");

const questions = [
  {
    type: "input",
    message: "What is the Manager's name?",
    name: "Managername",
  },
  {
    type: "input",
    message: "What is the Manager's ID?",
    name: "ManagerID",
  },
  {
    type: "input",
    message: "What is the Manager's Email?",
    name: "ManagerEmail",
  },
  {
    type: "input",
    message: "What is the Manager's office number?",
    name: "ManagerOfficeNumber",
  },
  {
    type: "list",
    message: "Does the company have any more employees?",
    name: "moreEmployees",
    choices: ["Engineer", "Intern", "No more employees to add"],
  },
];

const createTeam = [];

function askManagerQuestions() {
  inquirer.prompt(questions.slice(0, 4)).then((answers) => {
    const manager = new Manager(
      answers.ManagerID,
      answers.Managername,
      answers.ManagerEmail,
      answers.ManagerOfficeNumber
    );
    createTeam.push(manager);
    if (answers.moreEmployees !== "No more employees to add") {
      promptForEmployee();
    } else {
      const renderedHtml = render(createTeam);
      fs.writeFileSync(outputPath, renderedHtml);
      console.log("Team profile successfully generated!");
    }
  });
}

function promptForEmployee() {
  inquirer.prompt(questions.slice(4)).then((answers) => {
    if (answers.moreEmployees === "Engineer") {
      createEngineer();
    } else if (answers.moreEmployees === "Intern") {
      createIntern();
    } else {
      // Render HTML and write to file
      const renderedHtml = render(createTeam);
      fs.writeFileSync(outputPath, renderedHtml);
      console.log("Team profile successfully generated!");
    }
  });
}

function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is the Engineer's name?",
      },
      {
        type: "input",
        name: "engineerID",
        message: "What is the Engineer's ID?",
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is the Engineer's Email?",
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "What is the Engineer's GitHub username?",
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.engineerID,
        answers.engineerName,
        answers.engineerEmail,
        answers.engineerGithub
      );
      createTeam.push(engineer);
      promptForEmployee();
    });
}

function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "What is the Intern's name?",
      },
      {
        type: "input",
        name: "internID",
        message: "What is the Intern's ID?",
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is the Intern's Email?",
      },
      {
        type: "input",
        name: "internSchool",
        message: "What is the Intern's school?",
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.internID,
        answers.internName,
        answers.internEmail,
        answers.internSchool
      );
      createTeam.push(intern);
      promptForEmployee();
    });
}

// Start by asking manager questions once. Had an issue whereby the manager questions would show up with every employee added so I had to make 2 separate functions.
askManagerQuestions();
