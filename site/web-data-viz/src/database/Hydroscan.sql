-- criei o banco de dados da empresa
CREATE DATABASE HydroScan;
USE HydroScan;


-- TABELA: Empresa
-- removi o CHECK e ajustei para tipo CHAR(14) no CNPJ
-- Aumentei o tamanho dos campos.
CREATE TABLE Empresa (
    CNPJ CHAR(14) PRIMARY KEY,              -- CNPJ fixo com 14 caracteres numéricos
    Nome VARCHAR(100) NOT NULL,             -- Nome completo da empresa
    Endereco VARCHAR(200) NOT NULL,         -- Endereço detalhado da empresa
    Telefone VARCHAR(20),                   -- Telefone de contato (opcional)
    Email VARCHAR(100) NOT NULL,            -- Email institucional da empresa
    UNIQUE (Email)                          -- Garante que não haja dois emails iguais
);


-- TABELA: Usuario
-- CPF char(11) - quanitdade exata da numeração do documento 
-- senha era VARCHAR(20) e coloquei para varchar(100) para conseguir usar senhas mais seguras
-- AUTO_INCREMENT incluído no ID
CREATE TABLE Usuario (
    IdUsuario INT AUTO_INCREMENT PRIMARY KEY,  -- Identificador único do usuário
    CPF CHAR(11) NOT NULL UNIQUE,              -- CPF com 11 dígitos, exclusivo
    Nome VARCHAR(100) NOT NULL,                -- Nome completo do usuário
    Email VARCHAR(100) NOT NULL,               -- Email pessoal/corporativo do usuário
    Senha VARCHAR(100) NOT NULL,               -- Armazena senhas (criptografadas preferencialmente)
    FkEmpresa CHAR(14),                        -- CNPJ da empresa à qual o usuário pertence
    FOREIGN KEY (FkEmpresa) REFERENCES Empresa(CNPJ) -- Relacionamento com empresa
);


-- TABELA: Usina
-- tirei um campo fkMedicao que não era necessário.
-- agora é possivel colocar casas decimais no volume e potencia
CREATE TABLE Usina (
    IdUsina INT AUTO_INCREMENT PRIMARY KEY,    -- Identificador único da usina
    Nome VARCHAR(100) NOT NULL,                -- Nome da usina
    Localizacao VARCHAR(200) NOT NULL,         -- Endereço ou coordenadas da usina
    VolumeMaximo DECIMAL(10,2) NOT NULL,       -- Capacidade máxima do reservatório em m³
    PotenciaMaxima DECIMAL(10,2) NOT NULL,     -- Potência elétrica máxima gerada em MW
    FkEmpresa CHAR(14),                        -- Empresa proprietária da usina
    FOREIGN KEY (FkEmpresa) REFERENCES Empresa(CNPJ)
);


-- TABELA: AguaMedicao
-- criei a tabela medição para poder fazer diversas medições
CREATE TABLE AguaMedicao (
    IdMedicao INT AUTO_INCREMENT PRIMARY KEY,  -- Identificador único da medição
    IdUsina INT,                               -- Referência à usina medida
    NivelAguaAtual DECIMAL(8,2) NOT NULL,      -- Nível atual da água no momento da medição (em metros)
    DataMedicao DATETIME DEFAULT CURRENT_TIMESTAMP, -- Data e hora da medição
    FOREIGN KEY (IdUsina) REFERENCES Usina(IdUsina)
);


-- TABELA: VolumeReservatorio
-- criei essa tabela para guardar diferentes volumes
CREATE TABLE VolumeReservatorio (
    IdVolume INT AUTO_INCREMENT PRIMARY KEY,   -- Identificador único do registro de volume
    IdUsina INT,                               -- Usina associada
    VolumeUtil DECIMAL(10,2),                  -- Volume útil disponível para geração
    VolumeMorto DECIMAL(10,2),                 -- Volume morto (não aproveitável)
    VolumeEspera DECIMAL(10,2),                -- Volume em espera/reserva
    VolumeMaximorum DECIMAL(10,2),             -- Volume máximo suportado registrado
    DataRegistro DATETIME DEFAULT CURRENT_TIMESTAMP, -- Data e hora do registro
    FOREIGN KEY (IdUsina) REFERENCES Usina(IdUsina)
);


-- TABELA: ZonaMorta
-- criei essa tabela para demonstrar o tamanho das medidas da zona morta da represa
CREATE TABLE ZonaMorta (
    IdZona INT AUTO_INCREMENT PRIMARY KEY,     -- Identificador da zona morta
    IdUsina INT,                               -- Usina à qual a zona está associada
    Profundidade DECIMAL(6,2),                 -- Profundidade da zona morta (em metros)
    Comprimento DECIMAL(6,2),                  -- Comprimento da zona morta
    Largura DECIMAL(6,2),                      -- Largura da zona morta
    Observacao TEXT,                           -- Observações complementares (ex: condições específicas)
    FOREIGN KEY (IdUsina) REFERENCES Usina(IdUsina)
);

