import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Passageiro } from "./Passageiro";
import { Linha } from "./Linha";

@Entity()
export class Passagem {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Linha, (linha: Linha) => linha.passagem)
	linha_id: Linha;

	@ManyToOne(() => Passageiro, (passageiro) => passageiro.passagens)
	passageiro: Passageiro;

	@Column()
	valor_passagem: number;

	@Column()
	numero_assento: number;
}
