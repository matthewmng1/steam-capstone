CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25),
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE favorites (
  appid INTEGER,
  userid INTEGER NOT NULL
    REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  backgroundimageurl TEXT NOT NULL
);

CREATE TABLE steam (
  appid INTEGER NOT NULL,
  name TEXT NOt NULL
)