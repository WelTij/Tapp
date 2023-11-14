import { Injectable } from "@angular/core";
import { Preferences } from "@capacitor/preferences";
import { Task } from "src/app/core/tasks/entities/task";
import { taskRepository } from "src/app/core/tasks/interfaces/task.repository";
import * as OAuth from 'oauth-1.0a';
import { Component } from '@angular/core';

const COLLECTION = "TASK";
@Injectable ({providedIn: "root"})

export class TaskStorageService implements taskRepository {
  async createTask(task: Task): Promise<any> {
    return await Preferences.set({
    key: `${COLLECTION} - ${task.id}`, value: JSON.stringify(task)
  });
  }

  async getTask(): Promise<Task[]> {
    const collection = await Preferences.keys();
    const task: Task[] = [];

    collection.keys.filter(key => key.startsWith(COLLECTION))
      .forEach(async key =>{
        const data = (await Preferences.get(({key}))).value;
        if (data)  task.push(JSON.parse(data));

      })

      return task;
  }



  async getTaskById(id: string): Promise<Task | null> {
    const data = (await Preferences.get({ key: `${COLLECTION} - ${id}` })).value;
    return data ? JSON.parse(data) : null;
  }
  async updateTask(task: Task): Promise<Task> {
    const id = task.id;

    const existingTask = await this.getTaskById(id);
    if (!existingTask) {
      throw new Error(`Task with ID ${id} not found.`);
    }

    await Preferences.set({
      key: `${COLLECTION} - ${id}`,
      value: JSON.stringify(task),
    });
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    await Preferences.remove({key: `${COLLECTION}-${id}`});
  }
}
