import { Button, ConfigProvider, Modal } from "antd"
import { useState } from "react";
import { Link } from "react-router-dom"
import { useGetOneMusicQuery } from "../api/music";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause } from "@fortawesome/free-solid-svg-icons";

const ModelDetail = ({ data,index ,onId}: any) => {
    const { data: music, isLoading } = useGetOneMusicQuery(data?.id)
    console.log(music);

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState(data?.name);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
       
            setOpen(false);
         
       
    };

    const handleCancel = () => {
        setOpen(false);
    };
    const onClickButton=()=>{
        onId(index)
    }
    return (
        <>
            <Button className="boxed-btn" style={{ height: '50px', width: '120px' }} onClick={showModal}>Detail</Button>
            <ConfigProvider theme={{
                components: {
                    Modal: {
                        contentBg: '#333333',
                        headerBg:'#333333',
                        titleColor:'white'
                        
                    },
                },
                token:{
                    colorPrimaryBorder: '#990000',
                }
            }}
            >
                <Modal
                    title="Music"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}

                >
                    <p style={{color:'white'}}>{modalText}</p>
                    <div>
                        <Button  style={{ height: '60px', width: '60px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center',backgroundColor: 'red',borderColor: 'red'}} onClick={onClickButton}>
                            <FontAwesomeIcon color='white' icon={faPause} style={{fontSize:'30px'}} />
                        </Button>

                    </div>
                </Modal>
            </ConfigProvider>

          

        </>
    )
}

export default ModelDetail