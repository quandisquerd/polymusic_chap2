import { Button, ConfigProvider, Modal } from "antd"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

const ModelDetail = ({ data, index, isCurrentPlaying, isPlaying, currentPlayingIndex, onIndex }: any) => {
    const togglePlay = (index: any) => {
        onIndex(index)
    }
    const [open, setOpen] = useState(false);
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
    return (
        <>
            <Button className="boxed-btn" style={{ height: '50px', width: '120px' }} onClick={showModal}>Detail</Button>
            <ConfigProvider theme={{
                components: {
                    Modal: {
                        contentBg: '#333333',
                        headerBg: '#333333',
                        titleColor: 'white'

                    },
                },
                token: {
                    colorPrimaryBorder: '#990000',
                }
            }}
            >
                <Modal
                    title="Music"
                    open={open}
                    onOk={handleOk}
                    onCancel={handleCancel}

                >
                    <p style={{ color: 'white' }}>{modalText}</p>
                    <div>
                        <Button className="boxed-btn" style={{ height: '50px', width: '120px', backgroundColor: currentPlayingIndex === index && isPlaying ? 'red' : 'white' }} onClick={() => togglePlay(index)}>
                            {isCurrentPlaying && isPlaying ? <FontAwesomeIcon color='white' icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                        </Button>

                    </div>
                </Modal>
            </ConfigProvider>



        </>
    )
}

export default ModelDetail