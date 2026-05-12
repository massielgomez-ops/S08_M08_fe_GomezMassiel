import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Adoption {
  id?: number;
  petName: string;
  species: string;
  breed: string;
  age: number;
  gender: string;
  adopterName: string;
  email: string;
  phone: string;
  address: string;
  adoptionDate: string;
  status: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdoptionsService {
  private apiUrl = 'http://localhost:8082/adoptions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Adoption[]> {
    return this.http.get<Adoption[]>(this.apiUrl);
  }

  create(adoption: Adoption): Observable<Adoption> {
    return this.http.post<Adoption>(this.apiUrl, adoption);
  }

  update(id: number, adoption: Adoption): Observable<Adoption> {
    return this.http.put<Adoption>(`${this.apiUrl}/${id}`, adoption);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}