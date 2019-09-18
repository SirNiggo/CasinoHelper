import { ProviderEntity } from "./provider.entity";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class SlotEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne('ProviderEntity', 'slots')
  provider: ProviderEntity;

}
