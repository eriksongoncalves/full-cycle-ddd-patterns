import express from 'express';
import { Sequelize } from 'sequelize-typescript';

import CustomerModel from '../customer/repository/sequelize/customer.model';

export const app = express();

app.use(express.json());

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    logging: false
  });

  sequelize.addModels([CustomerModel]);
  await sequelize.sync();
}

setupDb();
