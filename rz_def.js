// possible: SPEAR, SWORD, AXE, LIGHT, HEAVY
const UNITS_TO_SEND = ["SPEAR", "SWORD", "AXE", "LIGHT"];
const NUMBER_OF_DUAl_TO_PRESERVE = 0;
const IS_PALA_DEF =
  $(`[data-unit=knight].units-entry-all`)
    .text()
    .match(/\(([^)]+)\)/)[1] === 1;

function getUnitSplits(numberOfReadyScavs) {
  const splits = {};
  for (const UNIT of UNITS_TO_SEND) {
    let numberOfUnits = $(`[data-unit=${UNIT.toLowerCase()}].units-entry-all`)
      .text()
      .match(/\(([^)]+)\)/)[1];

    if (UNIT === "SPEAR" || UNIT === "SWORD") {
      if (IS_PALA_DEF) {
        continue;
      }
      if (numberOfUnits > NUMBER_OF_DUAl_TO_PRESERVE)
        numberOfUnits -= NUMBER_OF_DUAl_TO_PRESERVE;
    }

    split = Math.abs(Math.floor(numberOfUnits / numberOfReadyScavs));
    splits[UNIT] = split;
  }

  return splits;
}

function insertUnit(name, value) {
  $(`[name=${name.toLowerCase()}]`).val(value).trigger("change");
}

function getRandomSleepTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  let numberOfReadyScavs = $(".free_send_button").length;
  for (; 0 < numberOfReadyScavs; numberOfReadyScavs--) {
    const UNIT_SPLITS = getUnitSplits(numberOfReadyScavs);

    for (const UNIT of UNITS_TO_SEND) {
      insertUnit(UNIT, UNIT_SPLITS[UNIT]);
      await sleep(getRandomSleepTime(200, 400));
    }

    $(".free_send_button")[0].click();
    await sleep(getRandomSleepTime(300, 500));
  }
})();
