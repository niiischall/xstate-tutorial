import type { NextPage } from 'next'
import { useMachine } from '@xstate/react';

import { todoMachine } from '../machines/todoappMachine';

const Home: NextPage = () => {
  const [state, send] = useMachine(todoMachine);

  const value = JSON.stringify(state.value);
  return (
    <div>
      <h1>{value}</h1>
      <button onClick={() => {
        send({
          type: "LOADING_SUCCESS",
          todos: ['take bins out']
        })
      }}>Load Success</button>
      <button onClick={() => {
        send({
          type: "LOADING_FAILURE",
          errorMessage: 'Oh no!'
        })
      }}>Load Failure</button>
    </div>
  )
}

export default Home
