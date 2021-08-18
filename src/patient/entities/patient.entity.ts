import { IsEmail, IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Note } from "./note.entity";

@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column() @IsNotEmpty()
    name: string;

    @IsEmail() @IsNotEmpty()
    @Column({unique: true})
    email: string;

    @Column({default: 'male'})
    gender: string;

    @Column()
    phone: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @OneToMany(type => Note, note => note.patient, {eager: true})
    @JoinColumn()
    notes: Note[]
}
