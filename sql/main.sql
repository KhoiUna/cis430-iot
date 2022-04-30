CREATE TABLE iot_data.Device (
  id INT NOT NULL AUTO_INCREMENT,
  Name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE iot_data.Temperature (
  DeviceID INT NOT NULL,
  `Timestamp` DATETIME NOT NULL,
  DeviceTemp DECIMAL(16,2) NOT NULL,
  PRIMARY KEY (DeviceID, `Timestamp`)
);

INSERT INTO Device(Name) VALUES ('temperature-sensor');
INSERT INTO Device(Name) VALUES ('pressure-sensor');
