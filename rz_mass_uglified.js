var DEFAULT_MINUTES=288,DURATION_FACTOR=.8845033719,DURATION_EXPONENT=.45,DURATION_INITIAL_SECONDS=1800,UNIT_TYPES=["spear","sword","axe","light","heavy"],HAUL_VALUES={spear:25,sword:15,axe:10,light:80,heavy:50},HAUL_FACTORS={1:.1,2:.25,3:.5,4:.75},troopSelectionDivHtml='<div  ID= troopSelectionTable><table class="scavengeTable" width="60%" style="border: 7px solid rgba(121,0,0,0.71); border-image-slice: 7 7 7 7; border-image-source: url(https://dsen.innogamescdn.com/asset/cf2959e7/graphic/border/frame-gold-red.png);"><tbody><tr><th style="text-align:center" colspan="11">Wähle zu sendende Einheiten</th>      </tr>      <tr>         <th style="text-align:center" width="35"><a href="#" class="unit_link" data-unit="spear"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_spear.png" title="Spear fighter" alt="" class=""></a></th>         <th style="text-align:center" width="35"><a href="#" class="unit_link" data-unit="sword"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_sword.png" title="Swordsman" alt="" class=""></a></th>         <th style="text-align:center" width="35"><a href="#" class="unit_link" data-unit="axe"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_axe.png" title="Axeman" alt="" class=""></a></th>         <th style="text-align:center" width="35"><a href="#" class="unit_link" data-unit="light"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_light.png" title="Light cavalry" alt="" class=""></a></th>         <th style="text-align:center" width="35"><a href="#" class="unit_link" data-unit="heavy"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_heavy.png" title="Heavy cavalry" alt="" class=""></a></th>         </tr>         <tr>         <td align="center"><input type="checkbox" ID="troop_selection_spear" name="spear"></td>         <td align="center"><input type="checkbox" ID="troop_selection_sword" name="sword" ></td>         <td align="center"><input type="checkbox" ID="troop_selection_axe" name="axe" ></td>         <td align="center"><input type="checkbox" ID="troop_selection_light" name="light" ></td>         <td align="center"><input type="checkbox" ID="troop_selection_heavy" name="heavy" ></td>         </tbody>         </table>         </br>         </div>         ',timeSelectionDivHtml='<div  ID= timeTable><table class="scavengeTable" width="60%" style="border: 7px solid rgba(121,0,0,0.71); border-image-slice: 7 7 7 7; border-image-source: url(https://dsen.innogamescdn.com/asset/cf2959e7/graphic/border/frame-gold-red.png);"> <tbody>      <tr>         <th style="text-align:center" colspan="11">Wähle gewünschte Laufzeit</th>      </tr>      <tr>         <td ID="runtime" align="center"><input type="text" ID="minutes_input" name="minutes" size="4" maxlength="4" align=left > Minuten</td>   </tbody></table></br></div>',troopDisplayDivHtml='<div  ID= troopDisplayTable><table class="scavengeTable" width="60%" style="border: 7px solid rgba(121,0,0,0.71); border-image-slice: 7 7 7 7; border-image-source: url(https://dsen.innogamescdn.com/asset/cf2959e7/graphic/border/frame-gold-red.png);"> <tbody>      <tr>         <th style="text-align:center" colspan="11">Einheiten, die gesendet werden</th>      </tr>      <tr>         <th style="text-align:center" width="35">#</th>         <th style="text-align:center" width="35"><a href="#" class="unit_link" data-unit="spear"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_spear.png" title="Spear fighter" alt="" class=""></a></th>         <th style="text-align:center" width="35"><a href="#" class="unit_link" data-unit="sword"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_sword.png" title="Swordsman" alt="" class=""></a></th>         <th style="text-align:center" width="35"><a href="#" class="unit_link" data-unit="axe"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_axe.png" title="Axeman" alt="" class=""></a></th>         <th style="text-align:center" width="35"><a href="#" class="unit_link" data-unit="light"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_light.png" title="Light cavalry" alt="" class=""></a></th>         <th style="text-align:center" width="35"><a href="#" class="unit_link" data-unit="heavy"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_heavy.png" title="Heavy cavalry" alt="" class=""></a></th>         <th style="text-align:center" width="35">Aktiv</th>      </tr>      <tr>         <td align="center">RZ1</td>         <td align="center"><input disabled size="4" maxlength="4" ID="scav1_spear" name="scav1_spear"></td>         <td align="center"><input disabled size="4" maxlength="4" ID="scav1_sword" name="scav1_sword" ></td>         <td align="center"><input disabled size="4" maxlength="4" ID="scav1_axe" name="scav1_axe" ></td>         <td align="center"><input disabled size="4" maxlength="4" ID="scav1_light" name="scav1_light" ></td>         <td align="center"><input disabled size="4" maxlength="4" ID="scav1_heavy" name="scav1_heavy" ></td>         <td align="center"><input type="checkbox" ID="scav1_active" name="scav1_active" checked></td>      </tr>      <tr>         <td align="center">RZ2</td>         <td align="center"><input disabled size="4" maxlength="4" ID="scav2_spear" name="scav2_spear"></td>         <td align="center"><input disabled size="4" maxlength="4" ID="scav2_sword" name="scav2_sword" ></td>         <td align="center"><input disabled size="4" maxlength="4" ID="scav2_axe" name="scav2_axe" ></td>         <td align="center"><input disabled size="4" maxlength="4" ID="scav2_light" name="scav2_light" ></td>         <td align="center"><input disabled size="4" maxlength="4" ID="scav2_heavy" name="scav2_heavy" ></td>         <td align="center"><input type="checkbox" ID="scav2_active" name="scav2_active" checked></td>      </tr>      <tr>         <td align="center">RZ3</td>         <td align="center"><input disabled size="4" maxlength="4" ID="scav3_spear" name="scav3_spear"></td>         <td align="center"><input disabled size="4" maxlength="4" ID="scav3_sword" name="scav3_sword" ></td>         <td align="center"><input disabled size="4" maxlength="4" ID="scav3_axe" name="scav3_axe" ></td>         <td align="center"><input disabled size="4" maxlength="4" ID="scav3_light" name="scav3_light" ></td>         <td align="center"><input disabled size="4" maxlength="4" ID="scav3_heavy" name="scav3_heavy" ></td>         <td align="center"><input type="checkbox" ID="scav3_active" name="scav3_active" checked></td>      </tr>      <tr>         <td align="center">RZ4</td>         <td align="center"><input disabled size="4" maxlength="4" ID="scav4_spear" name="scav4_spear"></td>         <td align="center"><input disabled size="4" maxlength="4" ID="scav4_sword" name="scav4_sword" ></td>         <td align="center"><input disabled size="4" maxlength="4" ID="scav4_axe" name="scav4_axe" ></td>         <td align="center"><input disabled size="4" maxlength="4" ID="scav4_light" name="scav4_light" ></td>         <td align="center"><input disabled size="4" maxlength="4" ID="scav4_heavy" name="scav4_heavy" ></td>         <td align="center"><input type="checkbox" ID="scav4_active" name="scav4_active" checked></td>      </tr>      <tr>         <td align="center">SUM</td>         <td align="center"><input disabled size="4" maxlength="4" ID="scavsum_spear" name="scavsum_spear"></td>         <td align="center"><input disabled size="4" maxlength="4" ID="scavsum_sword" name="scavsum_sword" ></td>         <td align="center"><input disabled size="4" maxlength="4" ID="scavsum_axe"   name="scavsum_axe" ></td>         <td align="center"><input disabled size="4" maxlength="4" ID="scavsum_light" name="scavsum_light" ></td>         <td align="center"><input disabled size="4" maxlength="4" ID="scavsum_heavy" name="scavsum_heavy" ></td>         <th style="text-align:center" width="35"></th>      </tr>   </tbody></table></br></div>';function getRandomSleepTime(e,t){return Math.floor(Math.random()*(t-e+1)+e)}function sleep(e){return new Promise(t=>setTimeout(t,e))}function calculateHaulsForEachScavengeByMinutes(e){const t=((60*e/DURATION_FACTOR-DURATION_INITIAL_SECONDS)**(1/DURATION_EXPONENT)/100)**.5,a={1:0,2:0,3:0,4:0};return getCheckedScavenges().forEach(e=>{a[e]=parseInt(t/HAUL_FACTORS[e])}),a}function getUnitsToSendByAmountOfHaul(e,t){const a={};UNIT_TYPES.forEach(e=>a[e]=0);const n=e/t.length;return t.forEach(e=>{a[e]=parseInt(n/HAUL_VALUES[e])}),a}function getCheckedUnitTypes(){return UNIT_TYPES.filter(e=>$(`#troop_selection_${e}`).is(":checked"))}function getCheckedScavenges(){return[1,2,3,4].filter(e=>$(`#scav${e}_active`).is(":checked"))}function navigateToMassScavenge(){window.location.href.indexOf("screen=place&mode=scavenge_mass")<0&&window.location.assign(game_data.link_base_pure+"place&mode=scavenge_mass")}function registerEventListeners(){$("#minutes_input").change(()=>{fillTroopDisplay(),updateLocalStorage("script_minutes",$("#minutes_input").val())}),$("#troopSelectionTable :checkbox").change(()=>{fillTroopDisplay(),updateLocalStorage("script_checked_unit_types",JSON.stringify(getCheckedUnitTypes()))}),$("#troopDisplayTable :checkbox").change(()=>{fillTroopDisplay(),updateLocalStorage("script_checked_scavenges",JSON.stringify(getCheckedScavenges()))}),$("#script_send_button").click(function(){sendScavenges()})}function updateLocalStorage(e,t){localStorage.setItem(e,t)}function generateInputs(e){inputDiv=document.createElement("div"),troopSelectionDiv=document.createElement("div"),timeSelectionDiv=document.createElement("div"),troopSelectionDiv.innerHTML=troopSelectionDivHtml,timeSelectionDiv.innerHTML=timeSelectionDivHtml,inputDiv.append(timeSelectionDiv.firstChild),inputDiv.append(troopSelectionDiv.firstChild),e.append(inputDiv)}function generateDisplays(e){displayDiv=document.createElement("div"),troopDisplayDiv=document.createElement("div"),sendButton=document.createElement("button"),statusParagraph=document.createElement("p"),sendButton.innerHTML="Automatisch abschicken",sendButton.setAttribute("id","script_send_button"),statusParagraph.setAttribute("id","script_status"),troopDisplayDiv.innerHTML=troopDisplayDivHtml,statusParagraph.innerHTML="Status: auf Eingabe wartend",displayDiv.append(troopDisplayDiv.firstChild),displayDiv.append(sendButton),displayDiv.append(statusParagraph),e.append(displayDiv)}function fillTroopTable(e,t){UNIT_TYPES.forEach(a=>{$(`#scav${e}_${a}`).val(t[a])})}function sumUpUnitsToSendByUnitType(e){const t={};return UNIT_TYPES.forEach(e=>t[e]=0),Object.keys(e).forEach(a=>{const n=e[a];Object.keys(n).forEach(e=>{t[e]+=n[e]})}),t}function fillTroopDisplay(){const e=parseInt($("#minutes_input").val()),t=getCheckedUnitTypes(),a=calculateHaulsForEachScavengeByMinutes(e),n={};Object.keys(a).forEach(e=>{const i=getUnitsToSendByAmountOfHaul(a[e],t);n[e]=i}),console.log({unitsToSendByUnitTypeAndScavenge:n}),Object.keys(n).forEach(e=>{fillTroopTable(e,n[e])});const i=sumUpUnitsToSendByUnitType(n);console.log({sumOfUnitsToSendByUnitType:i}),fillTroopTable("sum",i)}function loadDefaultValues(){const e=JSON.parse(localStorage.getItem("script_minutes"))||DEFAULT_MINUTES;$("#minutes_input").val(parseInt(e,10));const t=JSON.parse(localStorage.getItem("script_checked_unit_types"));t&&t.forEach(e=>{$(`#troop_selection_${e}`).prop("checked",!0).trigger("change")});const a=JSON.parse(localStorage.getItem("script_checked_scavenges"));if(a){[1,2,3,4].filter(e=>!a.includes(e)).forEach(e=>{$(`#scav${e}_active`).prop("checked",!1).trigger("change")})}}function initiateInterface(){scriptDiv=document.createElement("div"),scriptDiv.setAttribute("id","scriptDiv"),generateInputs(scriptDiv),generateDisplays(scriptDiv),scavenge_mass_screen.prepend(scriptDiv),registerEventListeners(),$("#scriptDiv").css("display","grid"),$("#scriptDiv").css("grid-template-columns","40% 60%"),$("#script_status").css("margin-left","8px"),loadDefaultValues(),fillTroopDisplay()}function updateStatus(e){$("#script_status").text(`Status: ${e}`)}function getUnitsToSendFromTroopsTable(e){const t={};return getCheckedUnitTypes().forEach(a=>{const n=parseInt($(`#scav${e}_${a}`).val(),10);n>0&&(t[a]=n)}),t}function insertUnit(e,t){$(`[name=${e}]`).val(t).trigger("change")}async function emptyTroops(e){for(const t of e)$(`[name=${t}]`).val("").trigger("change"),await sleep(getRandomSleepTime(300,500))}function setScavengeCheckbox(e,t){$(`[data-option=${e}]`).prop("checked",t).trigger("change")}async function sendScavenges(){updateStatus("Script läuft. Bitte warten.");for(let e=4;0<e;e--){const t=getUnitsToSendFromTroopsTable(e);if(0!==Object.keys(t).length){for(const a of Object.keys(t))console.log("inserting ",a," for scavenge ",e),insertUnit(a,t[a]),await sleep(getRandomSleepTime(300,500));await sleep(getRandomSleepTime(100,200)),setScavengeCheckbox(e,!0),await sleep(getRandomSleepTime(200,300)),$(".btn-send").click(),await sleep(getRandomSleepTime(300,500)),setScavengeCheckbox(e,!1),await sleep(getRandomSleepTime(200,300)),await emptyTroops(Object.keys(t))}}updateStatus("Script beendet. Warte auf neue Eingabe.")}(async()=>{const e=window.location.href.indexOf("screen=place&mode=scavenge_mass")>0,t=$("#troopSelectionTable").length>0;console.log({IS_ON_MASS_SCAVENGE_SCREEN:e,IS_INTERFACE_LOADED:t}),e?t?UI.InfoMessage("Script bereits initialisiert. Bitte über Interface starten.",5e3,!0):initiateInterface():navigateToMassScavenge()})();