import React, { Component } from 'react';
import paymentProvider from '../../../../data-access/payment-provider';
import moment from 'moment';

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
    Modal,
    Divider
} from 'antd';
import { toast } from 'react-toastify';


const { Title, Text } = Typography;
const FormItem = Form.Item;
const { Option } = Select;

class AddPayment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalAddPay: true,
            typeRoom: {},
            listBook: this.props.listBookRoom ? this.props.listBookRoom : [],

            PaymentNo: 'TT00',
            Date: new Date(),
            TotalCost: this.props.listBookRoom ? (this.props.listBookRoom[0].Deposit) / 0.4 : 0,
            BookRoomID: this.props.listBookRoom ? this.props.listBookRoom[0].BookRoomID : '',
            BookRoomNo: this.props.listBookRoom ? this.props.listBookRoom[0].BookRoomNo : '',


            ListRoom: this.props.listBookRoom ? this.props.listBookRoom[0].Rooms : [],
            CustomerName: this.props.listBookRoom ? this.props.listBookRoom[0].Customer.Name : '',
            StartDate: this.props.listBookRoom ? moment(this.props.listBookRoom[0].StartDate).format('DD-MM-YYYY') : moment(new Date()).format('DD-MM-YYYY'),
            EndDate: this.props.listBookRoom ? moment(this.props.listBookRoom[0].EndDate).format('DD-MM-YYYY') : moment(new Date()).format('DD-MM-YYYY'),

            Deposit: this.props.listBookRoom ? this.props.listBookRoom[0].Deposit : 0,

            MoneyPay: 0,

        }

    }

    componentDidMount() {
        // console.log(this.props.listBookRoom[0])
        this.calMoney();
    }


    calMoney() {
        this.setState({ MoneyPay: this.state.TotalCost - this.state.Deposit })
    };

    handleAdd() {
        let {
            PaymentNo,
            Date,
            TotalCost,
            BookRoomID
        } = this.state;

        let payload = {
            PaymentNo,
            Date,
            TotalCost,
            BookRoomID
        };

        paymentProvider.create(payload).then(res => {
            console.log(res);
            if (res.code == 0) {
                toast.success("Thanh toán thành công !", {
                    position: toast.POSITION.TOP_RIGHT
                });
                this.props.loadPage();
                this.handleClose();

            } else {
                toast.error("Thanh toán thất bại !", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        }).catch(e => {
            toast.error("Thanh toán thất bại !", {
                position: toast.POSITION.TOP_RIGHT
            });
        });


    }



    handleClose() {
        this.props.closeModal();
    }

    render() {
        return (
            <div>
                <Modal
                    visible={this.state.showModalAddPay}
                    title="Thanh toán đặt phòng"
                    onCancel={() => {
                        this.handleClose()
                    }
                    }
                    width={'50%'}
                    maskClosable={false}
                    footer={
                        [
                            <Button type="danger" onClick={() => {
                                this.handleAdd()
                            }}
                            >
                                Thanh toán
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
                                <Text strong={true} style={{ margin: '8px 0px', width: 130 }}>Mã phòng</Text>
                                {this.state.ListRoom.map(v =>
                                    <Text style={{ margin: '8px 0px', width: 50 }}>{v.RoomNo}</Text>
                                )}

                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Tên khách hàng</Text>
                                <Text style={{ margin: '8px 0px', width: 130 }}>{this.state.CustomerName}</Text>
                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong={true} style={{ margin: '8px 0px', width: 130 }}>Mã đặt phòng</Text>
                                <Text style={{ margin: '8px 0px', width: 130 }}>{this.state.BookRoomNo}</Text>

                            </Col>
                        </Row>
                        <Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong={true} style={{ margin: '8px 0px', width: 130 }}>Ngày đến</Text>
                                <Text style={{ margin: '8px 0px', width: 130 }}>{this.state.StartDate}</Text>

                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Ngày đi</Text>
                                <Text style={{ margin: '8px 0px', width: 130 }}>{this.state.EndDate}</Text>
                            </Col>
                        </Row>
                        <Divider />
                        <Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong={true} style={{ margin: '8px 0px', width: 130 }}>Mã thanh toán</Text>
                                {/* <Text style={{ margin: '8px 0px', width: 130 }}>{this.state.PaymentNo}</Text> */}
                                <Input
                                    value={this.state.PaymentNo}
                                    placeholder="Nhập mã phòng"
                                    style={{ width: '70%' }}
                                    onChange={(val) => {
                                        this.setState({ PaymentNo: val.target.value })
                                    }}
                                />
                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Tổng tiền</Text>
                                <Text style={{ margin: '8px 0px', width: 130 }}>{this.state.TotalCost}</Text>
                            </Col>
                        </Row><Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong={true} style={{ margin: '8px 0px', width: 130 }}>Tiền cọc</Text>
                                <Text style={{ margin: '8px 0px', width: 130 }}>{this.state.Deposit}</Text>

                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Tiền khách phải trả</Text>
                                <Text style={{ margin: '8px 0px', width: 130 }}>{this.state.MoneyPay}</Text>
                            </Col>
                        </Row>
                    </Card>
                </Modal>

            </div>
        )
    }

}


export default AddPayment
