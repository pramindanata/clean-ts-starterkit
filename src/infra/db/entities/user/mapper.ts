import { User } from '@/domain';
import { OrmUser } from './entity';

export class OrmUserMapper {
  static toDomain(model: OrmUser): User {
    const user = new User(model);

    return user;
  }
}
