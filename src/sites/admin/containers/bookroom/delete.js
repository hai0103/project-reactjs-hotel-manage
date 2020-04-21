import React, { Component } from 'react';
import typeRoomProvider from '../../../../data-access/typeroom-provider';
import roomProvider from '../../../../data-access/room-provider';

import {
    Button,
    Typography,
    Col,
    Row,
    Table,
    Form,
    Input,
    Select,
    Card,
    Modal
} from 'antd';
import { toast } from 'react-toastify';



const { Title } = Typography;
const FormItem = Form.Item;
const { Option } = Select;
const { Column } = Table;

class Delete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalDelete: true,

            listBookRoomDelete: this.props.listBookRoom ? this.props.listBookRoom : []
        }

    }

    componentDidMount() {

    }


    handleDelete() {
        let {
            listBookRoomDelete
        } = this.state;

        let listId = [];
        listBookRoomDelete.map(v => listId.push(v.BookRoomID));

        let payload = listId;

        roomProvider.delete(payload).then(res => {
            console.log(res)
            if (res.code == 0) {
                switch (res.code) {
                    case 0:
                        toast.success("Đã xóa thành công !", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        this.props.loadPage();
                        this.handleClose();
                        break;
                    default:
                        toast.error("Xóa thất bại !", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        break;
                }
            }
        }).catch(e => {
            toast.error("Xóa thất bại !", {
                position: toast.POSITION.TOP_RIGHT
            });
        })

    }


    handleClose() {
        this.props.closeModal();
    }

    render() {
        return (
            <div>
                <Modal
                    visible={this.state.showModalDelete}
                    title="Xác nhận xóa"
                    onCancel={() => {
                        this.handleClose()
                        // this.setState({ showModalAdd: false })
                    }
                    }
                    width={'50%'}
                    maskClosable={false}
                    footer={
                        [

                            <Button type="danger" onClick={() => this.handleDelete()
                            }
                            >
                                Xóa
                            </Button>,
                            <Button type="default" onClick={() => {
                                this.handleClose()
                            }}
                            >
                                Hủy
                            </Button>,
                        ]
                    }
                >
                    <Card style={{ padding: 4 }} bordered={false}>
                        <Typography >Bạn có chắc muốn xóa :</Typography>
                        {this.state.listBookRoomDelete.map(v => <Typography >{v.BookRoomNo}</Typography>)}
                    </Card>
                </Modal>

            </div>
        )
    }

}


export default Delete
