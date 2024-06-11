export interface IPaginated<T>
{
    datas : T[];
    page: number;
    limit: number;
    totalData: number;
}

export interface ISimplePaginated
{
    page: number;
    limit: number;
    totaldata: number;
}