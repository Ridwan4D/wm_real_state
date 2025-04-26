let viewAll = false;
let allApartments = [];

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://ridwan4d.github.io/apartment_api/apartment_api.json")
    .then((response) => response.json())
    .then((data) => {
      allApartments = data;
      populateTable();
    })
    .catch((error) => console.error("Error fetching data:", error));
});

function toggleView() {
  viewAll = !viewAll;
  document.getElementById("toggleButton").innerText = viewAll
    ? "Show Less"
    : `View all apartments ${allApartments.slice(10, -1).length}`;
  populateTable();
}

function populateTable() {
  const tableBody = document.querySelector("#tableBody");
  tableBody.innerHTML = ""; // Clear existing rows

  const apartmentsToShow = viewAll ? allApartments : allApartments.slice(0, 10);

  apartmentsToShow.forEach((apartment) => {
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
      <td class="table_data"><button class="three_sixty">${
        apartment.three_sixty ? "360" : "-"
      }</button></td>
    `;

    tableBody.appendChild(row);
  });
}
