import { Component, OnInit } from '@angular/core';
import { Adoption, AdoptionsService } from '../../services/adoptions.service';

@Component({
  selector: 'app-adoptions',
  standalone: false,
  templateUrl: './adoptions.component.html',
  styleUrl: './adoptions.component.css'
})
export class AdoptionsComponent implements OnInit {
  adoptions: Adoption[] = [];
  loading = false;
  errorMessage = '';
  adoption: Adoption = {
    petName: '',
    species: '',
    breed: '',
    age: 0,
    gender: '',
    adopterName: '',
    email: '',
    phone: '',
    address: '',
    adoptionDate: '',
    status: 'Pendiente',
    description: ''
  };
  editMode = false;

  constructor(private service: AdoptionsService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.errorMessage = '';
    this.service.getAll().subscribe((data) => {
      this.adoptions = data;
      this.loading = false;
    }, () => {
      this.errorMessage = 'No se pudo conectar con el servicio de adopciones. Verifica que el backend esté activo en http://localhost:8082.';
      this.loading = false;
    });
  }

  save(): void {
    this.errorMessage = '';

    if (this.editMode && this.adoption.id) {
      this.service.update(this.adoption.id, this.adoption).subscribe(() => {
        this.afterSave();
      }, () => {
        this.errorMessage = 'No se pudo actualizar la adopción. Inténtalo nuevamente.';
      });
      return;
    }

    this.service.create(this.adoption).subscribe(() => {
      this.afterSave();
    }, () => {
      this.errorMessage = 'No se pudo registrar la adopción. Inténtalo nuevamente.';
    });
  }

  edit(item: Adoption): void {
    this.adoption = { ...item };
    this.editMode = true;
  }

  remove(id?: number): void {
    if (!id) {
      return;
    }

    this.service.delete(id).subscribe(() => {
      this.load();
    }, () => {
      this.errorMessage = 'No se pudo eliminar el registro seleccionado.';
    });
  }

  get pendingCount(): number {
    return this.adoptions.filter((item) => item.status === 'Pendiente').length;
  }

  get approvedCount(): number {
    return this.adoptions.filter((item) => item.status === 'Aprobada').length;
  }

  get trackingCount(): number {
    return this.adoptions.filter((item) => item.status === 'En seguimiento').length;
  }

  private afterSave(): void {
    this.load();
    this.editMode = false;
    this.adoption = {
      petName: '',
      species: '',
      breed: '',
      age: 0,
      gender: '',
      adopterName: '',
      email: '',
      phone: '',
      address: '',
      adoptionDate: '',
      status: 'Pendiente',
      description: ''
    };
  }
}
