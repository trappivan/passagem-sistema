import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from "typeorm";

@Entity()
export class Passageiro {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("date")
	criado_em: Date;

	@Column("date")
	atualizado_em: Date;

	@Column("varchar", { length: 100, nullable: false })
	nome: string;

	@Column()
	cadastrado: boolean;

	@Column("varchar", { length: 11, nullable: false, unique: true, name: "cpf" })
	cpf: string;

	@Column("date", { name: "data_nascimento", nullable: false })
	data_nascimento: Date;

	@Column("varchar", { length: 100, nullable: false, name: "email" })
	email: string;

	@Column("varchar", {
		length: 11,
		nullable: false,
		name: "telefone",
		unique: true,
	})
	telefone: string;
}
