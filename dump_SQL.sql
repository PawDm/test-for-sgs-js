DROP TABLE IF EXISTS [cities];
		
CREATE TABLE cities (
  [id] INTEGER NOT NULL IDENTITY,
  [city_name] VARCHAR(10) NOT NULL,
  PRIMARY KEY ([id])
);
DROP TABLE IF EXISTS [shops];
		
CREATE TABLE shops (
  [id] INTEGER NOT NULL IDENTITY,
  [shop_name] VARCHAR(10) NOT NULL,
  [city_id] INTEGER NOT NULL,
  [id_cities] INTEGER NOT NULL,
  PRIMARY KEY ([id])
);
DROP TABLE IF EXISTS [workers];
		
CREATE TABLE workers (
  [id] INTEGER  NOT NULL IDENTITY ,
  [worker_name] VARCHAR(20) NOT NULL,
  [id_shops] INTEGER NOT NULL,
  PRIMARY KEY ([id])
);

DROP TABLE IF EXISTS [brigades];
		
CREATE TABLE brigades (
  [id] INTEGER NOT NULL IDENTITY,
  [brigades_time] TIME(0) NOT NULL,
  PRIMARY KEY ([id])
);

DROP TABLE IF EXISTS [WorkShifts];
		
CREATE TABLE WorkShifts (
  [id] INTEGER NOT NULL IDENTITY,
  [workShift_name] VARCHAR(10) NOT NULL,
  PRIMARY KEY ([id])
);
DROP TABLE IF EXISTS [main_table];
		
CREATE TABLE main_table (
  [id] INTEGER NOT NULL IDENTITY,
  [city_id] INTEGER NOT NULL,
  [id_shops] INTEGER NOT NULL,
  [id_workers] INTEGER NULL DEFAULT NULL,
  [id_brigades] INTEGER NOT NULL,
  [id_WorkShifts] INTEGER NOT NULL,
  PRIMARY KEY ([id])
);

ALTER TABLE [shops] ADD FOREIGN KEY (id_cities) REFERENCES cities ([id]);
ALTER TABLE [workers] ADD FOREIGN KEY (id_shops) REFERENCES shops ([id]);
ALTER TABLE [main_table] ADD FOREIGN KEY (city_id) REFERENCES cities ([id]);
ALTER TABLE [main_table] ADD FOREIGN KEY (id_shops) REFERENCES shops ([id]);
ALTER TABLE [main_table] ADD FOREIGN KEY (id_workers) REFERENCES workers ([id]);
ALTER TABLE [main_table] ADD FOREIGN KEY (id_brigades) REFERENCES brigades ([id]);
ALTER TABLE [main_table] ADD FOREIGN KEY (id_WorkShifts) REFERENCES WorkShifts ([id]);
