import React, { useState } from "react";

class Users extends React.Component{
    constructor(props){
        super(props);
        this.state  = {
            player1: this.props.player1,
            player2: this.props.player2
        }
    }

    render() {
        const {player1, player2} = this.state;
        return (
            <div className="players">
                <div className="player1">
                    You <br/>{player1}
                </div>
                <div className="player2">
                    Your friend <br/> {player2}
                </div>
                <div className="button">
                    play a game button here
                </div>
            </div>
        )
    }
}
export default Users;
