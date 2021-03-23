const {
  determination,
  healingMagicPotency,
  weaponDamage,
} = require("./attributes");
/**
 *
 * @param {number} pot Potency
 * @param {number} level Level 1-80
 * @param {string} job 3 letter job string
 * @param {number} wd Weapon damage
 * @param {number} hmp Main stat
 * @param {number} det Determination
 *
 */
const directHeal = (pot, level, job, wd, hmp, det, buffs = 1, roll = 0.97) => {
  const h1 =
    (pot * healingMagicPotency(hmp, level) * determination(det, level)) /
    100 /
    1000;
  let h2 = h1 * (weaponDamage(level, job, wd) / 100) * 1.3; // 1.3 is Maim and Mend / Magick and Mend trait
  return h2 * roll * buffs;
};

module.exports = { directHeal };
