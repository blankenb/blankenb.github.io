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
                    <b>User 1</b>
                    <br/>
                    {player1}
                </div>
                <div className="player2">
                    <b>User 2</b>
                    <br/>
                    {player2}
                </div>
                <button className="play_button">
                    Play
                </button>
            </div>
        )
    }
}
export default Users;