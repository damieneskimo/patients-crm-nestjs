import { IsEmail } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('patients')
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    @IsEmail()
    email: string;

    @Column({default: 'male'})
    gender: string;

    @Column()
    phone: string;
}
