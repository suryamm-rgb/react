import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();


    // whitelist: true -> data coming with the request it does not carry any extra property to the controller so example if the dto contain name ,email if any extra property is present its ignore the that specific field

    // forbidNonWhitelisted: true -> if i request any extra property on the request filed its through the error

    // transform: true -> data is being assigned to this user or if the user is instantOf CreateUserDto its false so transform is  true 