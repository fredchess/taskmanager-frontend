export interface IProjectTask {
    id: string,
    title: string,
    projectId: string,
    status: number,
    description: string,
    dueDate: Date,
    priority: number
}

export interface IProjectTaskResponse {
    data: IProjectTask[]
}

export interface ITaskFilter {
    statuses: number[],
    priorities: number[]
}

export interface ISorter {
    field: string | null,
    direction: string
}