
import { useState } from 'react'
import './index.css'
import { useSignupMutation } from '../../api/auth'
import { Button, message } from 'antd';
import { pause } from '../../util/pause';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
const Register = () => {
    const [email, setemai] = useState([])
    const [pass, setpass] = useState([])
    const [name, setname] = useState([])
    const [messageApi, contextHolder] = message.useMessage()
    const [register, { isLoading: loginLoading }] = useSignupMutation()
    const navigate = useNavigate()
    const onSubmit = async (e: any) => {
        e.preventDefault()
        register({ email: email, password: pass, name: name, address: '', image: '' })
            .unwrap()
            .then(async () => {
                messageApi.open({
                    type: 'success',
                    content: 'Bạn đã đăng ký thành công!'
                })
                await pause(2000)
                navigate('/login')
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
                    <h1 style={{ color: 'white', fontWeight: 'bold', fontSize: '50px' }}>Register</h1>
                    <form className="form" onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="name"> Name</label>
                            <input type="text" id="email" name="email" onChange={(e: any) => setname(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email"> Email</label>
                            <input type="text" id="email" name="email" onChange={(e: any) => setemai(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password"> Password</label>
                            <input type="password" id="email" name="email" onChange={(e: any) => setpass(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Confirm Password</label>
                            <input type="password" id="email" name="email" />
                        </div>
                        <Button className="form-submit-btn" style={{ paddingBottom: '30px' }} onClick={(e: any) => onSubmit(e)}>
                            {loginLoading ? 'Đang đăng ký ...' : 'Đăng ký'}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register