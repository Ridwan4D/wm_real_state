document.addEventListener("DOMContentLoaded", () => {
  fetch("https://ridwan4d.github.io/apartment_api/apartment_api.json")
    .then((response) => response.json())
    .then((data) => populateTable(data))
    .catch((error) => console.error("Error fetching data:", error));
});

function populateTable(apartments) {
  const tableBody = document.querySelector("#tableBody");

  apartments.forEach((apartment) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td class="table_data">${apartment.completion}</td>
        <td class="table_data">${apartment.type}</td>
        <td class="table_data">${apartment.unite_number}</td>
        <td class="table_data">${apartment.floor}</td>
        <td class="table_data">${apartment.room_number}</td>
        <td class="table_data">${apartment.unit_area}</td>
        <td class="table_data">${apartment.loggia}</td>
        <td class="table_data">${apartment.total}</td>
        <td class="table_data">${apartment.discount_price}</td>
        <td class="table_data">${apartment.availability}</td>
        <td class="table_data">${apartment.three_sixty ? "360" : "-"}</td>
      `;

    tableBody.appendChild(row);
  });
}
