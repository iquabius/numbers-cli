#!/usr/bin/env node

import fetch from "node-fetch";
import yargs from "yargs";

let argv = yargs
  .usage("Usage: $0 [options] number")
  .example("$0 -t trivia 69", "Fetch trivia about the number 69")
  .option("type", {
    alias: "t",
    choices: ["date", "math", "trivia", "year"],
    default: "trivia",
    describe: "Type of fact"
  })
  .help("h")
  .alias("h", "help").argv;

const fetchFact = (type, number) => {
  console.log(`Fetching ${type} fact for number ${number}...`);
  fetch(`http://numbersapi.com/${number}/${type}`)
    .then(res => res.text())
    .then(body => console.log(body));
};

const validateNumber = number => {
  // The API accepts integers or the 'random' keyword
  return Number.isInteger(number) || number === "random";
};

const number = argv._[0];

if (validateNumber(number)) {
  fetchFact(argv.type, number);
} else {
  console.log(`The provided number '${number}' is invalid`);
}
