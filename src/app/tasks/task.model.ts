export interface IProjectTask {
    id: number,
    title: string,
    projectId: number,
    status: number,
    description: string,
    dueDate: Date,
    priority: number
}