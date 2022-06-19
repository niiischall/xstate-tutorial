import { createMachine } from 'xstate';

export const myMachine = createMachine({
    initial: "Not Hovered",
    states: {
        "Not Hovered": {
            on: {
                HOVER_ON: {
                    target: 'Hovered'
                }
            }
        },
        Hovered: {
            on: {
                HOVER_OFF: {
                    target: 'Not Hovered',
                }
            }
        }
    }
})