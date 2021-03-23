const { jobMods, levelMods } = require("./mods");

/**
 * TODO: just find level mods and job mods before calling attribute functions
 */

const findJobMod = (job) => jobMods.find(([, x]) => x === job);

/**
 * f(WD) = ⌊ ( Level Lv, MAIN × Job Job, Attribute / 1000 ) + WD ⌋
 *
 * @param {number} level 1-80
 * @param {string} jobAbbr 3 letter job abbreviation
 * @param {number} wd weapon damage value
 * @returns
 */
const weaponDamage = (level, jobAbbr, wd) =>
  (levelMods[level - 1][2] * findJobMod(jobAbbr)[8]) / 1000 + wd;

/**
 * 80: f(HMP) = ⌊ 100 · ( HMP - 340 ) / 304 ⌋ + 100
 * 70: f(HMP) = ⌊ 100 · ( HMP - 292 ) / 264 ⌋ + 100
 *
 * @param {number} hmp
 */
const healingMagicPotency = (hmp, level) => {
  const levelMod = levelMods[level - 1];
  const mainMod = levelMod[2];
  // todo: figure out how to get the divisor?
  if (![70, 80].includes(level)) {
    throw new Error("We don't support other levels yet.");
  }
  const d = level === 70 ? 264 : 304;
  return (100 * (hmp - mainMod)) / d + 100;
};
/**
 * f(DET) = ⌊ 130 · ( DET - LevelModLv, Main )/ LevelModLv, DIV + 1000 ⌋
 */
const determination = (det, level) => {
  const levelMod = levelMods[level - 1];
  return (130 * (det - levelMod[2])) / levelMod[4] + 1000;
};

module.exports = { weaponDamage, healingMagicPotency, determination };
