import data from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, PublicPatient, NewPatient } from '../types';

const patients: Patient[] = data;

const getPatients = (): PublicPatient[] => {
	return patients.map(({id, name, dateOfBirth, gender, occupation}) => 
	({id, name, dateOfBirth, gender, occupation}));
};


const addPatient = (entry: NewPatient): Patient => {

	const newPatientEntry = {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		id: uuid(),
		...entry
	};

	patients.push(newPatientEntry);
	return newPatientEntry;
};


export default { getPatients, addPatient };