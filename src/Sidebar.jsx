import React, { useState } from "react";

class Sidebar extends React.Component{
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
            <div className="sidebar">
                <div className="top">
                    <h1>Library Linker</h1>
                    <div className="playlists">
                        <h2>Playlists</h2>
                        <div className="playlist">
                            <div className="playlist-name">
                                <span>{player1}</span>
                                <button className="text">Change</button>
                            </div>
                            <div className="playlist-owner">Owned by <b>Nick</b></div>
                        </div>
                        <div className="playlist">
                            <div className="playlist-name">
                                <span>{player2}</span>
                                <button className="text">Change</button>
                            </div>
                            <div className="playlist-owner">Owned by <b>Beau</b></div>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <button className="pill">Play a Game</button>
                </div>
            </div>
        )
    }
}
export default Sidebar;