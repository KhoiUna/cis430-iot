import config from "../config/config";

export default class DeviceUtil {
  static async fetchDevices() {
    try {
      const { error, success } = await (
        await fetch(`${config.origin}/getDevices.php`)
      ).json();

      if (error) return;
      return success;
    } catch (error) {
      console.error("Error fetching devices");
      return;
    }
  }

  static async fetchLastTemperature({ deviceID }) {
    try {
      const { error, success } = await (
        await fetch(
          `${config.origin}/getLastTemperature.php?deviceID=${deviceID}`
        )
      ).json();

      if (error) return;
      return success;
    } catch (error) {
      console.error("Error fetching last temperature", error);
      return;
    }
  }

  static async fetchTemperatureOverTime({ deviceID }) {
    try {
      const { error, success } = await (
        await fetch(
          `${config.origin}/getTemperatureOverTime.php?deviceID=${deviceID}`
        )
      ).json();

      if (error) return;
      return success;
    } catch (error) {
      console.error("Error fetching temperature over time data");
    }
  }

  static async fetchDeviceName({ deviceID }) {
    try {
      const { error, success } = await (
        await fetch(`${config.origin}/getDeviceName.php?deviceID=${deviceID}`)
      ).json();

      if (error) return;
      return success;
    } catch (error) {
      console.error("Error fetching device name", error);
      return;
    }
  }
}
