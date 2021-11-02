import { useContext, useState, useRef } from 'react';
import './share.css';
import { EmojiEmotions, Label, PermMedia, Room, Cancel } from '@mui/icons-material';
import { AuthContext } from '../../context/authContext';
import axios from 'axios';

function Share() {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const desc = useRef();
    const [file, setFile] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {       //User data
            userId: user._id,
            desc: desc.current.value,
        }
        if (file) {
            const data = new FormData();      //Creating a file
            const fileName = `${new Date().getFullYear()}_${new Date().getMonth()}-${new Date().getDay()}_${new Date().getDay()}-${new Date().getHours()}_${new Date().getMinutes()}-${file.name}`
            data.append("file", file);
            data.append("name", fileName);
            newPost.img = fileName;
            try {
                await axios.post("/upload/", data);   //Uploading the file
            }catch(err) {
                console.log(err);
            }
        }
        try {
            await axios.post("/posts/", newPost);  // Create a new post
            window.location.reload();
        }catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        src={
                            !user.profilePicture
                                ? `${PF}person/noAvatar.png`
                                : user.profilePicture
                            }
                        alt=""
                    />
                    <input
                        placeholder={`What's on your mind ${user.username}?` }
                        className="shareInput"
                        ref={desc}
                    />
                </div>
                <hr/>
                {file && (
                    <div className="shareImgContainer">           // createObjectURL: Creates a pseudo url for a file
                        <img className='shareImg' src={URL.createObjectURL(file)} alt=""/>
                        <Cancel className='cancelShareImg' onClick={() => setFile("")}/>
                    </div>
                )}
                <form className="shareBottom" onSubmit={handleSubmit}>
                    <div className="shareOptions">
                        <label for="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon"/>
                            <span>Photo or Video</span>
                            <input
                                style={{ display: 'none' }}
                                type="file" id="file"
                                accept='.png, .jpg, .jpeg'
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span>Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon"/>
                            <span>Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                            <span>Feelings</span>
                        </div>
                    </div>
                    <button type='submit'>Share</button>
                </form>
            </div>
        </div>
    )
}

export default Share;
