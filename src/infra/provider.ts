import { container as baseContainer } from 'tsyringe';
import { getCustomRepository } from 'typeorm';
import { Token } from '@/common';
import { UserRepository } from './db';
import { ConfigHelper, JwtHelper, CryptHelper } from './helpers';
import { createConfig } from './config';

const container = baseContainer;

container.register(Token.Config, {
  useValue: createConfig(),
});

container.register(Token.ConfigHelper, {
  useFactory: (c) => c.resolve(ConfigHelper),
});

container.register(Token.JwtHelper, {
  useFactory: (c) => c.resolve(JwtHelper),
});

container.register(Token.CryptHelper, {
  useFactory: (c) => c.resolve(CryptHelper),
});

container.register(Token.UserRepository, {
  useFactory: () => getCustomRepository(UserRepository),
});

export { container };
