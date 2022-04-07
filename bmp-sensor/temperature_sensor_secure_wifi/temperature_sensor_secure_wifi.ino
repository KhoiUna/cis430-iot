#include <ssl_client.h>
#include <WiFiClientSecure.h>
#include <Wire.h>
#include <Adafruit_BMP280.h>

Adafruit_BMP280 bme;

// Replace with your network credentials
const char* ssid     = "<your wifi ssid>";
const char* password = "<your wifi password>";

// REPLACE with your Domain name and URL path or IP address with path
const char* server = "<your ip address>";
const char* thumbprint = "<your website thumbprint>";
String url = "/php/postTemperature.php";

// Keep this API Key value to be compatible with the PHP code
String apiKeyValue = "tPmAT5Ab3j7F9";
String deviceID = "1";

String httpsPost(String url, String postdata) {
    WiFiClientSecure client;
    if (client.verify(thumbprint, server)) {
          Serial.println("Certificate matches");
    } else {
          Serial.println("Certificate doesn't match");
    }
    //client.setInsecure();//skip verification:  Not secure...for testing only!
    int r = client.connect(server, 443);
    if (!r) {
        return "ERROR";
    } else {
        client.println("POST " + url + " HTTP/1.1");        
        client.println("Host: " + (String)server);
        client.println("User-Agent: ESP32/1.0");
        client.println("Connection: close");
        client.println("Content-Type: application/x-www-form-urlencoded");
        client.print("Content-Length: ");
        client.println(postdata.length());
        client.println(postdata);
        
        delay(10);
        String response = client.readString();
        int bodypos =  response.indexOf("\r\n\r\n") + 4;
        client.stop();
        
        return response.substring(bodypos);
   }
}

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
    Serial.print("Temperature = ");
    float temperature = bme.readTemperature();
    Serial.println(temperature);
    
    // Prepare your HTTP POST request data
    String httpRequestData = "apiKey=" + apiKeyValue + "&deviceID=" + deviceID
                          + "&deviceTemp=" + String(temperature)
                          + "";
    Serial.println(httpsPost(server, httpRequestData));  //Send url and data for the server

    delay(10000); // every 10 seconds
}
