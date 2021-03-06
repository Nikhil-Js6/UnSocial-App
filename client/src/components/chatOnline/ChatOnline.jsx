import './chatOnline.css';

export default function ChatOnline() {
    return (
        <div className='chatOnline'>
            <div className='chatOnlineFriend'>
                <div className='onlineImgWrapper'>
                    <img className='chatOnlineUserImg' src="https://wallpaperaccess.com/full/945376.jpg" alt=""/>
                    <span className='chatOnilneBadge'></span>
                </div>
                <span className='chatOnlineUsername'>Jenny</span>
            </div>
            <div className='chatOnlineFriend'>
                <div className='onlineImgWrapper'>
                    <img className='chatOnlineUserImg' src="https://wallpaperaccess.com/full/945376.jpg" alt=""/>
                    <span className='chatOnilneBadge'></span>
                </div>
                <span className='chatOnlineUsername'>Zoe</span>
            </div>
            <div className='chatOnlineFriend'>
                <div className='onlineImgWrapper'>
                    <img className='chatOnlineUserImg' src="https://wallpaperaccess.com/full/945376.jpg" alt=""/>
                    <span className='chatOnilneBadge'></span>
                </div>
                <span className='chatOnlineUsername'>Olly</span>
            </div>
            <div className='chatOnlineFriend'>
                <div className='onlineImgWrapper'>
                    <img className='chatOnlineUserImg' src="https://wallpaperaccess.com/full/945376.jpg" alt=""/>
                    <span className='chatOnilneBadge'></span>
                </div>
                <span className='chatOnlineUsername'>User</span>
            </div>
        </div>
    )
}
