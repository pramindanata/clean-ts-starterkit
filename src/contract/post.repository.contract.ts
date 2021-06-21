import { Pagination, PaginationOptions } from '@/common';
import { CreatePostProps, Post, UpdatePostProps } from '@/domain';

export interface PostRepositoryContract {
  getPagination(options: PaginationOptions): Promise<Pagination<Post>>;
  create(props: CreatePostProps): Promise<Post>;
  getDetail(id: string): Promise<Post | undefined>;
  update(post: Post, props: UpdatePostProps): Promise<Post>;
}
