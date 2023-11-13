import {
  ClientGrpcProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { USERS_PACKAGE_NAME } from '../../users/users.pb';

export const clientProxyUsers = (): ClientGrpcProxy => {
  return ClientProxyFactory.create({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      package: USERS_PACKAGE_NAME,
      protoPath: 'node_modules/proyectos-juegos-proto/proto/users.proto',
    },
  });
};
