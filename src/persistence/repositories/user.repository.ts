import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepository {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async findAllUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findUserById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findUserByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username }).exec();
  }

  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async updateUser(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async deleteUser(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id);
  }
}