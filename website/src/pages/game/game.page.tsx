import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Board from "../../components/board/board.component";
import Controls from "../../components/controls/controls.component";
import Menu from "../../components/menu/menu.component";
import { wsClient } from "../../socket/socket";
import { updatePosition } from "../../state/game/game.slice";

export default function Game() {
    const dispatch = useDispatch();

    useEffect(() => {
        wsClient.onmessage = (message) => {
            dispatch(updatePosition(JSON.parse(message.data.toString()).fen))
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div>
            <div className="flex justify-center">
                <Menu />
            </div>
            <Board />
            <div className="flex justify-center">
                <Controls />
            </div>
        </div>
    );
}