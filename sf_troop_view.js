const getTroops = () => {
  let tSpear = 0;
  let tSword = 0;
  let tHeavy = 0;
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
      tSpear += parseInt(
        $(village).children("td:nth-child(2)").text().trim(),
        10
      );

      tSword += parseInt(
        $(village).children("td:nth-child(3)").text().trim(),
        10
      );
      const axes = parseInt(
        $(village).children("td:nth-child(4)").text().trim(),
        10
      );
      const lights = parseInt(
        $(village).children("td:nth-child(6)").text().trim(),
        10
      );
      tHeavy += parseInt(
        $(village).children("td:nth-child(7)").text().trim(),
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

  return {
    tSpear,
    tSword,
    tHeavy,
    off3000,
    off4000,
    off5000,
    off6000p,
    katas30x100,
    katas100p,
  };
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
  const userName = getUserName();
  if (userName === "Mitglied auswählen") return;

  const troopValues = getTroops();
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
    const totalCounters = {
      tSpear: 0,
      tSword: 0,
      tHeavy: 0,
      off3000: 0,
      off4000: 0,
      off5000: 0,
      off6000p: 0,
      katas30x100: 0,
      katas100p: 0,
    };

    const currentTroopsOrderedByUserName = Object.keys(currentTroops)
      .sort()
      .reduce((obj, key) => {
        obj[key] = currentTroops[key];
        return obj;
      }, {});

    const userRows = Object.keys(currentTroopsOrderedByUserName)
      .map((userName) => {
        const {
          tSpear,
          tSword,
          tHeavy,
          off3000,
          off4000,
          off5000,
          off6000p,
          katas30x100,
          katas100p,
        } = currentTroops[userName].troopValues;

        totalCounters.tSpear += tSpear;
        totalCounters.tSword += tSword;
        totalCounters.tHeavy += tHeavy;
        totalCounters.off3000 += off3000;
        totalCounters.off4000 += off4000;
        totalCounters.off5000 += off5000;
        totalCounters.off6000p += off6000p;
        totalCounters.katas30x100 += katas30x100;
        totalCounters.katas100p += katas100p;

        const lastUpdated = currentTroops[userName].lastUpdated;
        const lastUpdatedStr = isoDateToString(lastUpdated);
        return `<tr>
     <td>${userName}</td>
     <td>${tSpear}</td>
     <td>${tSword}</td>
     <td>${tHeavy}</td>
     <td>${off3000}</td>
     <td>${off4000}</td>
     <td>${off5000}</td>
     <td>${off6000p}</td>
     <td>${katas30x100}</td>
     <td>${katas100p}</td>
     <td>${lastUpdatedStr}</td>
  </tr>`;
      })
      .join("");

    const totalRow = `<tr>
    <th style="font-weight: bold;">Gesamt</th>
    <th>${totalCounters.tSpear}</th>
    <th>${totalCounters.tSword}</th>
    <th>${totalCounters.tHeavy}</th>
    <th>${totalCounters.off3000}</th>
    <th>${totalCounters.off4000}</th>
    <th>${totalCounters.off5000}</th>
    <th>${totalCounters.off6000p}</th>
    <th>${totalCounters.katas30x100}</th>
    <th>${totalCounters.katas100p}</th>
    <th>${isoDateToString(new Date().toISOString())}</th>
 </tr>`;

    $(`<button type="button" class="collapsible">SF-Truppen</button>
<div class="table-responsive" style="display: none;">
   <table class="vis w100">
      <tbody>
         <tr>
            <th>Spieler</th>
            <th>Speer</th>
            <th>Schwert</th>
            <th>Skav</th>
            <th>3k+ Off</th>
            <th>4k+ Off</th>
            <th>5k+ Off</th>
            <th>6k+ Off</th>
            <th>30-100 Katas</th>
            <th>100+ Katas</th>
            <th>Zuletzt aktualisiert</th>
         </tr>
         ${userRows}
         ${totalRow}
      </tbody>
   </table>
</div>`).insertAfter("[name='player_id']");
  }
};

addCurrentUserToLocalStorage();
renderTroopsAsTable();
registerCollapsibleListener();
