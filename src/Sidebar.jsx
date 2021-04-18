import React from "react";

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
                            <div className="playlist-name">{this.props.playlist1.name}</div>
                            <div className="playlist-owner">Owned by <b>{this.props.playlist1.owner.display_name}</b></div>
                        </div>
                        <div className="playlist">
                            <div className="playlist-name">{this.props.playlist2.name}</div>
                            <div className="playlist-owner">Owned by <b>{this.props.playlist2.owner.display_name}</b></div>
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