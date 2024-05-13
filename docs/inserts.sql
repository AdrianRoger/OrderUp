--Script sql para gerar dados para testes no banco de dados!


-- Inserts para a tabela de organização
INSERT INTO organization (name, login_name, cnpj, email, telephone, zipcode, street, number, city, state, expire_date)
VALUES 
  ('Restaurante ABC', 'restAbc', '12345678901234', 'restaurante@abc.com', '1122334455', '12345678', 'Rua Principal', 123, 'Cidade A', 'DF', '2024-12-31'),
  ('Café XYZ', 'cofexyz', '98765432109876', 'cafe@xyz.com', '9988776655', '87654321', 'Avenida Secundária', 456, 'Cidade B', 'CD', '2025-06-30'),
  ('Pizzaria 123', 'pizza123', '56789012345678', 'contato@pizzaria123.com', '5544332211', '65432187', 'Rua da Pizza', 789, 'Cidade C', 'EF', '2024-10-15');

-- Inserts para a tabela de admin
INSERT INTO admin (name, cpf, email, telephone, birth_date, password, fk_organization_id)
VALUES 
  ('Admin ABC', '12345678901', 'admin@abc.com', '9988776655', '1990-01-01', 'senha123', (SELECT id FROM organization WHERE name = 'Restaurante ABC')),
  ('Admin XYZ', '98765432109', 'admin@xyz.com', '1122334455', '1985-05-10', 'xyz789', (SELECT id FROM organization WHERE name = 'Café XYZ')),
  ('Admin 123', '56789012345', 'admin@pizzaria123.com', '5544332211', '1988-11-20', 'pizza456', (SELECT id FROM organization WHERE name = 'Pizzaria 123'));

-- Inserts para a tabela de dispositivo (device)
INSERT INTO device (type, name, hashcode, fk_organization_id)
VALUES 
  ('mesa', 'Mesa 1', 'hash123456', (SELECT id FROM organization WHERE name = 'Restaurante ABC')),
  ('mesa', 'Mesa 2', 'hash234567', (SELECT id FROM organization WHERE name = 'Restaurante ABC')),
  ('mesa', 'Mesa 3', 'hash345678', (SELECT id FROM organization WHERE name = 'Restaurante ABC')),
  ('cozinha', 'Cozinha Principal', 'hash456789', (SELECT id FROM organization WHERE name = 'Restaurante ABC')),
  ('balcao', 'Atendimento', 'hash256789', (SELECT id FROM organization WHERE name = 'Restaurante ABC')),
  ('balcao', 'Balcão de Atendimento', 'hash789000', (SELECT id FROM organization WHERE name = 'Café XYZ'));

-- Inserts para a tabela de categoria
INSERT INTO category (name, description, fk_organization_id)
VALUES 
  ('Bebidas', 'Diversas opções de bebidas', (SELECT id FROM organization WHERE name = 'Restaurante ABC')),
  ('Sucos', 'Diversas opções de Sucos Naturais', (SELECT id FROM organization WHERE name = 'Restaurante ABC')),
  ('Cafés e outros', 'Opções de cafés, capuccinos e achocolatados', (SELECT id FROM organization WHERE name = 'Restaurante ABC')),
  ('Especial', 'Pratos especiais da casa', (SELECT id FROM organization WHERE name = 'Restaurante ABC')),
  ('Tradicional', 'Pratos tradicionais da casa', (SELECT id FROM organization WHERE name = 'Restaurante ABC')),
  ('Pasteis', 'Pasteis fritos na hora', (SELECT id FROM organization WHERE name = 'Restaurante ABC')),
  ('Cafe', 'Variedades de café', (SELECT id FROM organization WHERE name = 'Café XYZ')),
  ('Pizzas', 'Sabores variados de pizzas', (SELECT id FROM organization WHERE name = 'Pizzaria 123'));

-- Inserts para a tabela de produto
INSERT INTO product (name, price, description, image_name, fk_organization_id, fk_category_id)
VALUES 
  ('Refrigerante', 5.99, 'Refrigerante em lata sabor guaraná','118-536x354' , (SELECT id FROM organization WHERE name = 'Restaurante ABC'), (SELECT id FROM category WHERE name = 'Bebidas')),
  ('Café Expresso', 3.50, 'Café expresso tradicional', '149-536x354', (SELECT id FROM organization WHERE name = 'Restaurante ABC'), (SELECT id FROM category WHERE name = 'Cafés e outros')),
  ('Pastel de Calabresa', 25.00, 'Pastel com calabresa e queijo', '162-536x354', (SELECT id FROM organization WHERE name = 'Restaurante ABC'), (SELECT id FROM category WHERE name = 'Pasteis'));

-- Inserts para a tabela de pedido
-- INSERT INTO ordering (fk_device_id)
-- VALUES 
--   (SELECT id FROM device WHERE name = 'Mesa 1'),
--   (SELECT id FROM device WHERE name = 'Mesa 2'),
--   (SELECT id FROM device WHERE name = 'Mesa 3');
INSERT INTO ordering (fk_device_id)
SELECT id FROM device WHERE name IN ('Mesa 1', 'Mesa 2', 'Mesa 3');


-- Inserts para a tabela de produto do pedido
INSERT INTO ordering_product (status, fk_ordering_id, fk_product_id)
VALUES 
  ('Em Espera', (SELECT id FROM ordering WHERE fk_device_id = (SELECT id FROM device WHERE name = 'Mesa 1')), (SELECT id FROM product WHERE name = 'Refrigerante')),
  ('Em Espera', (SELECT id FROM ordering WHERE fk_device_id = (SELECT id FROM device WHERE name = 'Mesa 2')), (SELECT id FROM product WHERE name = 'Café Expresso')),
  ('Em Espera', (SELECT id FROM ordering WHERE fk_device_id = (SELECT id FROM device WHERE name = 'Mesa 3')), (SELECT id FROM product WHERE name = 'Pastel de Calabresa'));