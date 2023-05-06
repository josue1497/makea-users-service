import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UsersController {
    
        constructor(private readonly usersService: UsersService) { }

        @MessagePattern({ cmd: 'findAllUsers' })
        async getUsers(): Promise<unknown> {
            return await this.usersService.findAllUsers();
        }

        @MessagePattern({ cmd: 'findUserById' })
        async getUserById(@Payload() id: string): Promise<unknown> {
            return await this.usersService.findUserById(id);
        }

        @MessagePattern({ cmd: 'findUserByEmail' })
        async getUserByEmail(@Payload()email: string): Promise<unknown> {
            return await this.usersService.findUserByEmail(email);
        }

        @MessagePattern({ cmd: 'createUser' })
        async createUser(@Payload() user: any): Promise<unknown> {
            return await this.usersService.createUser(user);
        }

        @MessagePattern({ cmd: 'updateUser' })
        async updateUser(@Payload() { id, data }: any) {
            return await this.usersService.updateUser(id, data);
        }

        @MessagePattern({ cmd: 'deleteUser' })
        async deleteUser(@Payload() id: string) {
            return await this.usersService.deleteUser(id);
        }

}
