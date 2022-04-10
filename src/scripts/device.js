import parseParamsURL from "./helpers/parseParamsURL";
import parseTime from "./helpers/parseTime";
import DeviceUtil from "./utils/DeviceUtil";

// Global var
const deviceID = parseParamsURL({ param: "deviceID" });
const timeInterval = 1000;
let timestampTracker = "";

// Select elements
const chartDiv = document.querySelector("#chart_div");
const lineChartDiv = document.querySelector("#line_chart_div");
const deviceIDSpan = document.querySelector("#device-id");
const deviceNameSpan = document.querySelector("#device-name");

// Declare functions
async function drawGaugeChart() {
  try {
    const { timestamp, temperature } = await DeviceUtil.fetchLastTemperature({
      deviceID,
    });
    timestampTracker = timestamp;

    if (!temperature)
      return (document.getElementById(
        "chart_div"
      ).innerHTML = `<p class="text-red-700 font-bold">Cannot get lastest temperature</p>`);

    const data = google.visualization.arrayToDataTable([
      ["Label", "Value"],
      ["Temperature", temperature],
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
      const { timestamp, temperature } = await DeviceUtil.fetchLastTemperature({
        deviceID,
      });
      data.setValue(0, 1, temperature);
      chart.draw(data, options);

      timestampTracker = timestamp;
    }, timeInterval);

    return true;
  } catch (error) {
    return;
  }
}

async function drawLineChart() {
  try {
    const res = await DeviceUtil.fetchTemperatureOverTime({ deviceID });
    const temperatureData = res.map((item) => {
      const values = Object.values(item);
      return [parseTime(values[0]), Number(values[1])];
    });

    const data = google.visualization.arrayToDataTable(
      [["Timestamp", "Temperature"]].concat(temperatureData)
    );

    const options = {
      legend: { position: "bottom" },
    };

    const chart = new google.visualization.LineChart(lineChartDiv);
    chart.draw(data, options);

    // Fetch new temperature every 10 seconds
    setInterval(async () => {
      const { timestamp, temperature } = await DeviceUtil.fetchLastTemperature({
        deviceID,
      });

      if (timestamp !== timestampTracker) {
        data.addRow([parseTime(timestamp), temperature]);
        chart.draw(data, options);
      }

      timestampTracker = timestamp;
    }, timeInterval);

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
      google.charts.load("current", { packages: ["gauge", "corechart"] });
      google.charts.setOnLoadCallback(drawGaugeChart);
      google.charts.setOnLoadCallback(drawLineChart);
    }
  } catch (error) {
    console.error("Error displaying device data");
  }
});
