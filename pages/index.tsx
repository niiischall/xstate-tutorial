import type { NextPage } from 'next'
import { useMachine } from '@xstate/react';

import { myMachine } from '../machines/myFirstMachine';

const Home: NextPage = () => {
  const [state, send] = useMachine(myMachine);

  const value = JSON.stringify(state.value);
  return (
    <div>
      <h1>{value}</h1>
      <button onClick={() => send("HOVER_ON")}>HOVER IN</button>
      <button onClick={() => send("HOVER_OFF")}>HOVER OUT</button>
    </div>
  )
}

export default Home
