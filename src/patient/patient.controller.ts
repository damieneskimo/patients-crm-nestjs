import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto, UpdatePatientDto } from './dto/patient.dto';
import { PatientsRO } from './interfaces';
import { CreateNoteDto } from './dto/note.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Body('patient') createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  findAll(@Query() query): Promise<PatientsRO> {
    return this.patientService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('patient') updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(+id);
  }

  @Post(':patientId/notes')
  addNote(@Param('patientId') patientId: string, @Body('note') createNoteDto: CreateNoteDto) {
    return this.patientService.addNote(+patientId, createNoteDto);
  }

  @Delete(':patientId/notes/:noteId')
  removeNote(@Param() params) {
    const { patientId, noteId } = params;
    return this.patientService.removeNote(+patientId, +noteId);
  }
}
