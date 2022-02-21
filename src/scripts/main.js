import fetchDevices from "./utils/fetchDevices";

// Select elements
const menuButton = document.querySelector("#menu-button");
const dropdownMenu = document.querySelector("#dropdown-menu");
const menuArrowIcon = document.querySelector("#menu-arrow-icon");

menuButton.addEventListener("click", () => {
  dropdownMenu.classList.toggle("hidden");
  menuArrowIcon.classList.toggle("rotate-180");
});

window.addEventListener("load", async () => {
  try {
    const devices = await fetchDevices();
    devices.forEach(({ DeviceID, Name }) => {
      dropdownMenu.innerHTML += `
      <a
        href="device.html?deviceID=${DeviceID}"
        class="text-gray-700 px-4 py-1 text-sm text-left"
        role="menuitem"
        tabindex="0"
        ><div class="ml-4" role="none"><span class="font-bold mr-2">ID:</span>${DeviceID}
        <span class="font-bold ml-5 mr-2">Name:</span>${Name}</div></a
      >`;
    });
  } catch (error) {
    console.error("Error displaying devices");
  }
});
