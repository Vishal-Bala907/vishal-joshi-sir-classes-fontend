export interface TodoPropsType{
    todoData : TodoDataType[],
    setTodoData : React.Dispatch<React.SetStateAction<TodoDataType[]>>
}

export interface TodoDataType{
    id: number;
    title: string;
    badge: string;
    badgeClass: string;
    timeLimit: string;
    status: string
}[]

export interface ToDoProp {
    id: number;
    title: string;
    status?: string;
    badge: string;
    badgeClass: string;
    timeLimit: string;
}
  
  export interface ToDoSliceProp {
    showSideBar: boolean;
    todoList: ToDoProp[] | [];
    task: string;
    visible ?:boolean;
    completeTask ?: []
    allTaskCompleted ?: boolean
  }