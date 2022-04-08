import parseParamsURL from "./helpers/parseParamsURL";
import DeviceUtil from "./utils/DeviceUtil";

// Global var
const deviceID = parseParamsURL({ param: "deviceID" });

// Select elements
const chartDiv = document.querySelector("#chart_div");
const deviceIDSpan = document.querySelector("#device-id");
const deviceNameSpan = document.querySelector("#device-name");

// Declare functions
async function drawChart() {
  try {
    const lastTemperature = await DeviceUtil.fetchLastTemperature({ deviceID });

    if (!lastTemperature)
      return (document.getElementById(
        "chart_div"
      ).innerHTML = `<p class="text-red-700 font-bold">Cannot get lastest temperature</p>`);

    const data = google.visualization.arrayToDataTable([
      ["Label", "Value"],
      ["Temperature", lastTemperature],
    ]);

    const options = {
      width: 400,
      height: 120,
      redFrom: 90,
      redTo: 100,
      yellowFrom: 75,
      yellowTo: 90,
      minorTicks: 5,
    };

    const chart = new google.visualization.Gauge(chartDiv);
    chart.draw(data, options);

    // Fetch new temperature every 10 seconds
    setInterval(async () => {
      const lastTemperature = await DeviceUtil.fetchLastTemperature({
        deviceID,
      });
      data.setValue(0, 1, lastTemperature);
      chart.draw(data, options);
    }, 10000);

    return true;
  } catch (error) {
    return;
  }
}

// Main
window.addEventListener("load", async () => {
  try {
    if (deviceID) {
      // Display info
      deviceIDSpan.innerText = deviceID;

      const deviceName = await DeviceUtil.fetchDeviceName({ deviceID });
      deviceNameSpan.innerText = deviceName;

      // Draw gauge
      google.charts.load("current", { packages: ["gauge"] });
      google.charts.setOnLoadCallback(drawChart);
    }
  } catch (error) {
    console.error("Error displaying device data");
  }
});
