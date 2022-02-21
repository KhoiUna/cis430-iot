import config from "../config/config";

export default async function fetchDevices() {
  try {
    const { error, success } = await (
      await fetch(`${config.origin}/getDevices.php`)
    ).json();

    if (error) return;
    return success;
  } catch (error) {
    console.error("Error fetching devices");
    console.log(error);
    return;
  }
}
