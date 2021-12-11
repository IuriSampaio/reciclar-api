import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { hashSync } from "bcrypt";
import _BaseModel from "./_BaseModel";

@Entity("users")
class User extends _BaseModel {

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  is_point_of_collect: boolean = false;

  @Column()
  is_recicler: boolean = false;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() { this.password = hashSync(this.password, 8) };
}

export default User;