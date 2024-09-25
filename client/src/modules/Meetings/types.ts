import { Dto } from "../../types/commonDomain.types";

export type Meeting = Dto & {
    date: Date,
    bookId: number,
    readUpTo: number,
    status: MeetingStatus,
    title: string,
}

export enum MeetingStatus {
    Draft,
    Scheduled,
    Completed,
    Cancelled
}

export type RowData = {
    id: number;
}