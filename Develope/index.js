const inquirer = require('inquirer');
const fs = require('fs');
const generateTeam = require('./src/page-template');
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');
const Employee = require('./lib/Employee');
const teamMembers = [];
const path = require('path');
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");



function manager() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the team managers name?',
                name: 'managerName',

            },
            {
                type: 'input',
                message: 'What is the team managers employee id?',
                name: 'managerID',

            },
            {
                type: 'input',
                message: 'What is the team managers email address?',
                name: 'managerEmail',

            },

        ])
        .then(response => {
            const manager = new Manager(response.managerName, response.managerID, response.managerEmail);
            teamMembers.push(manager);
            newMemberPrompt()

        })
}

function newMemberPrompt() {

    inquirer.prompt([
        {
            type: 'list',
            message: 'Would you like to enter a new team member?',
            name: 'newMember',
            choices: ['Engineer', 'Intern', 'Done'],
        },
    ])
        .then((response) => {

            switch (response.newMember) {
                case 'Engineer':
                    engineerPrompt();
                    break;

                case 'Intern':
                    internPrompt();
                    break;

                default:
                    fs.writeFileSync(outputPath, generateTeam(teamMembers))

            }

        })
}

function engineerPrompt() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the engineers name?',
            name: 'engineerName',

        },
        {
            type: 'input',
            message: 'What is the engineers ID?',
            name: 'engineerID',

        },
        {
            type: 'input',
            message: 'What is the engineers email address?',
            name: 'engineerEmail',

        },
        {
            type: 'input',
            message: 'What is the engineers GitHub username',
            name: 'engineerGit',

        },

    ])
        .then(response => {
            const engineer = new Engineer(response.engineerName, response.engineerID, response.engineerEmail, response.engineerGit);
            teamMembers.push(engineer);
            newMemberPrompt()

        })
}

function internPrompt() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the interns name?',
            name: 'internName',

        },
        {
            type: 'input',
            message: 'What is the interns ID?',
            name: 'internID',

        },
        {
            type: 'input',
            message: 'What is the interns email address?',
            name: 'internEmail',

        },

    ])
        .then(response => {
            const intern = new Intern(response.internName, response.internID, response.internEmail);
            teamMembers.push(intern);
            newMemberPrompt()

        });
}

manager();