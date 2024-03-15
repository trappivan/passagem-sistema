import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	OneToOne,
	JoinColumn,
} from "typeorm";
import { Onibus } from "./Onibus";
import { Linha } from "./Linha";
import { Preco } from "./Preco";

@Entity()
export class Companhia {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("date", { nullable: true })
	criado_em?: Date;

	@Column("date", { nullable: true })
	atualizado_em?: Date;

	@Column("varchar", { length: 100, nullable: true })
	nome: string;

	@Column("varchar", { length: 14, nullable: true, unique: true, name: "cnpj" })
	cnpj: string;

	@Column("varchar", { length: 100, nullable: true })
	endereco: string;

	@Column("varchar", {
		length: 100,
		nullable: true,
		array: true,
		name: "regiao",
	})
	regiao: string[];

	@OneToMany(() => Onibus, (onibus) => onibus.companhia_id)
	onibus: Onibus[];

	@OneToMany(() => Linha, (linha) => linha.companhia_id)
	linhas: Linha[];

	@OneToOne(() => Preco, (preco: Preco) => preco.companhia_id)
	@JoinColumn()
	preco: Preco;
}
