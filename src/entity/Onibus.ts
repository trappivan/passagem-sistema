import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

	@Column("simple-array")
	poltronas_total: number;

	@Column("simple-array")
	poltronas_disponiveis: number;

	@Column()
	poltronas_valor: number;

	@Column("simple-array")
	leitos_total: number;

	@Column("simple-array")
	leitos_disponiveis: number;

	@Column()
	leitos_valor: number;

	@Column("simple-array")
	semi_leitos_total: number;

	@Column("simple-array")
	semi_leitos_disponiveis: number;

	@Column()
	semi_leitos_valor: number;

	@ManyToOne(() => Linha, (linha: Linha) => linha.onibus_id)
	linha_id: Linha;
}
