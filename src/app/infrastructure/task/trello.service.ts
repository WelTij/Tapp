import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { taskRepository } from 'src/app/core/tasks/interfaces/task.repository';
import { Task } from 'src/app/core/tasks/entities/task';


/*const API_URL = 'https://api.trello.com/1/';
const ID_LIST = '653805509f1cce28101bca16';
const API_KEY = 'b019a05d117db6aee5e5a627439f701e';
const API_TOKEN = 'ATTA7ae4e8abb166f0698ddc19146e486eb7a3722997853ab4d245972ff8b0003b2c356006E0';*/
//por si las borro aqui estan las referencias

const API_URL = 'https://api.trello.com/1/';
const API_KEY = 'b019a05d117db6aee5e5a627439f701e';
const API_TOKEN = 'ATTA7ae4e8abb166f0698ddc19146e486eb7a3722997853ab4d245972ff8b0003b2c356006E0'; 
const ID_LIST = '653805509f1cce28101bca16';
const ID_LIST1 = '65380550fda253c057e69bf5';
/*const id = '654de1cf9f4621d7b7ff674b';*/



@Injectable({
  providedIn: 'root',
})
export class TrelloService implements taskRepository{
  storage: any;
  constructor(private http: HttpClient) {}






  /*La creacion*/ 
  async createTask(task: Task): Promise<any> {
    console.log(task); // impresion de tareeas en
    const data = {
      idList: ID_LIST,
      name: task.nombre,
      desc: task.descripcion,
      prioridad: task.prioridad,
      estado: true

    };

    const url = `${API_URL}cards?key=${API_KEY}&token=${API_TOKEN}`;
    const response: any = await this.http.post(url, data).toPromise();
    
    if (response && response.id) {
      let tasks: Task[] = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')!) : [];
      tasks.push({
        id: response.id,
        nombre: task.nombre,
        descripcion: task.descripcion,
        prioridad: task.prioridad,
        estado: true
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
      throw new Error('No se pudo crear la tarea en Trello.');
    }
  }
  
  









  /*la obtencion*/

  async getTask(): Promise<Task[]> {
    const url = `${API_URL}lists/${ID_LIST}/cards?key=${API_KEY}&token=${API_TOKEN}`;
    const response: any = await this.http.get(url).toPromise();
  
    const tasks: Task[] = response.map((card: any) => ({
      id: card.id,
      nombre: card.name,
      descripcion: card.desc,
      prioridad: 'ALTA', // Puedes asignar la prioridad que corresponda
      estado: true, // Puedes asignar el estado que corresponda
    }));
  
    return tasks;
  }
 






  /*async getTask(): Promise<Task[]> {
    const data = await this.http.get(API_URL + 'cards').toPromise();

    if (Array.isArray(data)){
      const list: Task[] = data.map(card => ({
        id: card.id,
        nombre: card.name,
        descripcion: card.desc,
        prioridad: 'ALTA',
        estado: true
      }))
      return list;
    }
    throw new Error('Method not implemented.');
  }*/








  async getTaskById(id: string): Promise<Task | null> {
    const url = `${API_URL}cards/${id}?key=${API_KEY}&token=${API_TOKEN}`;
    try {
      const response: any = await this.http.get(url).toPromise();
      if (response) {
        return {
          id: response.id,
          nombre: response.name,
          descripcion: response.desc,
          prioridad: response.prioridad,
          estado: true,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error al obtener la tarea por ID:', error);
      return null;
    }
  }



  /*async updateTask(task: Task): Promise<Task> {
    // Actualizar la tarea en el almacenamiento local
    let tasks: Task[] = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')!) : [];
    const index = tasks.findIndex(t => t.id === task.id);
      
    if (index !== -1) {
        tasks[index] = {
            id: task.id,
            nombre: task.nombre,
            descripcion: task.descripcion,
            prioridad: 'ALTA',
            estado: true,
        };

        localStorage.setItem('tasks', JSON.stringify(tasks));
        return tasks[index];
    }
    
    throw new Error('No se pudo actualizar la tarea.');
}*/




/* modificacion */
  /*productos para lunes*/ 
 /* async updateTask(task: Task): Promise<any> {
    const url = `${API_URL}cards/$?key=${API_KEY}&token=${API_TOKEN}`;
    const data = {
       nombre: task.nombre,
       descripcion: task.descripcion,
    };
   
    const response: any = await this.http.put(url, data).toPromise();
   
    if (response && response.id) {
       // Actualizar la tarea en el almacenamiento local
       let tasks: Task[] = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')!) : [];
       const index = tasks.findIndex(t => t.id === task.id);
         
       if (index !== -1) {
         tasks[index] = {
           id: response.id,
           nombre: task.nombre,
           descripcion: task.descripcion,
           prioridad: 'ALTA',
           estado: true,
         };
   
         localStorage.setItem('tasks', JSON.stringify(tasks));
         return tasks[index];
       }
    }
   
    throw new Error('No se pudo actualizar la tarea en Trello.');
   }*/




   async updateTask(task: Task): Promise<Task> {
    const url = `${API_URL}cards/${task.id}?key=${API_KEY}&token=${API_TOKEN}`;
    const data = {
      idList: ID_LIST1,
      name: task.nombre,
      desc: task.descripcion,
      prioridad: task.prioridad,
    };
  
    try {
      const response: any = await this.http.put(url, data).toPromise();
  
      if (response && response.id) {
        // Actualiza la tarea en el almacenamiento local si es necesario
        let tasks: Task[] = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')!) : [];
        const index = tasks.findIndex(t => t.id === task.id);
  
        if (index !== -1) {
          tasks[index] = {
            id: response.id,
            nombre: task.nombre,
            descripcion: task.descripcion,
            prioridad: task.prioridad,
            estado: true,
          };
  
          // Actualiza el almacenamiento local con las tareas modificadas
          localStorage.setItem('tasks', JSON.stringify(tasks));
  
          // Retorna la tarea modificada
          return tasks[index];
        }
      }
  
      // Si no se pudo actualizar la tarea en Trello
      console.error('No se pudo actualizar la tarea en Trello:', response);
      throw new Error('No se pudo actualizar la tarea en Trello.');
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      throw error;
    }
  }

   





  /*eliminaccion */

 /* async deleteTask(id: string): Promise<any> {
    Obtener las tareas del almacenamiento local
    let tasks: Task[] = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')!) : [];
    const index = tasks.findIndex(t => t.id === id);
      
    if (index !== -1) {
        // Eliminar la tarea del array
        tasks.splice(index, 1);

        // Guardar las tareas actualizadas en el almacenamiento local
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Devolver las tareas actualizadas
        return tasks;
    }
    
    throw new Error('No se pudo eliminar la tarea.');
}*/


  async deleteTask(id: string): Promise<any> {
    const url = `https://api.trello.com/1/cards/${id}?key=b019a05d117db6aee5e5a627439f701e&token=ATTA7ae4e8abb166f0698ddc19146e486eb7a3722997853ab4d245972ff8b0003b2c356006E0`;
    const response = await this.http.delete(url).toPromise();

  if (response) {
    // La tarjeta se eliminó con éxito
  } else {
    throw new Error('No se pudo eliminar la tarea');
  }
}
}







///////////////////////////////////////////////////////////////////////////////////////////////
 /* private apiKey = 'b019a05d117db6aee5e5a627439f701e';
  private token = 'd8fa6a5e5d6bf4d421723e02ef7c56b9f5c7284550ea1c4dbb6b593255d74cd7';
  private baseUrl = 'https://api.trello.com/1';

  constructor(private http: HttpClient) {}

  // Operación de lectura (GET)
  getBoardData(boardId: string) {
    const url = `${this.baseUrl}/boards/${boardId}?key=${this.apiKey}&token=${this.token}`;
    return this.http.get(url);
  }

  // Operación de creación (POST)
  createCard(boardId: string, cardData: any) {
    const url = `${this.baseUrl}/cards?key=${this.apiKey}&token=${this.token}&idList=${boardId}`;
    return this.http.post(url, cardData);
  }

  // Operación de actualización (PUT)
  updateCard(cardId: string, cardData: any) {
    const url = `${this.baseUrl}/cards/${cardId}?key=${this.apiKey}&token=${this.token}`;
    return this.http.put(url, cardData);
  }

  // Operación de eliminación (DELETE)
  deleteCard(cardId: string) {
    const url = `${this.baseUrl}/cards/${cardId}?key=${this.apiKey}&token=${this.token}`;
    return this.http.delete(url);
  }*/
