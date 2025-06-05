drop database hydroscan;

create database hydroscan;

use hydroscan;

-- TABELA: Empresa
CREATE TABLE Empresa (
    CNPJ CHAR(14) PRIMARY KEY,
    Nome VARCHAR(100),
    Endereco VARCHAR(200),
    Telefone VARCHAR(20),
    Email VARCHAR(100),
    Codigo_empresa VARCHAR(20),
    senha varchar(50),
    key (Codigo_empresa)
);



INSERT INTO Empresa (CNPJ, Nome, Endereco, Telefone, Email, Codigo_empresa, senha) VALUES
('14349678000100', 'Itaipu Geração', 'Rua das Águas, 100 - Foz do Iguaçu', '11990933799', 'contato@itaipu.com.br', 'EBC4K-2F', 'Itaipu'),
('45993432000188', 'EcoPower Soluções', 'Av. Sustentável, 500 - Belo Horizonte', '11922490747', 'suporte@ecopower.com', 'AB92KL-9J', 'EcoPower');


-- TABELA: Usuario
CREATE TABLE Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY AUTO_INCREMENT,
    CPF CHAR(11),
    Nome VARCHAR(100),
    Email VARCHAR(100),
    Senha_hash VARCHAR(255),
    nivel_acesso VARCHAR(20),
    ativo TINYINT,
    fkCodigo_empresa VARCHAR(20),
    precisa_alterar_senha boolean default true,
    constraint fk_usuario_codigoEmpresa foreign key (fkCodigo_empresa) references Empresa(Codigo_empresa)
);


INSERT INTO Usuario (CPF, Nome, Email, Senha_hash, nivel_acesso, ativo, fkCodigo_empresa) VALUES
('19945623881', 'João Silva', 'joao@itaipu.com.br', '123', '3', 1, 'EBC4K-2F'),
('11967579030', 'Maria Souza', 'maria@ecopower.com', '123', '1', 1, 'AB92KL-9J'),
('12345678911', 'Gabriel Furtado', 'Gabriel@cosan.com', '123', '2', 1, 'AB92KL-9J');


-- TABELA: Represa
CREATE TABLE Represa (
    idRepresa INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) unique key,
    Localizacao VARCHAR(200),
    VolumeMaximo DECIMAL(10,2),
    VolumeMinimo DECIMAL(10,2),
    potencia_max_kw DECIMAL(10,2),
    fkCodigo_empresa VARCHAR(14),
    data_cadastro DATETIME,
    CONSTRAINT fk_represa_codigoEmpresa FOREIGN KEY (fkCodigo_empresa) REFERENCES Empresa(Codigo_empresa)
);

INSERT INTO Represa (Nome, Localizacao, VolumeMaximo, VolumeMinimo, potencia_max_kw, fkCodigo_empresa, data_cadastro) VALUES
('Represa Azul', 'Vale das Águas, SP', 1991340.00, 209200.00, 5000.00, 'EBC4K-2F', NOW()),
('Represa Verde', 'Montanhas Azuis, MG', 866730.00, 150700.00, 4000.00, 'AB92KL-9J', NOW());


-- TABELA: Sensor
CREATE TABLE if not exists Sensor (
    idSensor INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(45),
    status VARCHAR(20) default 'ativo',
    local_instalacao VARCHAR(100),
    nome_represa varchar(100),
    data_instalacao date,
    FOREIGN KEY (nome_represa) REFERENCES Represa(nome)
);

INSERT INTO Sensor (modelo, status, local_instalacao, nome_represa, data_instalacao) VALUES
('HC-SR04', 'ativo', 'Entrada Norte', 'Represa Azul', NOW()),
('MB7360', 'ativo', 'Centro Hidráulico', 'Represa Verde', NOW());


-- TABELA: Leitura
CREATE TABLE Leitura (
    idLeitura INT AUTO_INCREMENT PRIMARY KEY,
    idSensor INT,
    data_hora DATETIME,
    nivel_agua_m DECIMAL(6,2),
    status_geracao VARCHAR(20),
    FOREIGN KEY (idSensor) REFERENCES Sensor(idSensor)
);

INSERT INTO Leitura (idSensor, data_hora, nivel_agua_m, status_geracao) VALUES
(1, NOW(), 42.50, 'gerando'),
(1, NOW() - INTERVAL 1 DAY, 41.80, 'gerando'),
(2, NOW(), 35.20, 'parada');

create table Api (
idApi int primary key auto_increment,
nivel_da_agua int
);


CREATE TABLE Suporte(
    id int auto_increment,
    apiKey varchar(100),
    tokensUtilizados bigint,
    pergunta varchar(1000),
    resposta varchar(3000),
    dataHora datetime default now(),
    primary key(id, apiKey)
);

select * from suporte;

SELECT * FROM Empresa;
SELECT * FROM Usuario;
SELECT * FROM Represa;
SELECT * FROM Leitura;
SELECT * FROM Sensor;
SELECT * FROM Api;

INSERT INTO Represa (Nome, Localizacao, VolumeMaximo, VolumeMinimo, potencia_max_kw, fkCodigo_empresa, data_cadastro) VALUES
('Represa ROXA', 'Vale das Águas, SP', 1991340.00, 209200.00, 5000.00, 'EBC4K-2F', NOW()),
('Represa MARROM', 'Montanhas Azuis, MG', 866730.00, 150700.00, 4000.00, 'AB92KL-9J', NOW());

create table perguntas_frequentes (
  id int auto_increment primary key,
  pergunta text not null,
  horario datetime default current_timestamp
);