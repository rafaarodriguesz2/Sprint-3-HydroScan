create database hydroscan;
use hydroscan;

-- TABELA: Empresa
CREATE TABLE Empresa (
    CNPJ CHAR(14) PRIMARY KEY,
    Nome VARCHAR(100),
    Endereco VARCHAR(200),
    Telefone VARCHAR(20),
    Email VARCHAR(100)
);

INSERT INTO Empresa (CNPJ, Nome, Endereco, Telefone, Email) VALUES
('14349678000100', 'Itaipu Geração', 'Rua das Águas, 100 - Foz do Iguaçu', '11990933799', 'contato@itaipu.com.br'),
('45993432000188', 'EcoPower Soluções', 'Av. Sustentável, 500 - Belo Horizonte', '11922490747', 'suporte@ecopower.com');


-- TABELA: Usuario
CREATE TABLE Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    CPF CHAR(11),
    Nome VARCHAR(100),
    Email VARCHAR(100),
    Senha_hash VARCHAR(255),
    tipo_usuario VARCHAR(20),
    ativo TINYINT,
    Empresa_CNPJ CHAR(14),
    FOREIGN KEY (Empresa_CNPJ) REFERENCES Empresa(CNPJ)
);

INSERT INTO Usuario (CPF, Nome, Email, Senha_hash, tipo_usuario, ativo, Empresa_CNPJ) VALUES
('19945623881', 'João Silva', 'joao@itaipu.com.br', 'hashed_senha_joao', 'admin', 1, '14349678000100'),
('11967579030', 'Maria Souza', 'maria@ecopower.com', 'hashed_senha_maria', 'operador', 1, '45993432000188');


-- TABELA: Represa
CREATE TABLE Represa (
    idRepresa INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100),
    Localizacao VARCHAR(200),
    VolumeMaximo DECIMAL(10,2),
    VolumeMinimo DECIMAL(10,2),
    potencia_max_kw DECIMAL(10,2),
    FkEmpresa CHAR(14),
    data_cadastro DATETIME,
    FOREIGN KEY (FkEmpresa) REFERENCES Empresa(CNPJ)
);

INSERT INTO Represa (Nome, Localizacao, VolumeMaximo, VolumeMinimo, potencia_max_kw, FkEmpresa, data_cadastro) VALUES
('Represa Azul', 'Vale das Águas, SP', 1991340.00, 209200.00, 5000.00, '14349678000100', NOW()),
('Represa Verde', 'Montanhas Azuis, MG', 866730.00, 150700.00, 4000.00, '45993432000188', NOW());


-- TABELA: Sensor
CREATE TABLE Sensor (
    idSensor INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(45),
    status VARCHAR(20),
    local_instalacao VARCHAR(100),
    Represa_idRepresa INT,
    data_instalacao DATETIME,
    FOREIGN KEY (Represa_idRepresa) REFERENCES Represa(idRepresa)
);

INSERT INTO Sensor (modelo, status, local_instalacao, Represa_idRepresa, data_instalacao) VALUES
('HC-SR04', 'ativo', 'Entrada Norte', 1, NOW()),
('MB7360', 'ativo', 'Centro Hidráulico', 2, NOW());


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

SELECT * FROM Empresa;
SELECT * FROM Usuario;
SELECT * FROM Represa;
SELECT * FROM Sensor;
SELECT * FROM Leitura;
SELECT * FROM Api;
