import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Preco {
	@PrimaryColumn("varchar", { nullable: false, length: 100, unique: true })
	companhia: string;

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
