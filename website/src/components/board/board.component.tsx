import { Chess, Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import { customPieces } from "../../utilities/chess.utility";
import { useDispatch, useSelector } from "react-redux";
import { makeMove, selectBoardOrientation, selectGameFen, selectWindowMinDimension } from "../../state/game/game.slice";
import { SendWebsocketJoinRoom, SendWebsocketMove } from "../../socket/socket";
import { useEffect } from "react";


export default function Board(props: any) {
    const dispatch = useDispatch();
    const game = useSelector(selectGameFen);
    const boardOrientation = useSelector(selectBoardOrientation);
    const windowMinDimensions = useSelector(selectWindowMinDimension);

    useEffect(() => {
        SendWebsocketJoinRoom('a2e5b7a2-7a01-416a-be9a-40dd25bd0c7b')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function onDrop(sourceSquare: Square, targetSquare: Square) {
        // dispatch(makeMove({
        //     from: sourceSquare,
        //     to: targetSquare,
        //     promotion: 'q'
        // }))

        const chess = new Chess()
        chess.load(game)
        chess.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q'
        })

        SendWebsocketMove({
            sessionId: 'a2e5b7a2-7a01-416a-be9a-40dd25bd0c7b',
            fen: chess.fen()
        })

        return true;
    }

    return (
        <div className="border-8 border-solid border-yellow">
            <Chessboard
                position={game}
                onPieceDrop={onDrop}
                boardOrientation={boardOrientation}
                boardWidth={windowMinDimensions * 0.8}
                customDarkSquareStyle={{ backgroundColor: '' }}
                customPieces={customPieces()}
            />
        </div>
    );
}
