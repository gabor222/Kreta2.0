export class User {
    public password: string;
    public constructor(
        public id: number,
        public userName: string,
        public realName: string,
        public role: string
    ) {}
}
