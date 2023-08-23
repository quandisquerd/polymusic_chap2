import { Button, message } from 'antd';
import { useNavigate } from "react-router-dom"
import { pause } from '../util/pause';

const Profile = () => {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage()
    const logout = async () => {
        localStorage.removeItem('user')
        messageApi.open({
            type: 'success',
            content: 'Bạn đã đăng xuất thành công!'
        })
        await pause(2000)
        navigate('/login')
    }
    return (
        <>
        {contextHolder}
        <h1>dfdsfad</h1>
            <Button onClick={() => logout()} style={{ padding: '300px' }}>Đăng xuất</Button>
        </>
    )
}

export default Profile