// todo show sum of units in troops table
// todo allwo custom troop values(?) how would this affect the time

var DEFAULT_MINUTES = 288;
var DURATION_FACTOR = 0.8845033719;
var DURATION_EXPONENT = 0.45;
var DURATION_INITIAL_SECONDS = 1800;

var UNIT_TYPES = ["spear", "sword", "axe", "light", "heavy"];

var HAUL_VALUES = {
  spear: 25,
  sword: 15,
  axe: 10,
  light: 80,
  heavy: 50,
};

var HAUL_FACTORS = {
  1: 0.1,
  2: 0.25,
  3: 0.5,
  4: 0.75,
};

// #region HTML
// #region troopSelectionDivHtml
var troopSelectionDivHtml =
  '<div  ID= troopSelectionTable>\
<table class="scavengeTable" width="60%" style="border: 7px solid rgba(121,0,0,0.71); border-image-slice: 7 7 7 7; border-image-source: url(https://dsen.innogamescdn.com/asset/cf2959e7/graphic/border/frame-gold-red.png);">\
<tbody>\
<tr>\
<th style="text-align:center" colspan="11">Wähle zu sendende Einheiten</th>\
      </tr>\
      <tr>\
         <th style="text-align:center" width="35"><a href="#" class="unit_link" data-unit="spear"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_spear.png" title="Spear fighter" alt="" class=""></a></th>\
         <th style="text-align:center" width="35"><a href="#" class="unit_link" data-unit="sword"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_sword.png" title="Swordsman" alt="" class=""></a></th>\
         <th style="text-align:center" width="35"><a href="#" class="unit_link" data-unit="axe"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_axe.png" title="Axeman" alt="" class=""></a></th>\
         <th style="text-align:center" width="35"><a href="#" class="unit_link" data-unit="light"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_light.png" title="Light cavalry" alt="" class=""></a></th>\
         <th style="text-align:center" width="35"><a href="#" class="unit_link" data-unit="heavy"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_heavy.png" title="Heavy cavalry" alt="" class=""></a></th>\
         </tr>\
         <tr>\
         <td align="center"><input type="checkbox" ID="troop_selection_spear" name="spear"></td>\
         <td align="center"><input type="checkbox" ID="troop_selection_sword" name="sword" ></td>\
         <td align="center"><input type="checkbox" ID="troop_selection_axe" name="axe" ></td>\
         <td align="center"><input type="checkbox" ID="troop_selection_light" name="light" ></td>\
         <td align="center"><input type="checkbox" ID="troop_selection_heavy" name="heavy" ></td>\
         </tbody>\
         </table>\
         </br>\
         </div>\
         ';
// #endregion

// #region timeSelectionDivHtml
var timeSelectionDivHtml =
  '<div  ID= timeTable>\
<table class="scavengeTable" width="60%" style="border: 7px solid rgba(121,0,0,0.71); border-image-slice: 7 7 7 7; border-image-source: url(https://dsen.innogamescdn.com/asset/cf2959e7/graphic/border/frame-gold-red.png);">\
 <tbody>\
      <tr>\
         <th style="text-align:center" colspan="11">Wähle gewünschte Laufzeit</th>\
      </tr>\
      <tr>\
         <td ID="runtime" align="center"><input type="text" ID="minutes_input" name="minutes" size="4" maxlength="4" align=left > Minuten</td>\
   </tbody>\
</table>\
</br>\
</div>\
';
// #endregion

