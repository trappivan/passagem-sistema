CREATE TABLE IF NOT EXISTS passagem (
id SERIAL NOT null primary key ,
destino_id int NOT NULL,
passageiro_id int NOT NULL,
status_pagamento int NOT NULL,
constraint FK_DESTINO_ID foreign key (destino_id) references destino(id),
constraint FK_PASSAGEIRO_ID foreign key (passageiro_id) references passageiro(id)
)

CREATE TABLE pagamento_status (
codigo int primary key ,
status_nome varchar(20) not null
)

CREATE TABLE IF NOT EXISTS linha (
id		SERIAL NOT null primary key ,
companhia	varchar(50) NOT NULL,
horario		date NOT NULL,
embarque	varchar(50) NOT NULL,
desembarque	varchar(50) NOT NULL,
nome		varchar(50) NOT NULL,
distancia_km	float NOT null
)

CREATE TABLE IF NOT EXISTS onibus (
id	serial NOT null primary key ,
assentos_total	int NOT NULL,
leitos_qtd	int NOT NULL,
semi_leitos_qtd	int NOT null
)

create table if not exists destino (
id serial not null primary key,
linha_id int not null,
onibus_id  int not null,
valor_leitos float,
valor_semi_leitos float,
constraint FK_LINHA_ID foreign key (linha_id) references linha(id),
constraint FK_ONIBUS_ID foreign key (onibus_id) references onibus(id)
)

create table if not exists preco(
companhia	 varchar(50) primary key ,
coeficiente_gaso float,
leito_base 	 float,
semi_leito_base  float
)

CREATE TABLE IF NOT EXISTS passageiro(
id SERIAL PRIMARY KEY,
criado_em date,
nome_completo varchar(100),
cadastrado    boolean ,
cpf	      varchar(11) UNIQUE ,
data_nascimento date NOT NULL,
email	      varchar(50) UNIQUE ,
telefone      varchar(11) unique,
valor float ,
 CONSTRAINT email_unico UNIQUE (email),
CONSTRAINT telefone_unico UNIQUE (telefone),
CONSTRAINT cpf_unico UNIQUE (cpf)
)

insert into passageiro (criado_em, nome_completo, cadastrado, cpf, data_nascimento, email, telefone) values ('10/01/2004', 'Ivan Trapp', true, '06105245939', '10/01/2004', 'ivangabrieltrapp@gmail.com', '47997261113')

select * from passageiro p 