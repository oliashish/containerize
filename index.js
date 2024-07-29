#!/usr/bin/env node

// const { Command } = require('commander');
// const program = new Command();

// program
//   .name('string-util')
//   .description('CLI to some JavaScript string utilities')
//   .version('0.8.0');

// program.command('split')
//   .description('Split a string into substrings and display as an array')
//   .argument('<string>', 'string to split')
//   .option('--first', 'display just the first substring')
//   .option('-s, --separator <char>', 'separator character', ' ')
//   .action((str, options) => {
//     const limit = options.first ? 1 : undefined;
//     console.log(options.separator, options.first);
//     console.log(str.split(options.separator, limit));
//   })
//   .command("inline")
//   .description("This is testing command using inline program command")
//   .argument('<string>', "String to test")
//   .action(function () {
//     console.log(this.args[0])
//   });

// program.command("test")
//     .description("This is test command and will only print test if nothing passed, else print what is passed as option")
//     // .argument('<string>', 'string to greet')
//     .option('-g, --greet <string>', 'word to greet', 'Hello world')
//     .action(function() {
//         if (this.opts().greet !== 'Hello world') {
//             console.log(`Hello ${this.opts().greet}`);
//         } else {
//             console.log(`${this.opts().greet}`);
//         }
//     })

// program.parse(process.argv);

import { program } from "commander";
// import  {  } from "fs"
import fs from "fs"

let node_dockerfile_template = String.raw`# Use the official Node.js image from the Docker Hub
FROM node:20

# Create and set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port the app runs on
# EXPOSE 3000

# Define the command to run the application
CMD ["node", "index.js"]


`

program
  .version("1.0.0")
  .description("My Node CLI")
  .option("-d, --dir <type>", "add directory path for project")
  .action((options) => {
    console.log(`Hey, ${options.dir}!`);
    let dirPath = options.dir;
    if (options.dir === ".") {
      const fileList = fs.readdirSync(dirPath);
      console.log('Files and folders in the directory:', fileList);
      if (fileList.includes("package.json")) {
        console.log("This seems like a nodejs project");
        console.log("Creating dockerfile for you using node version 20");

        try {
          fs.writeFileSync("Dockerfile", node_dockerfile_template);
          console.log("Successfully writte dockerfile in root of the project");
        } catch (err) {
          console.log(`error while writing dockerfile: $(err)`);
        }


      } else {
        console.log("Don't know which project is this");

      }
    } else {
      const fileList = fs.readdirSync(dirPath);
      console.log('Files and folders in the directory:', fileList);
    }
  })

program.parse(process.argv);