import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreatePatientDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly gender: string;

    @IsNotEmpty()
    readonly phone: string;
}

export class UpdatePatientDto extends PartialType(CreatePatientDto) {}
