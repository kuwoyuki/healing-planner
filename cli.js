#!/usr/bin/env node
const meow = require("meow");
const { directHeal } = require("./lib/healing.js");

const cli = meow(
  `
	Usage
	  $ planner [input]
	Options
	  --potency       ability/skill potency
    --level         job level, 70 or 80 [Default: 80]
    --job           3 letter job abbreviation [Default: "WHM"]
    --weaponDamage  WD, Required
    --mainStat      MND
    --determination DET
    --buffs         buffs mod [Default: 1]
    --roll          variance roll, defaults to lowest roll [Default: 0.97]
	Examples
	  $ planner --pot 700 --wd 164 --mnd 4276 --det 2385 --roll 1 --buffs 1.1
	  700 pot = 30639.76318513159
`,
  {
    flags: {
      potency: {
        alias: "pot",
        type: "number",
        isRequired: true,
      },
      level: {
        type: "number",
        default: 80,
      },
      job: {
        type: "string",
        default: "WHM",
      },
      weaponDamage: {
        alias: "wd",
        type: "number",
        isRequired: true,
      },
      mainStat: {
        alias: "mnd",
        type: "number",
        isRequired: true,
      },
      determination: {
        alias: "det",
        type: "number",
        isRequired: true,
      },
      buffs: {
        type: "number",
        default: 1,
      },
      roll: {
        type: "number",
        default: 0.97,
      },
    },
  }
);

const {
  potency,
  level,
  job,
  weaponDamage,
  mainStat,
  determination,
  buffs,
  roll,
} = cli.flags;

const heal = directHeal(
  potency,
  level,
  job,
  weaponDamage,
  mainStat,
  determination,
  buffs,
  roll
);

console.log(`${potency} pot = ${heal}`);
