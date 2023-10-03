
import { useState } from 'react'
import './index.css'
import { useSigninMutation } from '../../api/auth'
import { Button, message } from 'antd';
import { pause } from '../../util/pause';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
const Login = () => {
    const [email, setemai] = useState([])
    const [pass, setpass] = useState([])
    const [messageApi, contextHolder] = message.useMessage()
    const [login, { isLoading: loginLoading }] = useSigninMutation()
    const navigate = useNavigate()
    const onSubmit = async (e: any) => {
        e.preventDefault()
        login({ email: email, password: pass })
            .unwrap()
            .then(async (user) => {
                messageApi.open({
                    type: 'success',
                    content: 'Bạn đã đăng nhập thành công!'
                })
                localStorage.setItem('user', JSON.stringify(user))
                if (user?.user.role == 'admin') {
                    await pause(1000)
                    navigate('/admin')
                } else if (user?.user.role == 'member') {
                    await pause(1000)
                    navigate('/')
                }
            })
            .catch(error => {
                messageApi.open({
                    type: 'error',
                    content: error.data
                })
            })
    }
    return (
        <>
            {contextHolder}
            <div style={{
                width: '100%', height: '100vh', backgroundColor: 'black', display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Button style={{ marginTop: '-810px', marginLeft: '40px', color: 'black', backgroundColor: 'red', border: 'none' }}><Link to="/"><FontAwesomeIcon icon={faTimes} /></Link></Button>
                <div className="form-container" style={{ width: '30%', margin: '0 auto' }}>
                    <h1 style={{ color: 'white', fontWeight: 'bold', fontSize: '50px' }}>Login</h1>
                    <form className="form" onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="email"> Email</label>
                            <input type="text" id="email" name="email" onChange={(e: any) => setemai(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password"> Password</label>
                            <input type="text" id="email" name="email" onChange={(e: any) => setpass(e.target.value)} />
                        </div>
                        <p>Hãy Đăng Nhập Tài Khoản Admin Để Thêm Bài Hát Mới</p>
                        <Button className="form-submit-btn" style={{ paddingBottom: '30px' }} onClick={(e: any) => onSubmit(e)}>
                            {loginLoading ? 'Đang đăng nhập ...' : 'Đăng nhập'}
                        </Button>
                          <button><a href="admin">admin</a></button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default Login
