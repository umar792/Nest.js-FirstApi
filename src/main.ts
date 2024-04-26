import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function FirstApi() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000, ()=>{
    console.log(`server is listening on 4000 PORT`)
  });
}
FirstApi();
