import { Pagination, PaginationOptions } from '@/common';
import { Post } from '@/domain';

export interface PostRepositoryContract {
  getPagination(options: PaginationOptions): Promise<Pagination<Post>>;
}
