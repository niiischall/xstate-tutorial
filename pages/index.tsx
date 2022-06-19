import type { NextPage } from 'next'
import { useMachine } from '@xstate/react';

import { todoMachine } from '../machines/todoappMachine';

const Home: NextPage = () => {
  const [state, send] = useMachine(todoMachine);

  const value = JSON.stringify(state.value);
  return (
    <div>
      <h1>{value}</h1>
      <button onClick={() => send("LOADING_SUCCESS")}>Load Success</button>
      <button onClick={() => send("LOADING_FAILURE")}>Load Failure</button>
    </div>
  )
}

export default Home
