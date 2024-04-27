/*CREATE DATABASE orderup;*/

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE organization(
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  loginName VARCHAR(20) UNIQUE NOT NULL,
  cnpj VARCHAR(14) UNIQUE NOT NULL,
  email VARCHAR(80) UNIQUE NOT NULL,
  telephone VARCHAR(11) NOT NULL,
  zipcode VARCHAR(8) NOT NULL,
  street VARCHAR(80) NOT NULL,
  number INTEGER NOT NULL,
  city VARCHAR(50) NOT NULL,
  state VARCHAR(2) NOT NULL,
  expire_date TIMESTAMP NOT NULL,
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE TABLE admin(
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  cpf VARCHAR(11) UNIQUE NOT NULL,
  email VARCHAR(80) UNIQUE NOT NULL,
  telephone VARCHAR(11) NOT NULL,
  birth_date DATE NOT NULL,
  password VARCHAR(60) NOT NULL,
  fk_organization_id UUID NOT NULL REFERENCES organization(id),
  CONSTRAINT check_valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT check_valid_cpf CHECK (cpf ~ '^\d{11}$')
);

CREATE TYPE type_enum AS ENUM ('mesa', 'cozinha', 'balcao');

CREATE TABLE device(
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type type_enum NOT NULL,
  name VARCHAR(80) NOT NULL,
  hashcode VARCHAR(8) UNIQUE NOT NULL,
  fk_organization_id UUID NOT NULL REFERENCES organization(id)
);

CREATE TABLE category(
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(200) NOT NULL,
  fk_organization_id UUID NOT NULL REFERENCES organization(id)
);

CREATE TABLE product(
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  price MONEY NOT NULL,
  description VARCHAR(200) NOT NULL,
  image_name varchar(255) UNIQUE NOT NULL,
  fk_organization_id UUID NOT NULL REFERENCES organization(id),
  fk_category_id UUID NOT NULL REFERENCES category(id),
  CONSTRAINT check_valid_price CHECK (price > '0'::MONEY)
);

CREATE TABLE ordering(
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  ordering_dt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  finished boolean DEFAULT false,
  fk_device_id UUID NOT NULL REFERENCES device(id)
);

CREATE TYPE status_enum AS ENUM ('Em Espera', 'Em Preparo', 'Pronto', 'Cancelado');

CREATE TABLE ordering_product(
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  status status_enum NOT NULL DEFAULT 'Em Espera',
  fk_ordering_id UUID NOT NULL REFERENCES ordering(id),
  fk_product_id UUID NOT NULL REFERENCES product(id)
);
