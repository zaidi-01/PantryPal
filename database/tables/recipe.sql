CREATE TABLE IF NOT EXISTS recipe (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name TINYTEXT NOT NULL,
  description TEXT NOT NULL,
  ingredients TEXT NOT NULL,
  directions TEXT NOT NULL,
  image TINYTEXT,
  date_created DATE,
  date_updated DATE,
  categories TEXT,
  cook_time TINYTEXT,
  prep_time TINYTEXT,
  total_time TINYTEXT,
  yield TINYTEXT,
  servings TINYTEXT,
  calories SMALLINT,
  dietary_restrictions TEXT,
  CHECK(date_updated >= date_created)
);