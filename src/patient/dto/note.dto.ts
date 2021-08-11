import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";

export class CreateNoteDto {
  @IsNotEmpty()
  content: string
}

export class UpdateNoteDto extends PartialType(CreateNoteDto) {}
