import data from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, PublicPatient, NewPatient, EntryWithoutId, Entry } from '../types';

const patients: Patient[] = data;

const getPatients = (): PublicPatient[] => {
	return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => 
	({id, name, dateOfBirth, gender, occupation, entries}));
};


const getPatientById = (id: string): Patient | undefined => patients.find(patient => patient.id === id);


const addPatient = (entry: NewPatient): Patient => {

	const newPatientEntry = {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		id: uuid(),
		...entry
	};

	patients.push(newPatientEntry);
	return newPatientEntry;
};


const addEntry = (entry: EntryWithoutId, patient: Patient): Entry => {

	const newEntry = {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		id: uuid(),
		...entry
	};

	patient.entries.push(newEntry);

	return newEntry;
};


export default { getPatients, addPatient, getPatientById, addEntry };