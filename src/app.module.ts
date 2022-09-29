import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { DatabaseModule } from './db/database.module';
@Module({
  imports: [
    ItemsModule,
    DatabaseModule,
    // ormconfig.js　でDB接続設定は読み込む
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'postgres',
    //   database: 'postgres',
    //   autoLoadEntities: true,
    // }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
