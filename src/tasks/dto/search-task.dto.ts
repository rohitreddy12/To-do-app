import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../tasks.model"

export class SearchTaskDto{
    @IsOptional()
    @IsString()
    search:string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status:TaskStatus
}