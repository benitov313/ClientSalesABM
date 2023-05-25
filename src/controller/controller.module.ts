import { Module } from '@nestjs/common';
import { ClientController } from './client/client.controller';
import { ServiceModule } from 'src/service/service.module';

@Module({
  controllers: [ClientController],
  imports: [ServiceModule],
  exports: []

})
export class ControllerModule {}
