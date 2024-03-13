import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Timestamp,
	OneToMany,
} from "typeorm";
import { Passagem } from "./Passagem";

@Entity()
export class Passageiro {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("date", { nullable: true })
	criado_em: Date;

	@Column("date", { nullable: true })
	atualizado_em: Date;

	@Column("varchar", { length: 100, nullable: true })
	nome: string;

	@Column()
	cadastrado: boolean;

	@Column("varchar", { length: 14, nullable: true, unique: true, name: "cpf" })
	cpf: string;

	@Column("date", { name: "data_nascimento", nullable: true })
	data_nascimento: Date;

	@Column("varchar", { length: 100, nullable: true, name: "email" })
	email: string;

	@Column("varchar", {
		length: 11,
		nullable: true,
		name: "telefone",
		unique: true,
	})
	telefone: string;

	@OneToMany(() => Passagem, (passagem) => passagem.passageiro)
	passagens: Passagem[];
}