INSERT INTO Empresa (CNPJ, Nome, Endereco, Telefone, Email) 
VALUES 
('12345678000195', 'HydroScan Energia Ltda', 'Rua das Águas, 123, Bairro Hidro, Cidade Energia', '(11) 1234-5678', 'contato@hydroscan.com.br'),
('98765432000123', 'Itaipu Binacional', 'Avenida Parati, 1000, Foz do Iguaçu, PR', '(45) 3520-8500', 'itaipu@itaipu.gov.br');

INSERT INTO Usuario (CPF, Nome, Email, Senha, FkEmpresa) 
VALUES 
('28349788052', 'João Silva', 'joao.silva@hydroscan.com.br', 'senha_segura_123', '12345678000195'),
('18433498991', 'Maria Souza', 'maria.souza@itaipu.gov.br', 'senha_super_secreta', '98765432000123');

INSERT INTO Usina (Nome, Localizacao, VolumeMaximo, PotenciaMaxima, FkEmpresa)
VALUES 
('Usina Belo Monte', 'Altamira, Pará', 22400000000.00, 11323.00, '12345678000195'),
('Usina Itaipu', 'Foz do Iguaçu, Paraná', 29000000000.00, 14000.00, '98765432000123'),
('Usina Tucuruí', 'Tucuruí, Pará', 45000000000.00, 8370.00, '98765432000123');

INSERT INTO AguaMedicao (IdUsina, NivelAguaAtual, DataMedicao) 
VALUES 
(1, 98.50, '2025-04-07 08:30:00'),  -- Belo Monte
(2, 200.00, '2025-04-07 12:45:00'),  -- Itaipu
(3, 93.00, '2025-04-07 09:00:00');   -- Tucuruí

INSERT INTO VolumeReservatorio (IdUsina, VolumeUtil, VolumeMorto, VolumeEspera, VolumeMaximorum, DataRegistro) 
VALUES 
(1, 18000000000.00, 500000000.00, 2000000000.00, 22400000000.00, '2025-04-07 08:30:00'),
(2, 22000000000.00, 800000000.00, 3000000000.00, 29000000000.00, '2025-04-07 12:45:00'),
(3, 40000000000.00, 1000000000.00, 5000000000.00, 45000000000.00, '2025-04-07 09:00:00');

INSERT INTO ZonaMorta (IdUsina, Profundidade, Comprimento, Largura, Observacao) 
VALUES 
(1, 4.50, 2000.00, 1000.00, 'Zona morta localizada na extremidade do reservatório, não aproveitável para geração de energia.'),
(2, 6.00, 2500.00, 1500.00, 'Zona morta representando a área submersa onde a geração de energia não é possível.'),
(3, 5.00, 2500.00, 1000.00, 'Zona morta no fundo do reservatório, influenciada por variações sazonais.');

-- 1. Selecionar todas as empresas cadastradas
-- Essa consulta retorna todos os registros da tabela Empresa.
SELECT * FROM Empresa;

-- 2. Selecionar todos os usuários cadastrados com o nome da empresa a qual pertencem
-- Essa consulta retorna os usuários junto com o nome da empresa associada a cada um.
SELECT u.Nome AS NomeUsuario, u.Email, e.Nome AS NomeEmpresa
FROM Usuario u
JOIN Empresa e ON u.FkEmpresa = e.CNPJ;

-- 3. Selecionar as usinas com seus respectivos volumes máximos e potências
-- Essa consulta retorna o nome, volume máximo e potência máxima de todas as usinas cadastradas.
SELECT Nome, VolumeMaximo, PotenciaMaxima
FROM Usina;

-- 4. Selecionar as medições de nível de água realizadas nas usinas
-- Essa consulta retorna o nível de água atual e a data da medição de cada usina.
SELECT um.IdUsina, u.Nome AS NomeUsina, um.NivelAguaAtual, um.DataMedicao
FROM AguaMedicao um
JOIN Usina u ON um.IdUsina = u.IdUsina;

-- 5. Selecionar os volumes registrados dos reservatórios das usinas
-- Essa consulta retorna o volume útil, volume morto, volume de espera e volume máximo de cada usina.
SELECT vr.IdUsina, u.Nome AS NomeUsina, vr.VolumeUtil, vr.VolumeMorto, vr.VolumeEspera, vr.VolumeMaximorum, vr.DataRegistro
FROM VolumeReservatorio vr
JOIN Usina u ON vr.IdUsina = u.IdUsina;

-- 6. Selecionar as zonas mortas associadas às usinas, com informações sobre profundidade, comprimento e largura
-- Essa consulta retorna as informações das zonas mortas associadas a cada usina.
SELECT zm.IdUsina, u.Nome AS NomeUsina, zm.Profundidade, zm.Comprimento, zm.Largura, zm.Observacao
FROM ZonaMorta zm
JOIN Usina u ON zm.IdUsina = u.IdUsina;

-- 8. Selecionar o nível de água mais recente de cada usina
-- Essa consulta retorna o nível de água mais recente de cada usina, baseado na data da medição.
SELECT um.IdUsina, u.Nome AS NomeUsina, um.NivelAguaAtual, um.DataMedicao
FROM AguaMedicao um
JOIN Usina u ON um.IdUsina = u.IdUsina
WHERE um.DataMedicao = (SELECT MAX(DataMedicao) FROM AguaMedicao WHERE IdUsina = um.IdUsina);

