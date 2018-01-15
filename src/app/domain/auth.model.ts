import { User } from './index';
import { Err } from './err.model';

export interface Auth {
  user?: User;
  userId?: string;
  err?: Err;
  token?: string;
}
