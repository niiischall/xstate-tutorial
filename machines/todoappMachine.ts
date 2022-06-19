import { createMachine, assign } from 'xstate';

export const todoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FWwLIEMDGAFgJYB2YAdGhrADKo4SlQDEGZ5pAbqgNYVWZchUv3SY6DJgi6o8OAC5FUJANoAGALqJQAB0xFFy7SAAeiAKxqAbOTUBmAIwB2ACxqAnGpfmXdp04AaEABPRABabzVyBzs1AA4rFyc4nzU1B3MAX0yggWx8YnY8iUYSFjAAJwrUCvIdABsFADMagFtKMXzhIs6SqRk5Q1VNYz1YAyUSYzMEMIAmc3IkuLi1c08593cFlzig0Nm7P1tVuLmnGKs1Jz9s3M6hQtFqEshmAGEAJQBRAEFkb4AfWQAHkACIg0b6IbTCybchWI6OFybG7uM77cIZRb2RxzFxWKwOKxORJzO4gPKPEQdF70CBvMHfGjfAHA8GQpAgMYTIxcmbJObRdzJbbmOxzGLbTGzbG2I4OfGE4mklEUqkFGnvCpgBRgAByYAA7gJyABlAioI0AMTaAEkSDoAK7yZh2-UABQAqshAe8ABK-fUAcW+UPGMP5iHxUVWdnclm2ajmXmSMslTgRTms7gcuZSjni6oemvY2t18gNxtNFqttoqrQdztdZq9ACEsHbfe7vchw7yplGEOYMuRPMS0oKUyiZQ41tE0oi0usUmsnMXqNSyzq9YaTWJzU6AEatAz11qsZQUGR8WmCUsUcu76sHs3H0-yc-SEjcQaTdRaFyPKRqAMxnA45BxJ45iWC47jeOcVgymEJIuGOkrJsk8YrE47gbve3SPjulZ7jW75nm0zCVNUtQNM0bR3l0TzkE+JEvhgh4nhRDbfr+Cj-iMQHQpMsLDtcSwErscQOFBRLuEhISIBkmbmKsBLuHY4qSUWOSUiWhHmmA9RgHg8gCGgYJGWAlaXuwN7PARzFmlZpnmaglnGZWvGyPxygAf2IGmEp6QqRscE+COFzuMhcFxOQ5hXDJIrnASzhWPhTE0s5xmuWIFlWTZ1E1HUjTyC0DaMVuFDZSZZl5e5BVgN5f5+YJujCXyoGIPBaFpGkcxHKKPhzMh062OYkokkc9jonY2S6SQ6BwMYGoGcU9JMAFIlDvMybkH4iHJLJGkJch2Y2Nsc52FBcxWKpSQZVVjGvBAW2dUFCCEmhqnbPBpLJBkLjIRKvWnCmEoOASUGPQ+jH6qg8gvW9g5dQgeZRNdxIopsLhpXEdjITEcVODBvjrP4bgrC4MMGaxVb7hxtY2vajousjokDe46HHb4BJzCkMrogii52HdKwkvi1O6atzF06Rr7kZ+bTs0OpJCgsCZOANKxbPGMo3Au1gwY4msJuS0v6bLxH0wIKuo5KizbDzdh8wLikIFEc7WPjpLIq4WtS-cm6wzVuUYPlnlgHbH0OFKCKiwskNnH1gTuyhQr47H-PnD4VgpHdNNPNHMzzLd+1a-9OtWCdCkHGE-hc5d6RePj6QkvNmRAA */
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
          type: "DELETE_TODO";
          value: string;
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
            target: "TodosLoading",
          },
        ],
        onError: [
          {
            target: "TodosLoaded",
          },
        ],
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