import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import typeOrmDatabaseSource from './ormconfig';

@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        await typeOrmDatabaseSource.initialize();
        return typeOrmDatabaseSource;
      },
    },
  ],
  exports: [DataSource],
})
export class DatabaseModule {}
