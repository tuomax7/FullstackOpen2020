import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../toNewPatient';
import toNewEntry from '../toNewEntry';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (_req, res) => {
  res.send(patientService.getPatientById(_req.params.id));
});

router.post('/', (req, res) => {
	try {
		const newPatient = toNewPatient(req.body);
		const addedPatient = patientService.addPatient(newPatient);
		res.json(addedPatient);

	} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
	try {
		const id = req.params.id;
		const patient = patientService.getPatientById(id);
    
		if( patient === undefined ){
      res.status(404).send("patient not found by id");
      return;
    }
		const newEntry = toNewEntry(req.body);
		const addedEntry = patientService.addEntry(newEntry, patient);
		res.json(addedEntry);

	} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;