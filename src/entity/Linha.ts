import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	OneToOne,
	JoinColumn,
	ManyToOne,
} from "typeorm";
import { Passagem } from "./Passagem";
import { Onibus } from "./Onibus";
import { Companhia } from "./Companhia";

@Entity()
export class Linha {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("varchar", { length: 13, nullable: true })
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

	@OneToOne(() => Onibus, (onibus: Onibus) => onibus.linha_id)
	@JoinColumn()
	onibus_id: Onibus;

	@ManyToOne(() => Companhia, (companhia: Companhia) => companhia.linhas)
	companhia_id: Companhia;
}
