import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Note } from './entities/note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, Note])],
  controllers: [PatientController],
  providers: [PatientService]
})
export class PatientModule {}
