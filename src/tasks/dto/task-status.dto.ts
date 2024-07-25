import { IsEnum } from "class-validator";
import { TaskStatus } from "../tasks.model";

export class TaskStatusDto{
    @IsEnum(TaskStatus)
    status:TaskStatus

    id:string
}