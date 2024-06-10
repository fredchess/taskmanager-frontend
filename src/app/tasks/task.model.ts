export interface IProjectTask {
    id: number,
    title: string,
    projectId: number,
    status: number,
    description: string,
    dueDate: Date,
    priority: number
}

export interface ITaskFilter {
    statuses: number[],
    priorities: number[]
}

export interface ISorter {
    field: string | null,
    direction: string
}