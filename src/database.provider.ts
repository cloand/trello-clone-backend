import { DataSource } from 'typeorm';
import { User } from './account/account.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root1234',
        database: 'thello',
        entities: ["dist/**/*.entity.js"],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];


// TypeOrmModule.forRoot({
//     type: 'mysql',
//     host: 'localhost',
//     port: 3306,
//     username: 'root',
//     password: 'root1234',
//     database: 'thello',
//     entities: [User],
//     synchronize: true,
//   })