#include <Wire.h>
#include <HTTPClient.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP280.h>
#include <WiFi.h>

Adafruit_BMP280 bme;
String deviceID = "1";

// Replace with your network credentials
const char* ssid     = "<your wifi ssid>";
const char* password = "<your wifi password>";

// REPLACE with your Domain name and URL path or IP address with path
String serverName = "http://<your ip address>/php/postTemperature.php";

// Keep this API Key value to be compatible with the PHP code provided in the project page. 
// If you change the apiKeyValue value, the PHP file /post-esp-data.php also needs to have the same key 
String apiKeyValue = "tPmAT5Ab3j7F9";

void setup() {
  Serial.begin(115200);
  
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) { 
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  
  if (!bme.begin()) {
    Serial.println("Could not find a valid BMP280 sensor, check wiring!");
    while(1);
  }
}

void loop() {
if(WiFi.status()== WL_CONNECTED){
    WiFiClient client;
    HTTPClient http;
    
    // Your Domain name with URL path or IP address with path
    http.begin(client, serverName);
    
    // Specify content-type header
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");

    Serial.print("Temperature = ");
    float temperature = bme.readTemperature();
    Serial.println(temperature);
    
    // Prepare your HTTP POST request data
    String httpRequestData = "apiKey=" + apiKeyValue + "&deviceID=" + deviceID
                          + "&deviceTemp=" + String(temperature)
                          + "";
    Serial.print("httpRequestData: ");
    Serial.println(httpRequestData);

    // Send HTTP POST request
    int httpResponseCode = http.POST(httpRequestData);
     
    if (httpResponseCode>0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
    }
    else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }
    
    // Free resources
    http.end();
  }
  else {
    Serial.println("WiFi Disconnected");
  }
  
  delay(10000); // every 10 seconds
}
