import React, { Component } from 'react';
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
import typeroomProvider from '../../../../data-access/typeroom-provider';



const { Title, Text } = Typography;
const FormItem = Form.Item;
const { Option } = Select;
const { Column } = Table;

class Update extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalDetail: true,
            typeRoom: {},
            listTypeRoom: [],
            TypeRoomID: '',
            price: '',
            status: '',
            statusStay: '',
            listRoom: this.props.listRoom ? this.props.listRoom : []
        }

    }

    componentDidMount() {
        this.setState({
            price: this.props.listRoom[0].Price,
            status: this.props.listRoom[0].Status,
            statusStay: this.props.listRoom[0].StatusStay,
        });
        this.getTypeRoomById();
        this.getAllTypeRoom();
    }

    getTypeRoomById() {
        let id = this.props.listRoom[0].TypeRoomID;
        typeroomProvider.getDetail(id).then(res => {
            this.setState({
                typeRoom: res.data,
                TypeRoomID: res.data.TypeRoomID
            })
        }).catch(e => {
            console.log(e)
        })

    }

    getAllTypeRoom() {
        this.setState({ progress: true })
        typeroomProvider.getAll().then(res => {
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

    handleUpdate() {

    }

    handleClose() {
        this.props.closeModal();
    }

    render() {
        return (
            <div>
                <Modal
                    visible={this.state.showModalDetail}
                    title="Chi tiết phòng"
                    onCancel={() => {
                        this.handleClose()
                    }
                    }
                    width={'50%'}
                    maskClosable={false}
                    footer={
                        [
                            <Button type="primary" onClick={() => {
                                this.handleUpdate();
                            }}
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
                                    value={this.props.listRoom[0].RoomNo}
                                    style={{ width: '70%' }}
                                    disabled
                                />
                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Tên phòng</Text>
                                <Input
                                    value={this.props.listRoom[0].RoomName}
                                    style={{ width: '70%' }}
                                    disabled
                                />
                            </Col>
                        </Row>
                        <Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong={true} style={{ margin: '8px 0px', width: 130 }}>Số người</Text>
                                <Input
                                    value={this.props.listRoom[0].NoP}
                                    style={{ width: '70%' }}
                                    disabled
                                />
                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Giá</Text>
                                <Input
                                    value={this.state.price}
                                    style={{ width: '60%' }}
                                    onChange={(val) => {
                                        this.setState({ price: val.target.value })
                                    }}
                                />
                                <Text style={{ margin: '8px 2px' }}>VNĐ</Text>
                            </Col>
                        </Row>
                        <Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong={true} style={{ margin: '8px 0px', width: 130 }}>Tầng</Text>
                                <Input
                                    value={this.props.listRoom[0].Floor}
                                    style={{ width: '70%' }}
                                    disabled
                                />
                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Loại phòng</Text>
                                {/* <Text style={{ margin: '8px 0px', width: 130 }}>{this.state.typeRoom.TypeRoomName}</Text> */}
                                <Select
                                    allowClear
                                    value={this.state.TypeRoomID}
                                    style={{ width: '70%' }}
                                    onChange={(val) => {
                                        this.setState({ TypeRoomID: val })
                                    }}
                                >
                                    {this.state.listTypeRoom.map((item, index) =>

                                        <Option value={item.TypeRoomID}>{item.TypeRoomName}</Option>
                                    )}
                                </Select>
                            </Col>
                        </Row><Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong={true} style={{ margin: '8px 0px', width: 130 }}>Trạng thái ở</Text>
                                <Select
                                    allowClear
                                    value={this.state.statusStay}
                                    style={{ width: '70%' }}
                                    onChange={(val, e) => {
                                        this.setState({ statusStay: e.props.children })
                                    }}
                                >
                                    <Option value="trong">Trống</Option>
                                    <Option value="conguoi">Có người</Option>
                                </Select>
                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Tình trạng phòng</Text>
                                <Select
                                    allowClear
                                    value={this.state.status}
                                    style={{ width: '70%' }}
                                    onChange={(val, e) => this.setState({ status: e.props.children })}
                                >
                                    <Option value="sach">Sạch</Option>
                                    <Option value="ban">Bẩn</Option>
                                    <Option value="dangdon">Đang dọn</Option>
                                </Select>
                            </Col>
                        </Row>
                    </Card>
                </Modal>

            </div>
        )
    }

}


export default Update
