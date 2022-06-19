import { createMachine, assign } from 'xstate';

export const todoMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FWwLIEMDGAFgJYB2YAdGhrADKo4SlQDEGZ5pAbqgNYVWZchUv3SY6DJgi6o8OAC5FUJANoAGALqJQAB0xFFy7SAAeiAIwBOACzlrAVgAcAZnsAmS1fNr7AdjcANCAAnogAtPbOtubm1pYAbJZqzuZujvHOAL6ZQQLY+MTseRKMJCxgAE4VqBXkOgA2CgBmNQC2lGL5wkWdJVIycoaqmsZ6sAZKJMZmCGHejuRp5k5qPmre1taBIeGR0curlh5W1lHZuZ1ChaLUJZDMAMIASgCiAILILwD6yADyACK-Ub6IbTCwZRZueLJSxJaF+XzWIKhBAOczkNSbZaOayYjKWXznEB5K4iDq3egQe7-F40F6fH4AoFIEBjCZGFkzayONTkZy+RyWZzxRyI+IxNy+ZEWNy2RxOYWOQWYqLrIkkgpkh4VMAKMAAOTAAHcBOQAMoEVBGgBibQAkiQdABXeTMO36gAKAFVkF8HgAJN76gDiL2B41BnIsPnI5niTi8alFW0c2xRoucdn86Xjvnikvs5nVl017G1uvkBuNpotVttFVaDudrrNXoAQlg7b73d7kOH2VMowhnDzFhlrCKCWpEW5nNKEHneUk0pjfOZfPYbPFi9RSWWdXrDSaxOanQAjVoGeutVjKCgyPjkwSlijlw-Vk9m8+X+TX6QkbhBkmdQtBZNlI1AGZ4gccgEncYVLD8HlLHnMJoN5XxLEFWFliSJNrB3Z9ulfA9KyPGtvyvNpmEqapagaZo2ifLprnIN8yI-DBTwvKiG3-QCFGAkYwJBSYwWHNdyB5Fx7AyAVljzedHHMTMRyhTZ1lSJM3EIliyTNMB6jAPB5AENB-kMsBK1vdgHxuIjWIMoyTLM1ALKMyt+NkQTlBA-sINMCw41sWTN2cNw3HMVNvHsVD4kRWC3DULC0hcDddL3CgnOM0yxHMyzrNomo6kaeQWgbZjMvNSyXLytyCrALygN84TdFEjlIKC2S+QFXFrCseKhXnZZMx5VZoP5DxELUHScmJEtiPIdyrLAAQXiqGpmDND0Xhef4vi9D1-LEoc0oxDcoisTDNzcWKdlmcLeXiaC4lXTFEKyOaNUW5bKzWjaKmYExYHkPVyBwJpKwqAAKW7VgASmYb7WN+1axHWujjo6wKECOXw+X5IVEW8KKhvusJnCSchfHembIo2VJsjmkh0DgYxkbJYpKSYLHB062Z1zcchc3sTFYh8KLktQ7wEvi+EUjidIEgyl9mLuCBefE2IFmUrCYqsQstjulEwiS-HU3GqL8yhWICK+hbWLyfVUHkdXNaHOZYlg-llP6tQRRxKx52cJcBRkhVRURLCVcW9iq2PLjaxte1HRdd3+Y2RYkjS-MUme+wkXujdbFxJZUgnfr4xj1i4-Iz9KN-Np05x-N4mFyKNIRSI00QbNYJm1NYV8XxwuFautVI+OBGbmZRw8JN+VzuN40LlF43sfu0jXGbElk8f2Gy2qMHyjywBnoLKeF4Vbu1pLVilcn8yklJUlTYuRVC-eKFR-7MZEiMTr8ySOiGI7h5TPSFKmRww1nrU1hFhPCotNiOC-ufAWCRhZ+CQeLQsyFpaxHxnLTEhZhTrlOEzTIQA */
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
        }
      | {
          type: "SPEED_UP";
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
            actions: "assignErrorToContext",
            target: "DeleteTodoError",
          },
        ],
      },
    },
    DeleteTodoError: {
      after: {
        "2500": {
          target: "TodosLoaded",
        },
      },
      on: {
        SPEED_UP: {
          target: "TodosLoaded",
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