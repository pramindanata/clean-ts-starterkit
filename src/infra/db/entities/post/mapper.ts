import { Post } from '@/domain';
import { OrmPost } from './entity';

export class OrmPostMapper {
  static toDomain(model: OrmPost): Post {
    const post = new Post(model);

    return post;
  }
}
