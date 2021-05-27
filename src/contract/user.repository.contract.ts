import { User } from '@/domain';

export interface UserRepositoryContract {
  getByEmail(email: string): Promise<User | undefined>;
  create(props: CreateUserProps): Promise<User>;
}

export interface CreateUserProps {
  email: string;
  password: string;
}
