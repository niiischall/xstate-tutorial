import { createMachine, assign } from 'xstate';

export const todoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FWwLIEMDGAFgJYB2YAdGhrADKo4SlQDEGZ5pAbqgNYVWZchUv3SY6DJgi6o8OAC5FUJANoAGALqJQAB0xFFy7SAAeiAEwB2AIzkAHADYAnOYDMdl+bVrzAFksANCAAnogAtL4ArGrklk4OkTYODtbWzq4AvhlBAtj4xOy5EowkLGAATuWo5eQ6ADYKAGbVALaUYnnChR3FUjJyhqqaxnqwBkokxmYIYa6W5NZ+kU4eka4J5k7WQaEzVubkvtaWapHWy5ZxDpZZOR1CBaLUxZDMAMIASgCiAILIXwB9ZAAeQAIsCRvpBlMLE5IocTnZFq5rL47JFnIEQuFzvDnHY7Ci1pZfFFlrcQLkHiJ2s96BBXqCvjQvv8gWCIUgQKNxkYudNImjyGpXGsnKdfHCVjscZE8StCec5qS5U4KVT8jS3uUwAowAA5MAAdwE5AAygRUEaAGKtACSJB0AFd5Mw7fqAAoAVWQALeAAkfvqAOJfSFjaH8xAOcgOI6kjxzZKixYyhDmY7CtSS9HZqwpFzq+6a9ja3XyA3G00Wq228otB3O11mr0AISwdt97u9yHDvMmUfTSNirnFKzi8QcrjT1mzh1ckrc1jsvjUSKOReo1NLOr1hpNYnNToARi0DHWWqxlBQZHxaYISxQy3uq4ezSez-IL9ISNwBhN1C0LkeUjUABTseZLHMOxs3RVIVinNMwmueFIkcSwFxsDFEk3B8uifXcK33asP3PVpmAqKoanqJpWnvTpHnIZ8iNfDAj1PMj6x-P8FAA4ZgKhCYYXTDDyGg0dHC8E5LEJGcMXILZ-AcPxLmcRdcIYmkzTAOowDweQBDQUEdLACsr3YW8njwxjtN0-TDNQYzdIrbjZF45RAL7UDTEQGTXEOKwSUsDFzCnNQsV2CInCcMTzDQycRTcNQ1WySli3w80TPssQjJMszKOqWoGnkZp63o7cKFsvSDJyxy8rAVz-w8-jdEEvkwN85L7DmSIM1HONrGnbE9jnGwZJJLwUmufwslSkh0DgYwNQyop6SYLyhMHCJ1nINZevxKC3DRXwkOk3b0KiGC3DFDSKvol4IA29qfIQXxXBiXxQriKx0SsI4hsi1w-FiXwNhsJwoPcbNbsfej9VQeQHqegcOpmN7Yhg9F4gJdZSVJJDBpiz7Uk+9EURkmGMuYysDzYmsbXtR0XWR4T4UsZJQZJXq10OiLEAhhSFxcCHFnFIG7EpxjqeIt9SK-VoWcHXq7GFCHwuzNQ432tMoPnSVjrepERQcSWtUImmBEV1GwmXMTXFFIHBTiRZLgB8IYmw7NJSBjMXDUY5TfYKrsowXLnLAK2XvFeF-GVJxJXj5YTuG5D-MlBxCTOM43EuOLA4jgSI0263QY90VQvHcwjpXU6YPO65R2OQlCV8WaMiAA */
  createMachine({
  context: {
    todos: [] as string[],
    formInput: "",
    todoToDelete: "",
    errorMessage: undefined as string | undefined,
  },
  tsTypes: {} as import("./todoappMachine.typegen").Typegen0,
  schema: {
    services: {} as {
      loadTodos: {
        data: string[];
      };
      saveTodos: {
        data: void;
      };
    },
    events: {} as
      | {
          type: "CREATE_TODO";
        }
      | {
          type: "INPUT_CHANGE";
          value: string;
        }
      | {
          type: "SUBMIT_INPUT";
        }
      | {
          type: "DELETE_TODO",
          value: string,
        },
  },
  id: "TodosMachine",
  initial: "TodosLoading",
  states: {
    TodosLoading: {
      invoke: {
        src: "loadTodos",
        onDone: [
          {
            actions: "assignTodosToContext",
            target: "TodosLoaded",
          },
        ],
        onError: [
          {
            actions: "assignErrorToContext",
            target: "TodosNotLoaded",
          },
        ],
      },
    },
    TodosLoaded: {
      on: {
        CREATE_TODO: {
          target: "CreateNewTodo",
        },
        DELETE_TODO: {
          target: "SelectTodoToDelete",
        },
      },
    },
    TodosNotLoaded: {},
    CreateNewTodo: {
      initial: "ShowFormInput",
      states: {
        ShowFormInput: {
          on: {
            INPUT_CHANGE: {
              actions: "assignInputToContext",
            },
            SUBMIT_INPUT: {
              target: "SubmitForm",
            },
          },
        },
        SubmitForm: {
          invoke: {
            src: "saveTodos",
            onDone: [
              {
                target: "#TodosMachine.TodosLoading",
              },
            ],
            onError: [
              {
                actions: "assignErrorToContext",
                target: "ShowFormInput",
              },
            ],
          },
        },
      },
    },
    SelectTodoToDelete: {
      invoke: {
        src: "deleteTodo",
        onDone: [
          {
            target: "#TodosMachine.TodosLoading",
          },
        ],
        onError: [{
          target: "TodosLoaded"
        }],
      },
    },
  },
},
    {
      actions: {
        assignTodosToContext: assign((context, event) => {
          return {
            todos: event.data,
            formInput: "",
            todoToDelete: "",
          }
        }),
        assignErrorToContext: assign((context, event) => {
          return {
            errorMessage: (event.data as Error).message,
          }
        }),
        assignInputToContext: assign((context, event) => {
          return {
            formInput: event.value,
          }
        }),
      }
    });