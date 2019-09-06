import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { ProviderEntity } from "./provider.entity";

@Entity()
export class CasinoEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany('ProviderEntity', 'casinos')
  providers: ProviderEntity[];

}
