import { Component } from '@angular/core';
import { CrudService } from './services/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: any[] = [];
  newItem: any = { nombre: '', entidad: '',email:'' };
  editIndex: number | null = null;

  filteredItems: any[] = [];
  searchTerm: string = '';

  constructor(private crudService: CrudService) {}

  onSearch() {
    this.filteredItems = this.crudService.search(this.searchTerm);
  }

  // Función para subrayar el término de búsqueda en los resultados
  highlight(text: string, searchTerm: string) {
    if (!searchTerm.trim()) {
      return text;
    }
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  // Cargar los elementos al iniciar el componente
  ngOnInit() {
    this.users = this.crudService.getItems();
  }

  // Agregar o actualizar un elemento
  saveItem() {
    if (this.editIndex === null) {
      // Crear un nuevo elemento
      this.crudService.createItem(this.newItem);
    } else {
      // Actualizar un elemento existente
      this.crudService.updateItem(this.editIndex, this.newItem);
      this.editIndex = null;
    }
    this.newItem = { nombre: '', entidad: '', email:'' }; 
  }

  // Editar un elemento
  editUser(index: number) {
    this.newItem = { ...this.users[index] }; // Cargar el item en el formulario
    this.editIndex = index;
  }

  // Eliminar un elemento
  deleteUser(index: number) {
    this.crudService.deleteItem(index);
  }
}
