import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { PaginationOptions, ReqQuery } from '@/common';
import { PostUseCase } from '@/domain';
import { PostDto } from '../dto';
import { NotFoundException } from '../exception';

@injectable()
export class PostController {
  constructor(private postUseCase: PostUseCase) {}

  async index(
    req: Request<any, any, any, ReqQuery<PaginationOptions>>,
    res: Response,
  ): Promise<any> {
    const { limit, page } = req.query;
    const { total, data } = await this.postUseCase.getPagination({
      limit,
      page,
    });

    return res.json({ total, data: data.map(PostDto.fromDomain) });
  }

  async create(
    req: Request<any, any, CreateBodyReq>,
    res: Response,
  ): Promise<any> {
    const { title, content } = req.body;
    const { user } = req.ctx;
    const post = await this.postUseCase.create({
      title,
      content,
      author: user!,
    });

    return res.json({
      data: PostDto.fromDomain(post),
    });
  }

  async show(req: Request, res: Response): Promise<any> {
    const { postId } = req.params;
    const post = await this.postUseCase.getDetail(postId);

    if (!post) {
      throw new NotFoundException();
    }

    return res.json({
      data: PostDto.fromDomain(post),
    });
  }
}

interface CreateBodyReq {
  title: string;
  content: string;
}
