import { PrimaryGeneratedColumn, Entity, Column, OneToMany, ManyToMany } from "typeorm";
import { CasinoEntity } from "./casino.entity";
import { SlotEntity } from "./slot.entity";

@Entity()
export class ProviderEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany('CasinoEntity', 'providers')
  casinos: CasinoEntity[];

  @OneToMany('SlotEntity', 'provider')
  slots: SlotEntity[];

}
