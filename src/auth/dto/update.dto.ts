import { IsString } from "class-validator";
import { registerDto } from "./register.dto";
import { PartialType } from "@nestjs/mapped-types";
// import { PartialType } from "@nestjs/mapper-types"

export class updateDto extends PartialType(registerDto) {

}