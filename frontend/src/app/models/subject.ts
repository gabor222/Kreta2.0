import { Mark } from './mark';

export class Subject {
    public average: number;
    public constructor(
        public id: number,
        public icon: string,
        public name: string,
        public marks: Mark[]
    ) {}
}