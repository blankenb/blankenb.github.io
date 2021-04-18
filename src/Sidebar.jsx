import React, { useState } from "react";

class Sidebar extends React.Component{
    constructor(props){
        super(props);
    }

    resetPlaylist = () => {
        this.props.setPlaylists(null, null);
    }

    render() {
        return (
            <div className="sidebar">
                <div className="top">
                    <h1>Library Linker</h1>
                    <div className="playlists">
                        <div className="playlists-header">
                            <h2>Playlists</h2>
                            <button className="text" onClick={this.resetPlaylist}>Change</button>
                        </div>
                        <div className="playlist">
                            <div className="playlist-name">{this.props.player1}</div>
                            <div className="playlist-owner">Owned by <b>Nick</b></div>
                        </div>
                        <div className="playlist">
                            <div className="playlist-name">{this.props.player2}</div>
                            <div className="playlist-owner">Owned by <b>Beau</b></div>
                        </div>
                    </div>
                </div>
                {/* <div className="bottom">
                    <button className="pill">Play a Game</button>
                </div> */}
            </div>
        )
    }
}
export default Sidebar;