// #region troopDisplayDivHtml
var troopDisplayDivHtml =
  '<div  ID= troopDisplayTable>\
<table class="scavengeTable" width="60%" style="border: 7px solid rgba(121,0,0,0.71); border-image-slice: 7 7 7 7; border-image-source: url(https://dsen.innogamescdn.com/asset/cf2959e7/graphic/border/frame-gold-red.png);">\
 <tbody>\
      <tr>\
         <th style="text-align:center" colspan="11">Einheiten, die gesendet werden</th>\
      </tr>\
      <tr>\
         <th style="text-align:center" width="35">#</th>\
         <th style="text-align:center" width="35"><a href="#" class="unit_link" data-unit="spear"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_spear.png" title="Spear fighter" alt="" class=""></a></th>\
         <th style="text-align:center" width="35"><a href="#" class="unit_link" data-unit="sword"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_sword.png" title="Swordsman" alt="" class=""></a></th>\
         <th style="text-align:center" width="35"><a href="#" class="unit_link" data-unit="axe"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_axe.png" title="Axeman" alt="" class=""></a></th>\
         <th style="text-align:center" width="35"><a href="#" class="unit_link" data-unit="light"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_light.png" title="Light cavalry" alt="" class=""></a></th>\
         <th style="text-align:center" width="35"><a href="#" class="unit_link" data-unit="heavy"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_heavy.png" title="Heavy cavalry" alt="" class=""></a></th>\
         <th style="text-align:center" width="35">Aktiv</th>\
      </tr>\
      <tr>\
         <td align="center">RZ1</td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scav1_spear" name="scav1_spear"></td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scav1_sword" name="scav1_sword" ></td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scav1_axe" name="scav1_axe" ></td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scav1_light" name="scav1_light" ></td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scav1_heavy" name="scav1_heavy" ></td>\
         <td align="center"><input type="checkbox" ID="scav1_active" name="scav1_active" checked></td>\
      </tr>\
      <tr>\
         <td align="center">RZ2</td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scav2_spear" name="scav2_spear"></td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scav2_sword" name="scav2_sword" ></td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scav2_axe" name="scav2_axe" ></td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scav2_light" name="scav2_light" ></td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scav2_heavy" name="scav2_heavy" ></td>\
         <td align="center"><input type="checkbox" ID="scav2_active" name="scav2_active" checked></td>\
      </tr>\
      <tr>\
         <td align="center">RZ3</td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scav3_spear" name="scav3_spear"></td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scav3_sword" name="scav3_sword" ></td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scav3_axe" name="scav3_axe" ></td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scav3_light" name="scav3_light" ></td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scav3_heavy" name="scav3_heavy" ></td>\
         <td align="center"><input type="checkbox" ID="scav3_active" name="scav3_active" checked></td>\
      </tr>\
      <tr>\
         <td align="center">RZ4</td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scav4_spear" name="scav4_spear"></td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scav4_sword" name="scav4_sword" ></td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scav4_axe" name="scav4_axe" ></td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scav4_light" name="scav4_light" ></td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scav4_heavy" name="scav4_heavy" ></td>\
         <td align="center"><input type="checkbox" ID="scav4_active" name="scav4_active" checked></td>\
      </tr>\
      <tr>\
         <td align="center">SUM</td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scavsum_spear" name="scavsum_spear"></td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scavsum_sword" name="scavsum_sword" ></td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scavsum_axe"   name="scavsum_axe" ></td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scavsum_light" name="scavsum_light" ></td>\
         <td align="center"><input disabled size="4" maxlength="4" ID="scavsum_heavy" name="scavsum_heavy" ></td>\
         <th style="text-align:center" width="35"></th>\
      </tr>\
   </tbody>\
</table>\
</br>\
</div>\
';
// #endregion

// #endregion

function getRandomSleepTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// takes minutes returns amounts of haul for each scavenge
function calculateHaulsForEachScavengeByMinutes(minutes) {
  const haul =
    (((minutes * 60) / DURATION_FACTOR - DURATION_INITIAL_SECONDS) **
      (1 / DURATION_EXPONENT) /
      100) **
    (1 / 2);

  const hauls = { 1: 0, 2: 0, 3: 0, 4: 0 };
  const checkedScavenges = getCheckedScavenges();
  checkedScavenges.forEach((scavenge) => {
    hauls[scavenge] = parseInt(haul / HAUL_FACTORS[scavenge]);
  });

  return hauls;
}

function getUnitsToSendByAmountOfHaul(amountOfHaul, unitTypes) {
  const unitsToSend = {};
  UNIT_TYPES.forEach((unitType) => (unitsToSend[unitType] = 0));

  const haulPerUnitType = amountOfHaul / unitTypes.length;
  unitTypes.forEach((unitType) => {
    unitsToSend[unitType] = parseInt(haulPerUnitType / HAUL_VALUES[unitType]);
  });

  return unitsToSend;
}

function getCheckedUnitTypes() {
  return UNIT_TYPES.filter((unitType) =>
    $(`#troop_selection_${unitType}`).is(":checked")
  );
}

