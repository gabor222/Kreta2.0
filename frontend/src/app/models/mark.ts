export class Mark {
    public constructor(
        public id: number,
        public studentUserId: number,
        public teacherUserId: number,
        public timestamp: number,
        public mark: number,
        public description: string
    ) {}
}