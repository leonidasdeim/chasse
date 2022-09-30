import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Orientation, START_POSITION } from '../../utilities/chess.utility';
import { peek, push, removeLast } from '../../utilities/stack.utility';
import { getWindowProperties, WindowProperties } from '../../utilities/window.utility';
import { RootState } from '../store';

export type MoveItem = {
    position: string
    sessionId: string
}
interface GameState {
    gameFen: string,
    history: string[],
    boardOrientation: Orientation,
    windowProperties: WindowProperties,
    sessionId: string,
    loading: boolean
}

const initialState: GameState = {
    gameFen: START_POSITION,
    history: [START_POSITION],
    boardOrientation: Orientation.white,
    windowProperties: getWindowProperties(),
    sessionId: 'a88f494f-50f5-475e-98cf-2b0d9e2f05f4',
    loading: false
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        makeMove(state, _: PayloadAction<MoveItem>) {
            state.loading = true;
        },
        makeMoveSuccessful(state, _: PayloadAction<MoveItem>) {
            state.loading = false;
            // let newPosition = action.payload.position;
            // state.gameFen = newPosition;
            // if (newPosition !== peek(state.history)) {
            //     state.history = push(state.history, newPosition)
            // }
        },
        historyPop(state) {
            state.history = removeLast(state.history);
        },
        updatePosition(state, action: PayloadAction<string>) {
            state.gameFen = action.payload;
            if (action.payload !== peek(state.history)) {
                state.history = push(state.history, action.payload)
            }
        },
        reverseBoard(state) {
            state.boardOrientation =
                (state.boardOrientation === Orientation.white) ? Orientation.black : Orientation.white;
        },
        updateWindowProperties(state) {
            state.windowProperties = getWindowProperties();
        },
    },
});

export const {
    makeMove,
    reverseBoard,
    updateWindowProperties,
    updatePosition,
    historyPop,
    makeMoveSuccessful } = gameSlice.actions;

export const selectGameFen = (state: RootState) => state.game.gameFen
export const selectBoardOrientation = (state: RootState) => state.game.boardOrientation;
export const selectWindowMinDimension = (state: RootState) => state.game.windowProperties.minDimension;
export const selectWindowPosition = (state: RootState) => state.game.windowProperties.position;
export const selectSessionId = (state: RootState) => state.game.sessionId;
export const selectHistory = (state: RootState) => state.game.history;

export default gameSlice.reducer;