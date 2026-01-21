import { User } from "../entities/user.entity";
import { Email } from "../value-objects/email.vo";

export abstract class UserRepository {
  abstract  findById(id: string): Promise<User | null>;
  abstract  findByEmail(email: string): Promise<User | null>;
  abstract  save(user: User): Promise<void>;
}