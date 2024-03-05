import {
	Column,
	Entity,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Linha } from "./Linha";

@Entity()
export class Onibus {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	placa: string;

	@Column()
	companhia: string;

	@Column()
	assentos_total: number;

	@Column("int", {
		array: true,
		default: [],
		nullable: true,
	})
	poltronas_total: number[];

	@Column("int", {
		array: true,
		default: [],
		nullable: true,
	})
	poltronas_disponiveis: number[];

	@Column()
	poltronas_valor: number;

	@Column("int", {
		array: true,
		default: [],
		nullable: true,
	})
	leitos_total: number[];

	@Column("int", {
		array: true,
		default: [],
		nullable: true,
	})
	leitos_disponiveis: number[];

	@Column()
	leitos_valor: number;

	@Column("int", {
		array: true,
		default: [],
		nullable: true,
	})
	semi_leitos_total: number[];

	@Column("int", {
		array: true,
		default: [],
		nullable: true,
	})
	semi_leitos_disponiveis: number[];

	@Column()
	semi_leitos_valor: number;

	@OneToOne(() => Linha, (linha: Linha) => linha.onibus_id)
	linha_id: Linha;
}
