import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Preco {
	@PrimaryColumn()
	companhia: string;

	@Column()
	coeficiente_gaso: number;

	@Column()
	coeficiente_pedagio: number;

	@Column()
	leito_base: number;

	@Column()
	semi_leito_base: number;

	@Column()
	poltrona_base: number;
}
