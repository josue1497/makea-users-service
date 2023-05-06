import { Injectable } from '@nestjs/common';
import { UserRepository } from '../persistence/repositories/user.repository';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {

    constructor(private readonly userRepository: UserRepository) { }

    findAllUsers(): Promise<any> {
        return this.userRepository.findAllUsers();
    }

    async findUserById({ id }: any): Promise<any> {
        const user = await this.userRepository.findUserById(id);
        if (!user) {
            throw new RpcException('User not found');
        }

        return user;
    }

    async findUserByEmail(email: string): Promise<any> {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new RpcException('User not found');
        }

        return user;
    }

    async createUser(user: any): Promise<any> {
        if(await this.isUserExists(user)) {
            throw new RpcException('User already exists');
        }

        return this.userRepository.createUser(user);
    }

    async updateUser(id: string, user: any): Promise<any> {

        if(!(await this.userRepository.findUserById(id))) {
            throw new RpcException('User not found');
        }

        if(await this.isUserExists(user)) {
            throw new RpcException('User already exists');
        }

        return this.userRepository.updateUser(id, user);
    }

    deleteUser(id: string): any {
        return this.userRepository.deleteUser(id);
    }


    private async isUserExists({email, username}: any) {
        return await this.userRepository.findUserByEmail(email) || await this.userRepository.findUserByUsername(username);
    }
}
