import { inject, injectable } from 'tsyringe';
import { Pagination, PaginationOptions, Token } from '@/common';
import { PostRepositoryContract } from '@/contract';
import { Post } from '../entities';

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
}
