import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks.model';
import { SearchTaskDto } from './dto/search-task.dto';
import { TaskStatusDto } from './dto/task-status.dto';

interface UpdateParams{
    id:string,
    status:TaskStatus
}

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService){}

    @Get()
    fetchTasks(@Query() searchtaskDto:SearchTaskDto){
        if(Object.keys(searchtaskDto).length>0){
            return this.tasksService.fetchTasks(searchtaskDto)
        }
        else{
            return this.tasksService.fetchAllTasks()
        }
    }

    @Post()
    createTask(@Body() createtaskDto:CreateTaskDto){
        return this.tasksService.createTask(createtaskDto)
    }

    @Get('/:id')
    fetchTaskById(@Param('id') id:string){
        return this.tasksService.fetchTaskById(id)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string){
        return this.tasksService.deleteTaskById(id)
    }

    @Patch('/:id/:status')
    updateTask(@Param() taskStatusDto:TaskStatusDto){
        const {status , id} = taskStatusDto
        return this.tasksService.updateTask(id,status)
    }
}
