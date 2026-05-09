import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Headers,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('users')
export class UsersController {
  private users = [
    { id: 1, username: 'Mohamed', email: 'mohamed@esprit.tn', status: 'active' },
    { id: 2, username: 'Sarra', email: 'sarra@esprit.tn', status: 'inactive' },
    { id: 3, username: 'Ali', email: 'ali@esprit.tn', status: 'inactive' },
    { id: 4, username: 'Eya', email: 'eya@esprit.tn', status: 'active' },
  ];
    @Get()
  findAll(@Query('status') status?: string) {
    if (status) {
      return this.users.filter(u => u.status === status);
    }
    return this.users;
  }
    @Get(':id')
  findOne(@Param('id') id: string) {
    return this.users.find(u => u.id === +id);
  }


@Post()
create(
  @Body() body: CreateUserDto,
  @Headers('authorization') auth: string,
) {
  const newUser = {
    id: this.users.length + 1,
    ...body,
    status: 'active',
  };

  this.users.push(newUser);
  return newUser;
}
@Put(':id')
update(
  @Param('id') id: string,
  @Body() body: CreateUserDto,
) {
  const index = this.users.findIndex(u => u.id === +id);

  if (index === -1) return { message: 'User not found' };

  this.users[index] = {
    ...this.users[index],
    ...body,
  };

  return this.users[index];
}
    @Delete(':id')
  remove(@Param('id') id: string) {
    this.users = this.users.filter(u => u.id !== +id);
    return { message: 'User deleted' };
  }
    @Get('active/:status')
  getByStatus(@Param('status') status: string) {
    return this.users.filter(u => u.status === status);
  }

}