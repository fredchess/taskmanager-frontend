export interface IProject
{
    id?: number,
    title: string,
    description?: string,
    totalTasks?: number
}

export interface IProjectResponse
{
    data: IProject[]
}