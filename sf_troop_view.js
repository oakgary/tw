const getTroops = () => {
  let off3000 = 0;
  let off4000 = 0;
  let off5000 = 0;
  let off6000p = 0;
  let katas30x100 = 0;
  let katas100p = 0;

  $($("div#ally_content table")[1])
    .find("tr")
    .each((i, village) => {
      if (i === 0) return;
      const axes = parseInt(
        $(village).children("td:nth-child(4)").text().trim(),
        10
      );
      const lights = parseInt(
        $(village).children("td:nth-child(6)").text().trim(),
        10
      );
      const katas = parseInt(
        $(village).children("td:nth-child(9)").text().trim(),
        10
      );

      if (axes >= 3000 && axes < 4000 && lights > 1000) {
        off3000++;
      } else if (axes >= 4000 && axes < 5000 && lights > 1000) {
        off4000++;
      } else if (axes >= 5000 && axes < 6000 && lights > 1500) {
        off5000++;
      } else if (axes >= 6000 && lights > 2000) {
        off6000p++;
      }

      if (katas >= 30 && katas < 100) {
        katas30x100++;
      } else if (katas >= 100) {
        katas100p++;
      }
    });
  return { off3000, off4000, off5000, off6000p, katas30x100, katas100p };
};

const getUserName = () => {
  return $("[name='player_id'] option:selected").text().trim();
};

const getIsoDate = () => {
  return new Date().toISOString();
};

const getTroopsFromLocalStorage = () => {
  const sfTroops = window.localStorage.getItem("sf_troops");
  return sfTroops ? JSON.parse(sfTroops) : {};
};

const setTroopsToLocalStorage = (troops) => {
  window.localStorage.setItem(`sf_troops`, JSON.stringify(troops));
};

const addCurrentUserToLocalStorage = () => {
  const troopValues = getTroops();
  const userName = getUserName();
  const isoDate = getIsoDate();
  const currentTroops = getTroopsFromLocalStorage();
  const newTroops = {
    ...currentTroops,
    [userName]: { troopValues, lastUpdated: isoDate },
  };
  setTroopsToLocalStorage(newTroops);
};

const isoDateToString = (isoString) => {
  const d = new Date(isoString);
  return (
    ("0" + d.getDate()).slice(-2) +
    "." +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "." +
    d.getFullYear() +
    " " +
    ("0" + d.getHours()).slice(-2) +
    ":" +
    ("0" + d.getMinutes()).slice(-2)
  );
};

const registerCollapsibleListener = () => {
  const coll = document.getElementsByClassName("collapsible");
  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
};

const renderTroopsAsTable = () => {
  const currentTroops = getTroopsFromLocalStorage();

  if (Object.keys(currentTroops).length > 0) {
    console.log(currentTroops);
    $(`<button type="button" class="collapsible">SF-Truppen</button>
<div class="table-responsive" style="display: none;">
   <table class="vis w100">
      <tbody>
         <tr>
            <th>Spieler</th>
            <th>3k+ Off</th>
            <th>4k+ Off</th>
            <th>5k+ Off</th>
            <th>6k+ Off</th>
            <th>30-100 Katas</th>
            <th>100+ Katas</th>
            <th>Zuletzt aktualisiert</th>
         </tr>
         ${Object.keys(currentTroops).map((userName) => {
           const troopValues = currentTroops[userName].troopValues;
           const lastUpdated = currentTroops[userName].lastUpdated;
           const lastUpdatedStr = isoDateToString(lastUpdated);
           return `<tr>
            <td>${userName}</td>
            <td>${troopValues.off3000}</td>
            <td>${troopValues.off4000}</td>
            <td>${troopValues.off5000}</td>
            <td>${troopValues.off6000p}</td>
            <td>${troopValues.katas30x100}</td>
            <td>${troopValues.katas100p}</td>
            <td>${lastUpdatedStr}</td>
         </tr>`;
         })}
      </tbody>
   </table>
</div>`).insertAfter("[name='player_id']");
  }
};

addCurrentUserToLocalStorage();
renderTroopsAsTable();
registerCollapsibleListener();
