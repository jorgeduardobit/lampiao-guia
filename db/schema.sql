CREATE DATABASE IF NOT EXISTS lampiao_guia
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE lampiao_guia;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  perfil ENUM('comum', 'admin') NOT NULL DEFAULT 'comum',
  data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE servicos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  cidade VARCHAR(80) NOT NULL,
  estado CHAR(2) NOT NULL,
  endereco VARCHAR(200),
  descricao TEXT,
  status ENUM('pendente', 'aprovado', 'rejeitado', 'arquivado') NOT NULL DEFAULT 'pendente',
  criado_por INT,
  revisado_por INT,
  data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (criado_por) REFERENCES usuarios(id) ON DELETE SET NULL,
  FOREIGN KEY (revisado_por) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE TABLE avaliacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  servico_id INT NOT NULL,
  comentario TEXT,
  nota_identidade_genero TINYINT NOT NULL CHECK (nota_identidade_genero BETWEEN 1 AND 5),
  nota_nao_discriminacao TINYINT NOT NULL CHECK (nota_nao_discriminacao BETWEEN 1 AND 5),
  nota_inclusao TINYINT NOT NULL CHECK (nota_inclusao BETWEEN 1 AND 5),
  nota_acolhimento TINYINT NOT NULL CHECK (nota_acolhimento BETWEEN 1 AND 5),
  nota_atencao_resolucao TINYINT NOT NULL CHECK (nota_atencao_resolucao BETWEEN 1 AND 5),
  data_avaliacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
  FOREIGN KEY (servico_id) REFERENCES servicos(id),
  CONSTRAINT uq_usuario_servico UNIQUE (usuario_id, servico_id)
);
