import { Post } from '@/domain';

export class PostDTO {
  id: string;
  title: string;
  content: string;
  createdAt: string;

  constructor(props: PostDTOProps) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.createdAt = props.createdAt;
  }

  static fromDomain(domain: Post): PostDTO {
    return new PostDTO({
      id: domain.id,
      title: domain.title,
      content: domain.content,
      createdAt: domain.createdAt.toISOString(),
    });
  }
}

export interface PostDTOProps {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}
