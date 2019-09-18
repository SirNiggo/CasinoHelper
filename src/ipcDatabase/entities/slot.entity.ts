import { ProviderEntity } from "./provider.entity";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class SlotEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  titleNoSpace: string;

  @Column()
  image: string;

  @ManyToOne('ProviderEntity', 'slots')
  provider: ProviderEntity;

}
