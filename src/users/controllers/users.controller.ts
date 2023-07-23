import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO } from '../dto/user.dto';
import { CreateUserDTO } from '../dto/createUser.dto';
import { InvalidDomainException } from 'src/shared/domain/exceptions/invalidDomain.error';
import { UpdateUserDTO } from '../dto/updateUser.dto';

@Controller('/tracking-so/users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.validateID(id);
    const result = await this.usersService.findOne(+id);

    if (!result) throw new NotFoundException(`User with id ${id} not found`);

    return result;
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDTO) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.validateID(id);
    return this.usersService.remove(+id);
  }

  private validateID(id: string) {
    if (!Number.isInteger(+id))
      throw new InvalidDomainException('The id must be a number');
  }
}
