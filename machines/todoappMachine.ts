import { createMachine, assign } from 'xstate';

export const todoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FWwLIEMDGAFgJYB2YAdGhrADKo4SlQDEGZ5pAbqgNYVWZchUv3SY6DJgi6o8OAC5FUJANoAGALqJQAB0xFFy7SAAeiAEwB2AIzkAHADYAnOYDMdl+bVrzAFksANCAAnogAtL7mtg6uTgCsTq4Ovq5+fgC+6UEC2PjE7DkSjCQsYABOZahl5DoANgoAZlUAtpRiucIF7UVSMnKGqprGerAGSiTGZghhrpbk1n4JHnFJceZO1kGh01bm5L7Wlmpx1gmWlk4OlpnZ7UL5otRFkMwAwgBKAKIAgsifAPrIADyABEgcN9ANJhZ4vsjnYFq5rL47HFnIEQuFTnFyM47HYkStLL5fHEEjcQDl7iJyK8ymAFGAAHJgADuAnIAGUCKhWQAxFoASRIOgArvJmIKmQAFACqyH+rwAEt8mQBxT4Q0ZQpCmcJOchqc6pRxqfFXOykraIaxOA0nFa+JwohyWtYUql5Gl0hnyZlsjnc3kCsrNYViiWc2UAISwgoVUrlyC1YyMuqm5gcDkNXlSCxW1iRV2tCEc5Gdazslgc5gRySzHruXvYPsZLPZYi5ooARs0DCHmqxlBQZHw2tRqS36W2A53OT2+-IB9ISNx+uN1FpdSNUxN04ga2pyFFInYjXZzJmkiWwmS7LifGTTk6FgtGxPmxRW3724GF-2WmYcpKmqOpGhacdBE-Wlpx-WcMC7XsANDFc1wUDchm3SFxmhBBzDiOY0TWM0s2OfwS0LA1IhOTMXEOSwEWuCkSHQOBjE9TpHnEehiigFMdVAKYwisXxyGJRJ1niNRSQvG8EiPBxH0zV1vEOd8oM4yDaB4yB+Jw-c8IRQ1kjiU8UhOXw1AcG98Kow5jgRKzrFdS11I6B4tKZVB5GeCA9LTQTwhSMSz1RS58SSEkSRvSj9iiZFawLBi3MnL9YP9DsEKDfkhRFcV-L3QLpgNeI3GsbxnSiwsSzPfZSXWA40ScRwVhS6Dvwyv8kKXFoCtwmjyFmC8XDCujXBLUzy1JJFayrDxXDiRw2s0jrfzEPqDJmVxyzWJEKqig5xsxaZrHvMiGNzNZSUW5aHg2orhOasSnVSO04mkxbzBvLNtsU-CrIIqwSMyTIgA */
  createMachine({
  context: {
    todos: [] as string[],
    formInput: "",
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
  },
},
    {
      actions: {
        assignTodosToContext: assign((context, event) => {
          return {
            todos: event.data,
            formInput: ""
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
        })
      }
    });