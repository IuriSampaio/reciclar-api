import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

abstract class _BaseModel {

  @PrimaryGeneratedColumn('uuid')
  sys_id: string;

  @CreateDateColumn()
  sys_crated_on: string;

  @UpdateDateColumn()
  sys_updated_on: string;

  @VersionColumn()
  sys_mod_count: number;

}

export default _BaseModel;