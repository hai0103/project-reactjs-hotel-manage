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



const { Title,Text } = Typography;
const FormItem = Form.Item;
const { Option } = Select;
const { Column } = Table;

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalAdd: true,
            listTypeRoom: [],

            RoomNo: '',
            RoomName: '',
            NoP: "",
            Price: 0,
            Floor: 0,
            StatusStay: "",
            Status: "",
            TypeRoomName: "",
            TypeRoomID: "",
        }

    }

    componentDidMount() {
        this.getAllTypeRoom();
    }

    getAllTypeRoom() {
        this.setState({ progress: true })
        typeRoomProvider.getAll().then(res => {
            console.log(res)
            if (res.code == 0) {
                this.setState({
                    listTypeRoom: res.data,
                })
            }
            else {
                this.setState({
                    listTypeRoom: []
                })
            }
            this.setState({ progress: false })
        }).catch(e => {
            console.log(e)
            this.setState({ progress: false })
        })
    }

    handleAdd() {
        let {
            RoomNo,
            RoomName,
            NoP,
            Floor,
            StatusStay,
            Status,
            TypeRoomID
        } = this.state;

        let payload = {
            // RoomID: '',
            no: RoomNo,
            name:RoomName,
            nop:NoP,
            numpeople: NoP,
            // Floor,
            status:Status,
            statusStay: StatusStay,
            typeroomId: TypeRoomID
        }

        roomProvider.create(payload).then(res => {
            console.log(res)
            if (res.code == 0) {
                switch (res.code) {
                    case 0:
                        toast.success("Tạo mới Phòng thành công !", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        this.props.loadPage();
                        this.handleClose();
                        break;
                    default:
                        toast.error("Tạo mới Phòng thất bại !", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        break;
                }
            }
        }).catch(e => {
            toast.error("Tạo mới Phòng thất bại !", {
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
                    visible={this.state.showModalAdd}
                    title="Thêm mới phòng"
                    onCancel={() => {
                        this.handleClose()
                        // this.setState({ showModalAdd: false })
                    }
                    }
                    width={'50%'}
                    maskClosable={false}
                    footer={
                        [
                            <Button type="primary" onClick={() => this.handleAdd()
                            }
                            >
                                Lưu
                    </Button>,
                            <Button type="default" onClick={() => {
                                this.handleClose()
                            }}
                            >
                                Đóng
                    </Button>,
                        ]
                    }
                >
                    <Card style={{ padding: 4 }} bordered={false}>
                        <Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Mã phòng</Text>
                                <Input
                                    value={this.state.RoomNo}
                                    placeholder="Nhập mã phòng"
                                    style={{ width: '70%' }}
                                    onChange={(val) => {
                                        this.setState({ RoomNo: val.target.value })
                                    }}
                                />

                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Tên phòng</Text>
                                <Input
                                    value={this.state.RoomName}
                                    placeholder="Nhập tên"
                                    style={{ width: '70%' }}
                                    onChange={(val) => this.setState({ RoomName: val.target.value })}
                                />
                            </Col>
                        </Row>
                        <Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Số người</Text>
                                <Input
                                    value={this.state.NoP}
                                    placeholder="Nhập số người"
                                    style={{ width: '70%' }}
                                    onChange={(val) => this.setState({ NoP: val.target.value })}
                                />
                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Trạng thái ở</Text>
                                <Select
                                    allowClear
                                    value={this.state.StatusStay}
                                    style={{ width: '70%' }}
                                    onChange={(val, e) => {
                                        this.setState({ StatusStay: val })
                                    }}
                                >
                                    <Option value="EMPTY">Trống</Option>
                                    <Option value="USING">Đã có người</Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Tầng</Text>
                                <Input
                                    value={this.state.Floor}
                                    // placeholder="Xác nhận mật khẩu"
                                    style={{ width: '70%' }}
                                    onChange={(val) => this.setState({ Floor: val.target.value })}
                                />
                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Tình trạng phòng</Text>
                                <Select
                                    allowClear
                                    value={this.state.Status}
                                    style={{ width: '70%' }}
                                    onChange={(val, e) => this.setState({ Status: val })}
                                >
                                    <Option value="CLEAN">Sạch</Option>
                                    <Option value="DIRTY">Bẩn</Option>
                                    <Option value="CLEANING">Đang dọn</Option>
                                </Select>
                            </Col>
                        </Row>

                        <Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Loại phòng</Text>
                                <Select
                                    allowClear
                                    value={this.state.TypeRoomID}
                                    style={{ width: '70%' }}
                                    onChange={(val) => {
                                        this.setState({ TypeRoomID: val })
                                    }}
                                >
                                    {this.state.listTypeRoom.map((item, index) =>

                                        <Option value={item.id}>{item.description}</Option>
                                    )}
                                </Select>
                            </Col>
                        </Row>
                    </Card>
                </Modal>

            </div>
        )
    }

}


export default Add
