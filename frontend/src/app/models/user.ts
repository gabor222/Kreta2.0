import { Group } from './group';

export class User {
    public password: string;
    public birthDate: Date;
    public email: string;
    public nationality: string;
    public gender: string;
    public classModel: Group;
    public avatar: string;
    
    public constructor(
        public id: number,
        public userName: string,
        public realName: string,
        public role: string,
    ) {}
}
