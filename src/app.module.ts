import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule, ConfigService} from '@nestjs/config'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('DB_URL'),
      })
    })],
})
export class AppModule {
}
