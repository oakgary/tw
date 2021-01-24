let calc = {};

$(".row_marker").each((i, village) => {
  $(village)
    .children("tr:first-child")
    .each((j, total) => {
      $(total)
        .children(".unit-item")
        .each((k, cell) => {
          const val = parseInt($(cell).text(), 10);
          calc[k] ? (calc[k] += val) : (calc[k] = val);
        });
    });
});

if (Object.keys(calc).length > 0) {
  $(`<thead>
  <tr>
  <th>Gesamt</th>
  <th></th>
  ${Object.values(calc).map(
    (val) => ` <th style="text-align: center" width="35">${val}</th>`
  )}
    <th></th>
    </tr>
    </thead>
    `).insertAfter("#units_table > thead");
}
