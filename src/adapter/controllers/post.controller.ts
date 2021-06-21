import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { PaginationOptions, ReqParams, ReqQuery } from '@/common';
import { PostUseCase } from '@/domain';
import { PostDto } from '../dto';
import { NotFoundException } from '../exception';

@injectable()
export class PostController {
  constructor(private postUseCase: PostUseCase) {}

  async index(
    req: Request<any, any, any, IndexQueryReq>,
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

  async show(req: Request<ShowParamsReq>, res: Response): Promise<any> {
    const { postId } = req.params;
    const post = await this.postUseCase.getDetail(postId);

    if (!post) {
      throw new NotFoundException();
    }

    return res.json({
      data: PostDto.fromDomain(post),
    });
  }

  async update(
    req: Request<ShowParamsReq, any, UpdateBodyReq>,
    res: Response,
  ): Promise<any> {
    const { content, title } = req.body;
    const { postId } = req.params;
    const post = await this.postUseCase.getDetail(postId);

    if (!post) {
      throw new NotFoundException();
    }

    const updatedPost = await this.postUseCase.update(post, { content, title });

    return res.json({
      data: PostDto.fromDomain(updatedPost),
    });
  }

  async delete(req: Request<ShowParamsReq>, res: Response): Promise<any> {
    const { postId } = req.params;
    const post = await this.postUseCase.getDetail(postId);

    if (!post) {
      throw new NotFoundException();
    }

    await this.postUseCase.delete(post.id);

    return res.json({
      data: PostDto.fromDomain(post),
    });
  }
}

type IndexQueryReq = ReqQuery<PaginationOptions>;
type ShowParamsReq = ReqParams<{ postId: string }>;

interface CreateBodyReq {
  title: string;
  content: string;
}

interface UpdateBodyReq {
  title: string;
  content: string;
}
