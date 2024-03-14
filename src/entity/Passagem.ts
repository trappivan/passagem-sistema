import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Linha } from "./Linha";
import { Passageiro } from "./Passageiro";
import { Usuario } from "./Usuario";
import { PassageiroDTO } from "../dto/passageiro-request";

@Entity()
export class Passagem {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Linha, (linha) => linha.passagem)
	linha_id: Linha;

	@ManyToOne(() => Passageiro, (passageiro) => passageiro.passagens)
	passageiro: Passageiro;

	@Column({ nullable: true })
	valor_passagem: number;

	@Column({ nullable: true })
	numero_assento: number;

	@Column({ nullable: true })
	tipo_assento: string;

	@Column({ default: 0 })
	pagamento_status: number;

	@Column("varchar", { length: 100, nullable: true })
	tokenSession: string;
}
