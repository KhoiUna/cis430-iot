import config from "../config/config";

export default async function fetchDevices() {
  try {
    const res = await fetch(`${config.origin}/getDevices.php`);
    const devices = await res.json();
    return devices;
  } catch (error) {
    console.error("Error fetching devices");
    return;
  }
}
