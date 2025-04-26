let viewAll = false;
let allApartments = [];
let selectedFloor = "all";
let selectedRooms = [];
let selectedType = "all";

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://ridwan4d.github.io/apartment_api/apartment_api.json")
    .then((response) => response.json())
    .then((data) => {
      allApartments = data;
      populateTable();
    })
    .catch((error) => console.error("Error fetching data:", error));

  // Floor filter
  document.getElementById("floorSelect").addEventListener("change", (e) => {
    selectedFloor = e.target.value;
    populateTable();
  });


  // Room & Commercial filter buttons
  const roomButtons = document.querySelectorAll(".room_buttons button");
  roomButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const room = button.getAttribute("data-room");

      if (room === "commercial") {
        // Toggle commercial filter
        if (selectedType === "commercial") {
          selectedType = "all";
          button.classList.remove("active");
        } else {
          selectedType = "commercial";
          button.classList.add("active");

          // Deactivate all room buttons
          selectedRooms = [];
          roomButtons.forEach((btn) => {
            const btnRoom = btn.getAttribute("data-room");
            if (btnRoom !== "commercial") {
              btn.classList.remove("active");
            }
          });
        }
        populateTable();
        return;
      }

      // If selecting room, disable commercial filter
      selectedType = "all";
      const commercialBtn = document.querySelector('[data-room="commercial"]');
      if (commercialBtn) commercialBtn.classList.remove("active");

      if (selectedRooms.includes(room)) {
        selectedRooms = selectedRooms.filter((r) => r !== room);
        button.classList.remove("active");
      } else {
        selectedRooms.push(room);
        button.classList.add("active");
      }

      populateTable();
    });
  });
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
  tableBody.innerHTML = "";

  let filteredApartments = allApartments.filter((apt) => {
    const aptType = apt.type?.toLowerCase().trim();

    const matchesFloor =
      selectedFloor === "all" || String(apt.floor) === String(selectedFloor);

    const matchesRoom =
      selectedRooms.length === 0 ||
      (apt.room_number !== null &&
        selectedRooms.includes(String(apt.room_number))
      );

    const matchesType =
      selectedType === "all" ||
      aptType.includes(selectedType.toLowerCase());

    return matchesFloor && matchesRoom && matchesType;
  });

  const apartmentsToShow = viewAll
    ? filteredApartments
    : filteredApartments.slice(0, 10);

  apartmentsToShow.forEach((apartment) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="table_data">${apartment.completion}</td>
      <td class="table_data">${apartment.type}</td>
      <td class="table_data">${apartment.unite_number}</td>
      <td class="table_data">${apartment.floor}</td>
      <td class="table_data">${apartment.room_number ?? "-"}</td>
      <td class="table_data">${apartment.unit_area}</td>
      <td class="table_data">${apartment.loggia}</td>
      <td class="table_data">${apartment.total}</td>
      <td class="table_data">${apartment.discount_price}</td>
      <td class="table_data">${apartment.availability}</td>
      <td class="table_data"><button class="three_sixty">${apartment.three_sixty ? "360" : "-"}</button></td>
    `;

    tableBody.appendChild(row);
  });
}
