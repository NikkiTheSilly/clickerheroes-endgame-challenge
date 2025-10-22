const heroStatesVanilla = {
  Tsuchi: true,
  Skogur: true,
  Moeru: true,
  Zilar: true,
  Madzi: true,
  Xavira0: true,
  Xavira1: true,
  Xavira2: true,
  Xavira3: true,
  Xavira4: true,
  Xavira5: true,
  Ceus0: true,
  Cadu0: true,
  Ceus1: true,
  Cadu1: true,
  Ceus2: true,
  Cadu2: true,
  Ceus3: true,
  Cadu3: true,
  Ceus4: true,
  Cadu4: true,
  Maw0: true,
  Maw1: true,
  Maw2: true,
  Maw3: true,
  Maw4: true,
  Maw5: true,
  Maw6: true,
  Yachiyl0: true,
  Maw6: true,
  Yachiyl1: true,
  Yachiyl2: true,
  Yachiyl3: true,
  Yachiyl4: true,
  Yachiyl5: true,
  Yachiyl6: true,
  Rose0: true,
  Sophia0: true,
  Blanche0: true,
  Dorothy0: true,
  Rose1: true,
  Sophia1: true,
  Blanche1: true,
  Dorothy1: true,
  Blanche1: true,
  Rose2: true,
  Sophia2: true,
  Blanche2: true,
  Dorothy2: true,
  Blanche2: true,
  Rose3: true,
  Sophia3: true,
  Blanche3: true,
  Dorothy3: true,
  Rose4: true,
  Sophia4: true,
  Blanche4: true,
  Dorothy4: true,
  Blanche4: true,
  Rose5: true,
  Sophia5: true,
  Blanche5: true,
  Dorothy5: true,
};

const VANILLA_BASE_HERO_NAMES = [
  "Tsuchi",
  "Skogur",
  "Moeru",
  "Zilar",
  "Madzi",
  "Xavira",
  "Cadu",
  "Ceus",
  "Maw",
  "Yachiyl",
  "Rose",
  "Sophia",
  "Blanche",
  "Dorothy",
];

