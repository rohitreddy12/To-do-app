import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTaskDto } from './dto/search-task.dto';

@Injectable()
export class TasksService {
    private tasks:Task[] = []

    fetchAllTasks():Task[] {
        return this.tasks
    }

    createTask(createTaskDto:CreateTaskDto):Task {
        const {title,desc} = createTaskDto

        const task = {
            id:uuid(),
            title,
            desc,
            status:TaskStatus.OPEN
        }
        this.tasks.push(task)
        return task
    }

    fetchTaskById(id:string):Task {
        const task = this.tasks.find((item) => id === item.id)

        if(!task){
            throw new NotFoundException(`The task with ${id} does not exist`)
        }
        return task
    }

    deleteTaskById(id:string):Task {
        const task = this.fetchTaskById(id)
        const index = this.tasks.findIndex((item) => item === task)
        const deletedTask = this.tasks.splice(index,1)[0]
        return deletedTask
    }

    updateTask(id:string,status:TaskStatus):Task {
        const task = this.fetchTaskById(id)
        task.status = status
        return task
    }

    fetchTasks(searchtaskDto:SearchTaskDto):Task | Task[] {
        const {search,status} = searchtaskDto

        if(search){
            return this.tasks.filter((item) => item.desc || item.title === search)
        }
        if(status){
            return this.tasks.filter((item) => item.status.toLowerCase() === status)
        }
    }
}
