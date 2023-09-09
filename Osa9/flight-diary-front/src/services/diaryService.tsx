import axios from 'axios';
import { DiaryEntry, NewEntry } from "../types";

const baseUrl = 'http://localhost:3001/api/diaries'

export const getAllDiaries = () => {
  return axios
    .get<DiaryEntry[]>(baseUrl)
    .then(response => response.data)
}

// Trust that the typed backend returns correctly formatted data
export const createDiary = (object: NewEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then(response => response.data)
}