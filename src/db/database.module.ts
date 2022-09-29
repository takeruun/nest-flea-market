import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmDatabaseSource from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await typeOrmDatabaseSource.initialize();
        return typeOrmDatabaseSource.options;
      },
    }),
  ],
})
export class DatabaseModule {}
