import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigClientService } from '../config/config-client.service';
import { ConfigModule } from '../config/config.module';
import { UserRepository } from './repositories/user.repository';
import { User, UserSchema } from './schemas/user.schema';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigClientService) => {
                const config = await configService.getConfigByService('users');
                return {
                    uri: config.MONGODB_URL,
                    user: config.MONGO_DB_USER,
                    pass: config.MONGO_DB_PASS,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    authSource: config.MONGO_DB_AUTH_SOURCE,
                }
            },
            inject: [ConfigClientService],
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    providers: [UserRepository],
    exports: [UserRepository],
})
export class PersistenceModule { }
