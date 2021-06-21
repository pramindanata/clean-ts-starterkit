import { inject, injectable } from 'tsyringe';
import { Pagination, PaginationOptions, Token } from '@/common';
import { PostRepositoryContract } from '@/contract';
import { Post, User } from '../entities';

@injectable()
export class PostUseCase {
  constructor(
    @inject(Token.PostRepository)
    private postRepo: PostRepositoryContract,
  ) {}

  async getPagination(options: PaginationOptions): Promise<Pagination<Post>> {
    const pagination = await this.postRepo.getPagination(options);

    return pagination;
  }

  async create(props: CreatePostProps): Promise<Post> {
    const post = await this.postRepo.create(props);

    return post;
  }
}

export interface CreatePostProps {
  title: string;
  content: string;
  author: User;
}
