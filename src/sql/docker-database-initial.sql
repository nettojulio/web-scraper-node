CREATE TABLE items(
  id INTEGER NOT NULL,
  keyword VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(7, 2) NOT NULL,
  PRIMARY KEY (id, keyword)
);