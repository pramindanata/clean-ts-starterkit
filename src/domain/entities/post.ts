export class Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;

  constructor(props: PostProps) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.createdAt = props.createdAt;
  }
}

export interface PostProps {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}
