// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  eventsCausingActions: {
    assignTodosToContext: "done.invoke.TodosMachine.TodosLoading:invocation[0]";
    assignErrorToContext:
      | "error.platform.TodosMachine.TodosLoading:invocation[0]"
      | "error.platform.TodosMachine.CreateNewTodo.SubmitForm:invocation[0]";
    assignInputToContext: "INPUT_CHANGE";
  };
  internalEvents: {
    "done.invoke.TodosMachine.TodosLoading:invocation[0]": {
      type: "done.invoke.TodosMachine.TodosLoading:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.TodosMachine.TodosLoading:invocation[0]": {
      type: "error.platform.TodosMachine.TodosLoading:invocation[0]";
      data: unknown;
    };
    "error.platform.TodosMachine.CreateNewTodo.SubmitForm:invocation[0]": {
      type: "error.platform.TodosMachine.CreateNewTodo.SubmitForm:invocation[0]";
      data: unknown;
    };
    "done.invoke.TodosMachine.CreateNewTodo.SubmitForm:invocation[0]": {
      type: "done.invoke.TodosMachine.CreateNewTodo.SubmitForm:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.TodosMachine.SelectTodoToDelete:invocation[0]": {
      type: "done.invoke.TodosMachine.SelectTodoToDelete:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    loadTodos: "done.invoke.TodosMachine.TodosLoading:invocation[0]";
    saveTodos: "done.invoke.TodosMachine.CreateNewTodo.SubmitForm:invocation[0]";
    deleteTodo: "done.invoke.TodosMachine.SelectTodoToDelete:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: "loadTodos" | "deleteTodo" | "saveTodos";
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    loadTodos:
      | "done.invoke.TodosMachine.CreateNewTodo.SubmitForm:invocation[0]"
      | "done.invoke.TodosMachine.SelectTodoToDelete:invocation[0]";
    deleteTodo: "DELETE_TODO";
    saveTodos: "SUBMIT_INPUT";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "TodosLoading"
    | "TodosLoaded"
    | "TodosNotLoaded"
    | "CreateNewTodo"
    | "CreateNewTodo.ShowFormInput"
    | "CreateNewTodo.SubmitForm"
    | "SelectTodoToDelete"
    | { CreateNewTodo?: "ShowFormInput" | "SubmitForm" };
  tags: never;
}
