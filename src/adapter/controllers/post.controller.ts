import { Request, Response } from 'express';
import { PaginationOptions } from '@/common';
import { PostUseCase } from '@/domain';
import { PostDTO } from '../dto';

export class PostController {
  constructor(private postUseCase: PostUseCase) {}

  async index(
    req: Request<any, any, any, PaginationOptions>,
    res: Response,
  ): Promise<any> {
    const { limit, page } = req.query;
    const { total, data } = await this.postUseCase.getPagination({
      limit,
      page,
    });

    return res.json({ total, data: data.map(PostDTO.fromDomain) });
  }
}
