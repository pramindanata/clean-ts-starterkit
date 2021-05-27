import { AbstractRepository, EntityRepository } from 'typeorm';
import { UserRepositoryContract, CreateUserProps } from '@/contract';
import { User } from '@/domain';
import { OrmUser, OrmUserMapper } from '../entities';

@EntityRepository(OrmUser)
export class UserRepository
  extends AbstractRepository<OrmUser>
  implements UserRepositoryContract
{
  async getByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ email });

    return user && OrmUserMapper.toDomain(user);
  }

  async create(props: CreateUserProps): Promise<User> {
    const user = await this.repository.save({
      email: props.email,
      password: props.password,
    });

    return OrmUserMapper.toDomain(user);
  }
}
