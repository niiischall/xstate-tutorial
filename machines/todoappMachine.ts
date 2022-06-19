import { createMachine } from 'xstate';

export const todoMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FWwLIEMDGAFgJYB2YAdGhrADKo4SlQDENA8gIIAiAkgHIBxAPoBlAKoBhCQFERIxKAAOmIgBciqEgpAAPRABYAjOQDsAJhPmAHJYAMJwwDYArPoA0IAJ6JHxk46tHWwBmWzCzKytnKwBfGI8qTFxCUgpE2npGEhZ2bn5hADEOHhoxACVpbWVYNQ0tJF1EAFozIPJDfWDfGyszfUdfD28EX1MAx07W2wBOfWcTfTj4kBJ0OG105OIySnRMOgYmKpV1TW09BCbDWzNyAOdp4KfLUJt3L2bDM2d2h+mg1qGL6GOIJPbYfDbNLgg4QSDHGqneqgC6GYLTO6GEzBZyOCytBYmKxDRBYqzkMz-ULTGZ4kK2RygkCbSGpXbUPioVSw+ENaq1M4NC5NUKOX7TBwdZw3B4mZwkhBkilU-SPXGBG5mJkslJkBEC5GNS5PWziyVzGUS+UfS6Gabkwx-aJhFx9LVLIA */
    createMachine({
        id: "TodosMachine",
        initial: "TodosLoading",
        schema: {
            events: {} as
                | { type: "LOADING_SUCCESS", todos: string[] }
                | { type: "LOADING_FAILURE", errorMessage: string }
        },
        tsTypes: {} as import('./todoappMachine.typegen').Typegen0,
        states: {
            TodosLoading: {
                on: {
                    LOADING_SUCCESS: {
                        target: "TodosLoaded",
                        actions: 'consoleTodos'
                    },
                    LOADING_FAILURE: {
                        target: "TodosNotLoaded",
                    },
                },
            },
            TodosLoaded: {},
            TodosNotLoaded: {},
        },
    }, {
        actions: {
          consoleTodos: (context, event) => {
            alert(event.todos);
          }
        }
    });