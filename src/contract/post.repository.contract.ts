import { Pagination, PaginationOptions } from '@/common';
import { CreatePostProps, Post } from '@/domain';

export interface PostRepositoryContract {
  getPagination(options: PaginationOptions): Promise<Pagination<Post>>;
  create(props: CreatePostProps): Promise<Post>;
}
