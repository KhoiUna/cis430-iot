import DeviceUtil from "./utils/DeviceUtil";

// Select elements
const menuButton = document.querySelector("#menu-button");
const dropdownMenu = document.querySelector("#dropdown-menu");
const menuArrowIcon = document.querySelector("#menu-arrow-icon");

// Declare functions
const closeDropdown = () => {
  dropdownMenu.classList.toggle("hidden");
  menuArrowIcon.classList.toggle("rotate-180");
};

// Main
menuButton.addEventListener("click", closeDropdown);

window.addEventListener("load", async () => {
  try {
    const devices = await DeviceUtil.fetchDevices();
    if (!devices)
      return (dropdownMenu.innerHTML += `
    <div class="ml-4 text-red-700 px-4 py-1 text-sm text-center font-bold" role="none">Error displaying devices</div>`);

    devices.forEach(({ DeviceID, Name }, index) => {
      dropdownMenu.innerHTML += `
      <div id="menu-items" role="none" tabindex="${
        index + 1
      }" class="hover:cursor-pointer text-gray-700 text-md text-left hover:bg-slate-100 py-2 px-4" role="menuitem"><span class="font-bold mr-2">ID:</span>${DeviceID}
        <span class="font-bold ml-5 mr-2">Name:</span>${Name}
      </div>`;
    });

    document.querySelectorAll("#menu-items").forEach((el) =>
      el.addEventListener("click", () => {
        closeDropdown();

        const deviceID = el.getAttribute("tabindex");
        location.replace(`?deviceID=${deviceID}`);
      })
    );
  } catch (error) {
    console.error("Error displaying devices");
    return;
  }
});
