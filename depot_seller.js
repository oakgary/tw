const RESSOURCES_TO_SELL = ["iron", "wood", "stone"];
const MAX_RESSOURCE_RATIO = 64;
const SELL_AMOUNT = 900;
const INTERVALL_IN_SECONDS = 30;

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

function getAvailableMerchants() {
  return parseInt($("#market_merchant_available_count").text().trim(), 10);
}

function triggerSell() {
  $("#premium_exchange_form > input")[0].click();
  $(".btn-confirm-yes")[0].click();
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
    setInterval(() => {
      scriptRunner();
    }, INTERVALL_IN_SECONDS * 1000);
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
      return;
    }

    const minutes = Math.floor((distanceInMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distanceInMs % (1000 * 60)) / 1000);

    script_start_button.innerHTML =
      "Nächste Verkauf in: " + minutes + "m " + seconds + "s";
  }, 1000);
}

async function scriptRunner() {
  resetCountdown();
  if (getAvailableMerchants() === 0) return;
  for (const RESSOURCE of RESSOURCES_TO_SELL) {
    if (getRessourceRatio(RESSOURCE) <= MAX_RESSOURCE_RATIO) {
      insertRessourceValue(RESSOURCE, SELL_AMOUNT);
      await sleep(getRandomSleepTime(200, 400));
      triggerSell();
    }
    await sleep(getRandomSleepTime(5000, 6000));
    if (getAvailableMerchants() === 0) break;
  }
}

addStartButton();
