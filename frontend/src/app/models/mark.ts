import { Subject } from "./subject";

export class Mark {
    public constructor(
        public id: number,
        public studentUserId: number,
        public teacherUserId: number,
        public date: Date,
        public mark: number,
        public description: string,
        public subject: Subject,
    ) {}
}