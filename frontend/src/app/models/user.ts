import { Group } from './group';

export enum Role {
  ROLE_GUEST = "ROLE_GUEST",
  ROLE_STUDENT = "ROLE_STUDENT",
  ROLE_TEACHER = "ROLE_TEACHER",
  ROLE_ADMIN = "ROLE_ADMIN",
}

export class User {
    public password: string;
    public birthDate: Date;
    public email: string;
    public nationality: string;
    public male: boolean;
    public classModel: Group;
    public avatar: string;
    public role: Role;
    public token?: string;

    public constructor(
        public id: number,
        public userName: string,
        public realName: string,
    ) {}
}
