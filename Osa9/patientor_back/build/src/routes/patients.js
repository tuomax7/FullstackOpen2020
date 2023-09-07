"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getPatients());
});
router.post('/', (req, res) => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const addedPatient = patientService_1.default.addPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    });
    res.json(addedPatient);
});
exports.default = router;
