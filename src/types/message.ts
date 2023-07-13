import { User } from "./user";

export type Message = { id: string; body: string; from: User; to: User };
