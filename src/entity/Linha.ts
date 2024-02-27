import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Passagem } from "./Passagem";
import { Onibus } from "./Onibus";

@Entity()
export class Linha {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("varchar", { length: 100, nullable: false })
	companhia: string;

	@Column("varchar", { length: 5, nullable: false })
	horario: string;

	@Column("varchar", { length: 100, nullable: false })
	embarque: string;

	@Column("varchar", { length: 100, nullable: false })
	desembarque: string;

	@Column("varchar", { length: 100, nullable: false })
	nome: string;

	@Column("float", { nullable: false })
	distancia_km: number;

	@OneToMany(() => Passagem, (passagem: Passagem) => passagem.linha_id)
	passagem: Passagem[];

	@OneToMany(() => Onibus, (onibus: Onibus) => onibus.linha_id)
	onibus_id: Onibus[];
}
