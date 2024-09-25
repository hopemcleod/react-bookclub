import { Dto } from "../../types/commonDomain.types";

export type Book = Dto & {
    id: number;
    author: string;
    bookClub: boolean;
    genre: string;
    pages: number;
    status: number;
    title: string;
}

export enum BookStatus {
    Archived,
    Finished,
    Incomplete,
    NotStarted,
    Started,
}