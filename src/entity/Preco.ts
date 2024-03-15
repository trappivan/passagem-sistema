import {
	Column,
	Entity,
	OneToMany,
	OneToOne,
	PrimaryColumn,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Companhia } from "./Companhia";

@Entity()
export class Preco {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => Companhia, (companhia: Companhia) => companhia.preco)
	companhia_id: Companhia;

	@Column("float", { nullable: false })
	coeficiente_gaso: number;

	@Column("float", { nullable: false })
	coeficiente_pedagio: number;

	@Column("float", { nullable: false })
	leito_base: number;

	@Column("float", { nullable: false })
	semi_leito_base: number;

	@Column("float", { nullable: false })
	poltrona_base: number;
}
