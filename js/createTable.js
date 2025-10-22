function createTable(
  heroNames,
  heroData,
  heroStates,
  maxUpgradeNumber,
  upgradelessHeroes
) {
  const header = $("#heroes thead");
  const body = $("#heroes tbody");

  header.empty();
  body.empty();

  header.append(
    `<tr><th>Upgrade No.</th>${heroNames.map(
      (name) => `<th>${name}</th>`
    )}</tr>`
  );

  const addedHeroes = new Set();
  for (let upgrade = 0; upgrade <= maxUpgradeNumber; upgrade++) {
    let row = `<tr><td>${upgrade}</td>`;

    for (let i = 0; i < heroNames.length; i++) {
      const hero = heroNames[i];
      const upgradeName = upgradelessHeroes.includes(hero)
        ? hero
        : hero + upgrade;
      if (
        addedHeroes.has(upgradeName) ||
        !heroData.some(([heroName]) => heroName === upgradeName)
      ) {
        row += "<td></td>";
        continue;
      }

      addedHeroes.add(upgradeName);

      row += `<td><input type="checkbox" id="${upgradeName}" checked /></td>`;
    }

    row += "</tr>";
    body.append(row);
  }

  $("#heroes input").on("change", null, undefined, () => {
    Object.keys(heroStates).forEach((hero) => {
      heroStates[hero] = $("#" + hero)[0].checked;
    });

    const root2 = $("#gameRoot2").prop("checked");

    if (root2) {
      HEROES_ROOT2 = removeDisabledHeroes(HEROES_DATA_ROOT2, heroStatesRoot2);
    } else {
      HEROES_VANILLA = removeDisabledHeroes(
        HEROES_DATA_VANILLA,
        heroStatesVanilla
      );
    }

    calculateProgression();
  });
}

$("#gameVanilla, #gameRoot2").on("click", null, undefined, () => {
  const root2 = $("#gameRoot2").prop("checked");

  if (root2) {
    createTable(
      ROOT2_BASE_HERO_NAMES,
      HEROES_DATA_ROOT2,
      heroStatesRoot2,
      MAX_ROOT2_UPGRADE_NUMBER,
      UPGRADELESS_HEROES_ROOT2
    );

    HEROES_ROOT2 = removeDisabledHeroes(HEROES_DATA_ROOT2, heroStatesRoot2);
  } else {
    createTable(
      VANILLA_BASE_HERO_NAMES,
      HEROES_DATA_VANILLA,
      heroStatesVanilla,
      MAX_VANILLA_UPGRADE_NUMBER,
      UPGRADELESS_HEROES_VANILLA
    );

    HEROES_VANILLA = removeDisabledHeroes(
      HEROES_DATA_VANILLA,
      heroStatesVanilla
    );
  }

  calculateProgression();
});
