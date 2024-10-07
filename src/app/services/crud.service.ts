import { Injectable } from '@angular/core';
import { users } from 'src/users';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private users: any[] = users;

  constructor() { }


  // Obtener todos los elementos
  getItems() {
    return this.users;
  }

  // Crear un nuevo elemento
  createItem(item: any) {
    this.users.push(item);
  }

  // Actualizar un elemento
  updateItem(index: number, updatedItem: any) {
    this.users[index] = updatedItem;
  }

  // Eliminar un elemento
  deleteItem(index: number) {
    this.users.splice(index, 1);
  }

  // Buscar elementos basados en el término de búsqueda
  search(term: string) {
    if (!term.trim()) {
      return this.users;
    }

    return this.users.filter(users =>
      users.nombre.toLowerCase().includes(term.toLowerCase()) ||
      users.entidad.toLowerCase().includes(term.toLowerCase()) ||
      users.email.toLowerCase().includes(term.toLowerCase())
    );
  }

}
