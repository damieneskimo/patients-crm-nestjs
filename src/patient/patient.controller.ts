import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto, UpdatePatientDto } from './dto/patient.dto';
import { PatientsRO } from './interfaces';
import { CreateNoteDto } from './dto/note.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.patientService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body('patient') updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.patientService.remove(id);
  }

  @Post(':patientId/notes')
  addNote(@Param('patientId', ParseIntPipe) patientId: number, @Body('note') createNoteDto: CreateNoteDto) {
    return this.patientService.addNote(+patientId, createNoteDto);
  }

  @Delete(':patientId/notes/:noteId')
  removeNote(
    @Param('patientId', ParseIntPipe) patientId: number, 
    @Param('noteId', ParseIntPipe) noteId: number
  ) {
    return this.patientService.removeNote(patientId, noteId);
  }
}