function getCheckedScavenges() {
  return [1, 2, 3, 4].filter((scavenge) =>
    $(`#scav${scavenge}_active`).is(":checked")
  );
}

function navigateToMassScavenge() {
  if (window.location.href.indexOf("screen=place&mode=scavenge_mass") < 0) {
    window.location.assign(
      game_data.link_base_pure + "place&mode=scavenge_mass"
    );
  }
}

function registerEventListeners() {
  $("#minutes_input").change(() => {
    fillTroopDisplay();
    updateLocalStorage("script_minutes", $("#minutes_input").val());
  });

  $("#troopSelectionTable :checkbox").change(() => {
    fillTroopDisplay();
    updateLocalStorage(
      "script_checked_unit_types",
      JSON.stringify(getCheckedUnitTypes())
    );
  });

  $("#troopDisplayTable :checkbox").change(() => {
    fillTroopDisplay();
    updateLocalStorage(
      "script_checked_scavenges",
      JSON.stringify(getCheckedScavenges())
    );
  });

  $("#script_send_button").click(function () {
    sendScavenges();
  });
}

function updateLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function generateInputs(scriptDiv) {
  inputDiv = document.createElement("div");

  troopSelectionDiv = document.createElement("div");
  timeSelectionDiv = document.createElement("div");

  troopSelectionDiv.innerHTML = troopSelectionDivHtml;
  timeSelectionDiv.innerHTML = timeSelectionDivHtml;

  inputDiv.append(timeSelectionDiv.firstChild);
  inputDiv.append(troopSelectionDiv.firstChild);
  scriptDiv.append(inputDiv);
}

function generateDisplays(scriptDiv) {
  displayDiv = document.createElement("div");

  troopDisplayDiv = document.createElement("div");
  sendButton = document.createElement("button");
  statusParagraph = document.createElement("p");

  sendButton.innerHTML = "Automatisch abschicken";
  sendButton.setAttribute("id", "script_send_button");
  statusParagraph.setAttribute("id", "script_status");

  troopDisplayDiv.innerHTML = troopDisplayDivHtml;
  statusParagraph.innerHTML = "Status: auf Eingabe wartend";

  displayDiv.append(troopDisplayDiv.firstChild);
  displayDiv.append(sendButton);
  displayDiv.append(statusParagraph);

  scriptDiv.append(displayDiv);
}

function fillTroopTable(scavenge, unitsToSendByUnitType) {
  UNIT_TYPES.forEach((unitType) => {
    $(`#scav${scavenge}_${unitType}`).val(unitsToSendByUnitType[unitType]);
  });
}

function sumUpUnitsToSendByUnitType(unitsToSendByUnitTypeAndScavenge) {
  const sumOfUnitsToSendByUnitType = {};
  UNIT_TYPES.forEach((unitType) => (sumOfUnitsToSendByUnitType[unitType] = 0));
  Object.keys(unitsToSendByUnitTypeAndScavenge).forEach((unitType) => {
    sumOfUnitsToSendByUnitType[unitType] += unitsToSendByUnitTypeAndScavenge[unitType];
  });
  return sumOfUnitsToSendByUnitType;
}

function fillTroopDisplay() {
  const minutes = parseInt($("#minutes_input").val());
  const checkedUnitTypes = getCheckedUnitTypes();
  const haulsByScavenge = calculateHaulsForEachScavengeByMinutes(minutes);

  const unitsToSendByUnitTypeAndScavenge = {};

  Object.keys(haulsByScavenge).forEach((scavenge) => {
    const unitsToSendByUnitType = getUnitsToSendByAmountOfHaul(
      haulsByScavenge[scavenge],
      checkedUnitTypes
    );
    unitsToSendByUnitTypeAndScavenge[scavenge] = unitsToSendByUnitType;
  });

  Object.keys(unitsToSendByUnitTypeAndScavenge).forEach((scavenge) => {
    fillTroopTable(scavenge, unitsToSendByUnitTypeAndScavenge[scavenge]);
  });

  const sumOfUnitsToSendByUnitType = sumUpUnitsToSendByUnitType(
    unitsToSendByUnitTypeAndScavenge
  );
  fillTroopDisplay("sum", sumOfUnitsToSendByUnitType);
}

