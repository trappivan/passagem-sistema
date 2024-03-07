import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Preco {
	@PrimaryColumn("varchar", { nullable: false, length: 100, unique: true })
	companhia: string;

	@Column({ nullable: false })
	coeficiente_gaso: number;

	@Column({ nullable: false })
	coeficiente_pedagio: number;

	@Column({ nullable: false })
	leito_base: number;

	@Column({ nullable: false })
	semi_leito_base: number;

	@Column({ nullable: false })
	poltrona_base: number;
}
