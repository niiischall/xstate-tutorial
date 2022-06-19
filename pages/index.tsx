import type { NextPage } from 'next'
import { useMachine } from '@xstate/react';

import { todoMachine } from '../machines/todoappMachine';

const todos = new Set<string>(["Take bins out", "Do laundry"]);

const Home: NextPage = () => {

  const [state, send] = useMachine(todoMachine, {
    services: {
      loadTodos: async () => {
        return Array.from(todos)
      },
      saveTodos: async (context, event) => {
        todos.add(context.formInput);
      },
      deleteTodo: async (context, event) => {
        todos.delete(event.value);
      }
    }
  });

  const value = JSON.stringify(state.value);
  const context = JSON.stringify(state.context);

  return (
    <div>
      <h1><pre>{value}</pre></h1>
      <h1><pre>{context}</pre></h1>
      <div>
        {
          state.matches('TodosLoaded') && <button onClick={() => {
            send({
              type: 'CREATE_TODO'
            })
          }}>CREATE NEW</button>
        }
        {
          state.matches('TodosLoaded') && state.context.todos.map((todo) => {
            return (
              <div key={todo}>
                <p>{todo}</p>
                <button onClick={() => {
                  send({ 
                    type: 'DELETE_TODO',
                    value: todo 
                  })
                }}>X</button>
              </div>
            )
          })
        }
        {
          state.matches('CreateNewTodo') && (
            <form onSubmit={(event) => {
              event.preventDefault();
              send({
                type: "SUBMIT_INPUT"
              })
            }}>
              <input onChange={(event) => {
                send({
                  type: 'INPUT_CHANGE',
                  value: event.target.value,
                })
              }}
              />
            </form>
          )}
      </div>
    </div>
  )
}

export default Home
