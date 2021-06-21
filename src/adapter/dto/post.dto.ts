import { Post } from '@/domain';
import { UserDto, UserDtoProps } from './user.dto';

export class PostDTO {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: UserDto;

  constructor(props: PostDtoProps) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.createdAt = props.createdAt;
    this.author = new UserDto(props.author);
  }

  static fromDomain(domain: Post): PostDTO {
    const { author } = domain;

    return new PostDTO({
      id: domain.id,
      title: domain.title,
      content: domain.content,
      author: {
        id: author!.id,
        email: author!.email,
        createdAt: author!.createdAt.toISOString(),
      },
      createdAt: domain.createdAt.toISOString(),
    });
  }
}

export interface PostDtoProps {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: UserDtoProps;
}