const HEROES_DATA_VANILLA = [
  ["Wep7k+", 235, 1.07, 4.0, 7000, 200.4],
  ["Tsuchi", 500, 1.07, 4.0, 0, 426.4],
  ["Skogur", 1000, 1.07, 4.0, 0, 847.4],
  ["Moeru", 2000, 1.07, 4.0, 0, 1680.0],
  ["Zilar", 4000, 1.07, 4.0, 0, 3334.9],
  ["Madzi", 8000, 1.07, 4.0, 0, 6632.4],
  ["Xavira0", 14000, 1.07, 4.5, 0, 11681.0],
  ["Xavira1", 14000, 1.07, 4.5, 150000, 12304.0],
  ["Xavira2", 14000, 1.07, 4.5, 185000, 12952.0],
  ["Xavira3", 14000, 1.07, 4.5, 255000, 13625.0],
  ["Xavira4", 14000, 1.07, 4.5, 290000, 14473.0],
  ["Xavira5", 14000, 1.07, 4.5, 336000, 15346.0],
  ["Ceus0", 25500, 1.07, 4.5, 0, 26444.3],
  ["Cadu0", 25500, 1.07, 4.5, 0, 26444.5],
  ["Ceus1", 25500, 1.07, 4.5, 58000, 27442.0],
  ["Cadu1", 25500, 1.07, 4.5, 116000, 28542.0],
  ["Ceus2", 25500, 1.07, 4.5, 180000, 29740.0],
  ["Cadu2", 25500, 1.07, 4.5, 250000, 31040.0],
  ["Ceus3", 25500, 1.07, 4.5, 326000, 32438.0],
  ["Cadu3", 25500, 1.07, 4.5, 407500, 33938.0],
  ["Ceus4", 25500, 1.07, 4.5, 495000, 35536.0],
  ["Cadu4", 25500, 1.07, 4.5, 588000, 37236.0],
  ["Maw0", 45500, 1.07, 4.5, 0, 61730.0],
  ["Maw1", 45500, 1.07, 4.5, 111000, 63728.0],
  ["Maw2", 45500, 1.07, 4.5, 227500, 65826.0],
  ["Maw3", 45500, 1.07, 4.5, 350000, 68024.0],
  ["Maw4", 45500, 1.07, 4.5, 478000, 70322.0],
  ["Maw5", 45500, 1.07, 4.5, 612500, 72720.0],
  ["Maw6", 45500, 1.07, 4.5, 752500, 75218.0],
  ["Yachiyl0", 72000, 1.07, 4.5, 0, 98692.1],
  ["Maw6", 45500, 1.07, 4.5, 752500, 75218.0], // Maw6 is included twice so Yach0 doesn't show up when Maw6 is enabled, which would be suboptimal.
  ["Yachiyl1", 72000, 1.07, 4.5, 157500, 101490.0],
  ["Yachiyl2", 72000, 1.07, 4.5, 321000, 104388.0],
  ["Yachiyl3", 72000, 1.07, 4.5, 490000, 107386.0],
  ["Yachiyl4", 72000, 1.07, 4.5, 665000, 110484.0],
  ["Yachiyl5", 72000, 1.07, 4.5, 846000, 113682.0],
  ["Yachiyl6", 72000, 1.07, 4.5, 1032500, 116980.0],
  ["Rose0", 108000, 1.22, 1000.0, 9700, 148593.0],
  ["Sophia0", 114500, 1.22, 1000.0, 0, 158831.75],
  ["Blanche0", 127500, 1.22, 1000.0, 0, 178104.5],
  ["Dorothy0", 142200, 1.22, 1000.0, 0, 199738.5],
  ["Rose1", 108000, 1.22, 1000.0, 602000, 154391.0],
  ["Sophia1", 114500, 1.22, 1000.0, 677250, 164629.75],
  ["Blanche1", 127500, 1.22, 1000.0, 752500, 183902.5],
  ["Dorothy1", 142200, 1.22, 1000.0, 827750, 205536.5],
  ["Blanche1", 127500, 1.22, 1000.0, 997950, 183902.5], // Included twice for same reasons as above - Blanche1 > Doro1
  ["Rose2", 108000, 1.22, 1000.0, 1204000, 160189.0],
  ["Sophia2", 114500, 1.22, 1000.0, 1279250, 170427.75],
  ["Blanche2", 127500, 1.22, 1000.0, 1354500, 189700.5],
  ["Dorothy2", 142200, 1.22, 1000.0, 1429750, 211334.5],
  ["Blanche2", 127500, 1.22, 1000.0, 1599950, 189700.5], // Blanche2 > Doro2
  ["Rose3", 108000, 1.22, 1000.0, 1806000, 165987.0],
  ["Sophia3", 114500, 1.22, 1000.0, 1881250, 176225.75],
  ["Blanche3", 127500, 1.22, 1000.0, 1956500, 195498.5],
  ["Dorothy3", 142200, 1.22, 1000.0, 1956500, 217132.5],
  ["Rose4", 108000, 1.22, 1000.0, 2408000, 171785.0],
  ["Sophia4", 114500, 1.22, 1000.0, 2483250, 182023.75],
  ["Blanche4", 127500, 1.22, 1000.0, 2558500, 201296.5],
  ["Dorothy4", 142200, 1.22, 1000.0, 2633750, 222930.5],
  ["Blanche4", 127500, 1.22, 1000.0, 2803950, 201296.5], // Blanche4 > Doro4
  ["Rose5", 108000, 1.22, 1000.0, 3010000, 177583.0],
  ["Sophia5", 114500, 1.22, 1000.0, 3085250, 187821.75],
  ["Blanche5", 127500, 1.22, 1000.0, 3160500, 207094.5],
  ["Dorothy5", 142200, 1.22, 1000.0, 3235750, 228728.5],
];

const MAX_VANILLA_UPGRADE_NUMBER = HEROES_DATA_VANILLA.reduce((max, hero) => {
  if (hero[0] === "Wep7k") {
    return max;
  }

  const upgradeNumber = parseInt(hero[0].at(-1));

  // Rose3 -> "3" -> 3
  // Tsuchi -> "i" -> NaN -> 0
  return Math.max(max, isNaN(upgradeNumber) ? 0 : upgradeNumber);
}, 0);

const UPGRADELESS_HEROES_VANILLA = [
  "Tsuchi",
  "Skogur",
  "Moeru",
  "Zilar",
  "Madzi",
];

function removeDisabledHeroes(heroData, heroStates) {
  return heroData.filter((hero) => heroStates[hero[0]]);
}

createTable(
  VANILLA_BASE_HERO_NAMES,
  HEROES_DATA_VANILLA,
  heroStatesVanilla,
  MAX_VANILLA_UPGRADE_NUMBER,
  UPGRADELESS_HEROES_VANILLA
);

let HEROES_VANILLA = removeDisabledHeroes(
  HEROES_DATA_VANILLA,
  heroStatesVanilla
);
