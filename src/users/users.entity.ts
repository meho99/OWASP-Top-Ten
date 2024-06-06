import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ default: '' })
  password: string;

  @Column({ default: 0 })
  votes: number;

  @Column({ default: false })
  hasVoted: boolean;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;
}
