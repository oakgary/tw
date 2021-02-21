const getTroops=()=>{let t=0,e=0,o=0,n=0,s=0,r=0;return $($("div#ally_content table")[1]).find("tr").each((a,l)=>{if(0===a)return;const i=parseInt($(l).children("td:nth-child(4)").text().trim(),10),d=parseInt($(l).children("td:nth-child(6)").text().trim(),10),c=parseInt($(l).children("td:nth-child(9)").text().trim(),10);i>=3e3&&i<4e3&&d>1e3?t++:i>=4e3&&i<5e3&&d>1e3?e++:i>=5e3&&i<6e3&&d>1500?o++:i>=6e3&&d>2e3&&n++,c>=30&&c<100?s++:c>=100&&r++}),{off3000:t,off4000:e,off5000:o,off6000p:n,katas30x100:s,katas100p:r}},getUserName=()=>$("[name='player_id'] option:selected").text().trim(),getIsoDate=()=>(new Date).toISOString(),getTroopsFromLocalStorage=()=>{const t=window.localStorage.getItem("sf_troops");return t?JSON.parse(t):{}},setTroopsToLocalStorage=t=>{window.localStorage.setItem("sf_troops",JSON.stringify(t))},addCurrentUserToLocalStorage=()=>{const t=getUserName();if("Mitglied auswählen"===t)return;const e=getTroops(),o=getIsoDate(),n={...getTroopsFromLocalStorage(),[t]:{troopValues:e,lastUpdated:o}};setTroopsToLocalStorage(n)},isoDateToString=t=>{const e=new Date(t);return("0"+e.getDate()).slice(-2)+"."+("0"+(e.getMonth()+1)).slice(-2)+"."+e.getFullYear()+" "+("0"+e.getHours()).slice(-2)+":"+("0"+e.getMinutes()).slice(-2)},registerCollapsibleListener=()=>{const t=document.getElementsByClassName("collapsible");for(let e=0;e<t.length;e++)t[e].addEventListener("click",function(){var t=this.nextElementSibling;"block"===t.style.display?t.style.display="none":t.style.display="block"})},renderTroopsAsTable=()=>{const t=getTroopsFromLocalStorage();Object.keys(t).length>0&&$(`<button type="button" class="collapsible">SF-Truppen</button>\n<div class="table-responsive" style="display: none;">\n   <table class="vis w100">\n      <tbody>\n         <tr>\n            <th>Spieler</th>\n            <th>3k+ Off</th>\n            <th>4k+ Off</th>\n            <th>5k+ Off</th>\n            <th>6k+ Off</th>\n            <th>30-100 Katas</th>\n            <th>100+ Katas</th>\n            <th>Zuletzt aktualisiert</th>\n         </tr>\n         ${Object.keys(t).map(e=>{const o=t[e].troopValues,n=t[e].lastUpdated,s=isoDateToString(n);return`<tr>\n            <td>${e}</td>\n            <td>${o.off3000}</td>\n            <td>${o.off4000}</td>\n            <td>${o.off5000}</td>\n            <td>${o.off6000p}</td>\n            <td>${o.katas30x100}</td>\n            <td>${o.katas100p}</td>\n            <td>${s}</td>\n         </tr>`}).join("")}\n      </tbody>\n   </table>\n</div>`).insertAfter("[name='player_id']")};addCurrentUserToLocalStorage(),renderTroopsAsTable(),registerCollapsibleListener();