function loadDefaultValues() {
  const minutes =
    JSON.parse(localStorage.getItem("script_minutes")) || DEFAULT_MINUTES;
  $("#minutes_input").val(parseInt(minutes, 10));

  const checkedUnitTypes = JSON.parse(
    localStorage.getItem("script_checked_unit_types")
  );
  if (checkedUnitTypes) {
    checkedUnitTypes.forEach((unitType) => {
      $(`#troop_selection_${unitType}`).prop("checked", true).trigger("change");
    });
  }

  const checkedScavenges = JSON.parse(
    localStorage.getItem("script_checked_scavenges")
  );
  if (checkedScavenges) {
    const scavengesToDisable = [1, 2, 3, 4].filter(
      (scavenge) => !checkedScavenges.includes(scavenge)
    );
    scavengesToDisable.forEach((scavenge) => {
      $(`#scav${scavenge}_active`).prop("checked", false).trigger("change");
    });
  }
}

function initiateInterface() {
  scriptDiv = document.createElement("div");
  scriptDiv.setAttribute("id", "scriptDiv");

  generateInputs(scriptDiv);
  generateDisplays(scriptDiv);

  scavenge_mass_screen.prepend(scriptDiv);
  registerEventListeners();

  $("#scriptDiv").css("display", "grid");
  $("#scriptDiv").css("grid-template-columns", "40% 60%");
  $("#script_status").css("margin-left", "8px");

  loadDefaultValues();
  fillTroopDisplay();
}

function updateStatus(text) {
  $("#script_status").text(`Status: ${text}`);
}

function getUnitsToSendFromTroopsTable(scavenge) {
  const unitsToSend = {};

  const unitTypesToSend = getCheckedUnitTypes();
  unitTypesToSend.forEach((unitType) => {
    const units = parseInt($(`#scav${scavenge}_${unitType}`).val(), 10);
    if (units > 0) unitsToSend[unitType] = units;
  });
  return unitsToSend;
}

function insertUnit(name, value) {
  $(`[name=${name}]`).val(value).trigger("change");
}

async function emptyTroops(unitTypesToSend) {
  for (const unitType of unitTypesToSend) {
    $(`[name=${unitType}]`).val("").trigger("change");
    await sleep(getRandomSleepTime(300, 500));
  }
}

function setScavengeCheckbox(scavenge, checked) {
  $(`[data-option=${scavenge}]`).prop("checked", checked).trigger("change");
}

async function sendScavenges() {
  updateStatus("Script läuft. Bitte warten.");

  for (let scavenge = 4; 0 < scavenge; scavenge--) {
    const unitsToSend = getUnitsToSendFromTroopsTable(scavenge);
    if (Object.keys(unitsToSend).length === 0) continue;

    for (const unit of Object.keys(unitsToSend)) {
      console.log("inserting ", unit, " for scavenge ", scavenge);
      insertUnit(unit, unitsToSend[unit]);
      await sleep(getRandomSleepTime(300, 500));
    }
    await sleep(getRandomSleepTime(100, 200));
    setScavengeCheckbox(scavenge, true);
    await sleep(getRandomSleepTime(200, 300));
    $(".btn-send").click();
    await sleep(getRandomSleepTime(300, 500));
    setScavengeCheckbox(scavenge, false);
    await sleep(getRandomSleepTime(200, 300));
    await emptyTroops(Object.keys(unitsToSend));
  }

  updateStatus("Script beendet. Warte auf neue Eingabe.");
}

(async () => {
  const IS_ON_MASS_SCAVENGE_SCREEN =
    window.location.href.indexOf("screen=place&mode=scavenge_mass") > 0;
  const IS_INTERFACE_LOADED = $("#troopSelectionTable").length > 0;

  console.log({ IS_ON_MASS_SCAVENGE_SCREEN, IS_INTERFACE_LOADED });

  if (!IS_ON_MASS_SCAVENGE_SCREEN) {
    navigateToMassScavenge();
  } else if (!IS_INTERFACE_LOADED) {
    initiateInterface();
  } else {
    UI.InfoMessage(
      "Script bereits initialisiert. Bitte über Interface starten.",
      5000,
      true
    );
  }
})();
