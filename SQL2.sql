select *
from tb_cliente
DROP TABLE TB_CLIENTE
CREATE TABLE tb_cliente(
nome		VARCHAR(55),
cpf		INTEGER,
endereco	VARCHAR(60),
numero		INTEGER,
bairro		VARCHAR(40),
cidade		VARCHAR(40),
estado		VARCHAR(3),
telefone	INTEGER,
email		VARCHAR(50)		
);

INSERT INTO tb_cliente
VALUES
('Lucas Castro',42961492882,'rua Fabio Lourenço',1521,'Jardim Do Éden','Franca','SP',991349872,'lucasgrrock@gmail.com');