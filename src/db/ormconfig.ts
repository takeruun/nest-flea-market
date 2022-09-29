import { DataSource } from 'typeorm';

const typeOrmDatabaseSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: ['dist/entities/*.entity.js'], // コンパイル済みのものを指定する
  migrations: ['dist/migrations/*.js'],
});

export default typeOrmDatabaseSource;
