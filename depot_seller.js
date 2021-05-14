const RESSOURCES_TO_SELL = ["iron", "wood", "stone"];
const MAX_RESSOURCE_RATIO = 64;
const SELL_AMOUNT = 900;
const INTERVALL_IN_SECONDS = 10;
const AMOUNT_TO_IGNORE_RATIO = 3000;

function getRandomSleepTime(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function insertRessourceValue(ressource, value) {
  $(`[name=sell_${ressource}]`).val(value).trigger("change");
}

function getRessourceRatio(ressource) {
  return parseInt(
    $(`#premium_exchange_rate_${ressource} > div:nth-child(1)`).text().trim(),
    10
  );
}

function getRessourceValue(ressource) {
  return parseInt($(`#${ressource}`).text().trim(), 10);
}

function getStorageCapacity() {
  return parseInt($("#storage").text().trim(), 10);
}

function getAvailableMerchants() {
  return parseInt($("#market_merchant_available_count").text().trim(), 10);
}

async function triggerSell() {
  $("#premium_exchange_form > input")[0].click();
  await sleep(getRandomSleepTime(500, 700));
  $(".btn-confirm-yes")[0].click();
  await sleep(getRandomSleepTime(200, 300));
  $(".btn-confirm-no:visible")[0];
}

function addStartButton() {
  startButton = document.createElement("button");
  startButton.innerHTML = "Verkaufsbot starten";
  startButton.setAttribute("id", "script_start_button");
  startButton.setAttribute("type", "button");
  startButton.setAttribute("class", "btn btn-default");
  startButton.setAttribute("style", "margin-top: 10px; margin-bottom: 10px;");
  premium_exchange_form.after(startButton);

  $("#script_start_button").click(function () {
    $("#script_start_button").prop("disabled", true);
    scriptRunner();
  });
}

function resetCountdown() {
  const nextCountdownDate = new Date(
    new Date().getTime() + INTERVALL_IN_SECONDS * 1000
  );
  const intv = setInterval(() => {
    const distanceInMs = nextCountdownDate - new Date();
    if (distanceInMs < 1000) {
      clearInterval(intv);
      scriptRunner();
      return;
    }

    const minutes = Math.floor((distanceInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distanceInMs % (1000 * 60)) / 1000);

    script_start_button.innerHTML =
      "Nächster Durchlauf in: " + minutes + "m " + seconds + "s";
  }, 1000);
}

async function scriptRunner() {
  startButton.innerHTML = "Verkaufprozess läuft...";
  if (getAvailableMerchants() === 0) {
    resetCountdown();
    return;
  }
  for (const RESSOURCE of RESSOURCES_TO_SELL) {
    const ressourceValue = getRessourceValue(RESSOURCE); 
    if (ressourceValue >= SELL_AMOUNT && (getRessourceRatio(RESSOURCE) <= MAX_RESSOURCE_RATIO || getStorageCapacity() - ressourceValue < AMOUNT_TO_IGNORE_RATIO)) {
      insertRessourceValue(RESSOURCE, SELL_AMOUNT);
      await sleep(getRandomSleepTime(200, 400));
      await triggerSell();
      if (getAvailableMerchants() === 0) break;
      await sleep(getRandomSleepTime(5000, 6000));
    }
  }
  resetCountdown();
}

addStartButton();
