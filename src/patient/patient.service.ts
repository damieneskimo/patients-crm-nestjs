import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate, ValidationError } from 'class-validator';
import { DeleteResult, Repository } from 'typeorm';
import { CreateNoteDto } from './dto/note.dto';
import { CreatePatientDto, UpdatePatientDto } from './dto/patient.dto';
import { Note } from './entities/note.entity';
import { Patient } from './entities/patient.entity';
import { PatientRO, PatientsRO } from './interfaces';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = new Patient();
    patient.name = createPatientDto.name;
    patient.email = createPatientDto.email;
    patient.gender = createPatientDto.gender;
    patient.phone = createPatientDto.phone;

    const newPatient = await this.patientRepository.save(patient);
    return newPatient;
  }

  async findAll(query): Promise<PatientsRO> {
    const qb = await this.patientRepository.createQueryBuilder('patient');

    qb.where("1 = 1");

    if ('keywords' in query) {
      qb.andWhere("patient.name LIKE :keywords", {keywords: `%${query.keywords}%`})
        .orWhere("patient.email LIKE :keywords", {keywords: `%${query.keywords}%`});
    }
    if ('gender' in query) {
      qb.andWhere("patient.gender = :gender", {gender: query.gender})
    }

    qb.orderBy("patient.name");

    const patientsCount = await qb.getCount();

    if ('limit' in query) {
      qb.limit(query.limit);
    }
    if ('offset' in query) {
      qb.offset(query.offset);
    }

    const patients = await qb.getMany();

    return {patients, patientsCount}
  }

  async findOne(id: number): Promise<PatientRO> {
    const patient = await this.patientRepository.findOne(id);
    return {patient};
  }

  async update(id: number, updatePatientDto: UpdatePatientDto): Promise<PatientRO> {
    const toUpdate = await this.patientRepository.findOne(id);
    const updated = Object.assign(toUpdate, updatePatientDto);
    const patient = await this.patientRepository.save(updated);

    return {patient};
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.patientRepository.delete(id);
  }

  async addNote(patientId: number, createNoteDto: CreateNoteDto): Promise<PatientRO> {
    let patient = await this.patientRepository.findOne(patientId);
    const note = new Note();
    note.content = createNoteDto.content;

    patient.notes.push(note);

    await this.noteRepository.save(note);
    patient = await this.patientRepository.save(patient);

    return {patient};
  }

  async removeNote(patientId: number, noteId: number): Promise<PatientRO> {
    let patient = await this.patientRepository.findOne(patientId);
    const note = await this.noteRepository.findOne(noteId);
    const noteIndex = patient.notes.findIndex(_note => _note.id === note.id);

    if (noteIndex >= 0) {
      patient.notes.splice(noteIndex, 1);
      await this.noteRepository.delete(noteId);
      patient = await this.patientRepository.save(patient);
    }

    return {patient};
  }
}
