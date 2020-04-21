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

class Detail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalDetail: true,
            typeRoom: {},
            listRoom: this.props.listBookRoom ? this.props.listBookRoom : []
        }

    }

    componentDidMount() {
        this.getTypeRoomById();
    }

    getTypeRoomById() {
        let id = this.props.listBookRoom[0].TypeRoomID;
        typeroomProvider.getDetail(id).then(res => {
            this.setState({
                typeRoom: res.data,
                // totalPerPage:res.Data.TotalNumberOfRecords
            })
        }).catch(e => {
            console.log(e)
        })
        
    }

    handle() {

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
                                <Text strong={true} style={{ margin: '8px 0px', width: 130 }}>Mã phòng</Text>
                                <Text style={{ margin: '8px 0px', width: 130 }}>{this.props.listBookRoom[0].RoomNo}</Text>

                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Tên phòng</Text>
                                <Text style={{ margin: '8px 0px', width: 130 }}>{this.props.listBookRoom[0].RoomName}</Text>
                            </Col>
                        </Row>
                        <Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong={true} style={{ margin: '8px 0px', width: 130 }}>Số người</Text>
                                <Text style={{ margin: '8px 0px', width: 130 }}>{this.props.listBookRoom[0].NoP}</Text>

                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Giá</Text>
                                <Text style={{ margin: '8px 0px', width: 130 }}>{this.props.listBookRoom[0].Price} VNĐ</Text>
                            </Col>
                        </Row>
                        <Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong={true} style={{ margin: '8px 0px', width: 130 }}>Tầng</Text>
                                <Text style={{ margin: '8px 0px', width: 130 }}>{this.props.listBookRoom[0].Floor}</Text>

                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Loại phòng</Text>
                                <Text style={{ margin: '8px 0px', width: 130 }}>{this.state.typeRoom.TypeRoomName}</Text>
                            </Col>
                        </Row><Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong={true} style={{ margin: '8px 0px', width: 130 }}>Trạng thái ở</Text>
                                <Text style={{ margin: '8px 0px', width: 130 }}>{this.props.listBookRoom[0].StatusStay}</Text>

                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Tình trạng phòng</Text>
                                <Text style={{ margin: '8px 0px', width: 130 }}>{this.props.listBookRooms[0].Status}</Text>
                            </Col>
                        </Row>
                    </Card>
                </Modal>

            </div>
        )
    }

}


export default Detail
