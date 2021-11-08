import { useState, useEffect, useContext} from 'react';
import "./profile.css";
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import Topbar from '../../components/topbar/Topbar';
import { axiosInstance } from '../../config';
import { useParams } from 'react-router';
import { Loop } from '@mui/icons-material';
import { AuthContext } from '../../context/authContext';


function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const username = useParams().username;
    const [user, setUser] = useState([]);
    const [profilePic, setProfilePic] = useState("");
    const [coverPic, setCoverPic] = useState();
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axiosInstance.get(`/users?username=${username}`)
            setUser(res.data);
        }
        fetchUser();
    }, [username]);

    const coverLink = 'https://www.ford.com/cmslibs/content/dam/vdm_ford/live/en_us/ford/nameplate/mustang/2021/collections/3_2/20_FRD_MST_40696_GT_169.jpg/_jcr_content/renditions/cq5dam.web.1440.1440.jpeg';

    return (
        <div>
        <Topbar />
        <div className="profile">
            <Sidebar />
            <div className="profileRight">
            {
              user.username ?
             ( <>
                <div className="profileRightTop">
                    <div className="profileCover">
                        <div className='updateCover'>
                            <img
                                src={
                                    coverPic
                                        ? URL.createObjectURL(coverPic)
                                        : user.coverPicture || coverLink
                                    }
                                className="profileCoverImg"
                                alt=""
                            />
                            {currentUser.username === user.username &&
                                (<>
                                    <label htmlFor='coverPicInput'>
                                        <Loop className='coverPicIcon'/>
                                    </label>
                                    <input
                                        type="file"
                                        id="coverPicInput"
                                        style={{display: 'none'}}
                                        onChange={(e) => setCoverPic(e.target.files[0])}
                                    />
                                </>)
                            }
                        </div>
                        <div className='updateProfile'>
                            <img
                                src={ 
                                    profilePic
                                        ? URL.createObjectURL(profilePic)
                                        : user.profilePicture || `${PF}person/noAvatar.png`
                                }
                                className="profileUserImg"
                                alt=""
                            />
                            { currentUser.username === user.username &&
                            (<>
                                <label htmlFor='profilePicInput'>
                                    <Loop className='profilePicIcon'/>
                                </label>
                                <input
                                    type="file"
                                    id="profilePicInput"
                                    style={{display: 'none'}}
                                    onChange={(e) => setProfilePic(e.target.files[0])}
                                />
                                </>)
                            }
                        </div>
                    </div>
                    <div className="profileInfo">
                        <h4>{user.username}</h4>
                        <span>{user.desc}</span>
                    </div>
                </div>
                    <div className="profileRightbottom">
                        <Feed username={username}/>
                        <Rightbar user={user}/>
                    </div>
                </>
                ) : (
                    <div className='noUserWrapper'>
                        <h1 className='noUserText'>No User Found!</h1>
                    </div>
                )}
                </div>
            </div>
        </div>
    )
}

export default Profile;
