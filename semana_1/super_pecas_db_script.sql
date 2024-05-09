CREATE DATABASE IF NOT EXISTS super_pecas;
USE super_pecas;

CREATE TABLE IF NOT EXISTS carros (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	modelo VARCHAR(255) UNIQUE NOT NULL,
	codigo VARCHAR(255) UNIQUE NOT NULL,
	fabricante VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS pecas (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(255) UNIQUE NOT NULL,
	numero_serie VARCHAR(255) UNIQUE NOT NULL,
	descricao TEXT NOT NULL,
	fabricante VARCHAR(255) NOT NULL,
	modelo_carro VARCHAR(255) NOT NULL,
	carro_id INT NOT NULL,
	FOREIGN KEY (carro_id) REFERENCES carros(id)
);


INSERT INTO carros (modelo, codigo, fabricante) VALUES ('KA', 'CODKA001', 'Ford');

INSERT INTO pecas (nome, numero_serie, descricao, fabricante, modelo_carro, carro_id)
VALUES ('Farol dianteiro direito', 'FASER001', 'Farol dianteiro', 'Ford', 'Ford KA SE 1.0 2015', 1);

SELECT 
p.id as peca_id,
p.nome as peca_nome,
c.modelo as modelo_carro,
c.fabricante as fabricante_carro
FROM pecas as p 
INNER JOIN carros as c
WHERE p.carro_id = c.id;
