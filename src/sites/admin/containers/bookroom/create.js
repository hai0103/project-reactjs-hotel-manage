import React, { Component } from 'react';
import typeRoomProvider from '../../../../data-access/typeroom-provider';
import roomProvider from '../../../../data-access/room-provider';
import customerProvider from '../../../../data-access/customer-provider';
import bookroomProvider from '../../../../data-access/bookroom-provider';

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
    DatePicker
} from 'antd';
import { toast } from 'react-toastify';

const { Title, Text } = Typography;
const FormItem = Form.Item;
const { Option } = Select;

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const dateFormat = 'MM-DD-YYYY';
class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalAdd: true,
            listCustomer: [],
            listRoom: [],
            showModalSelectRoom: false,

            BookRoomNo: '',
            StartDate: moment(new Date()).format('MM-DD-YYYY'),
            EndDate: moment(new Date()).format('MM-DD-YYYY'),
            CreateDate: moment(new Date()).format('MM-DD-YYYY'),
            CustomerID: '',
            Deposit: 0,
            roomId: '',
            RoomID: '',
            listRoomSelected: [],

            bookroomIDRes: ''
        }

    }

    componentDidMount() {
        this.getAllCustomer();
        this.getAllRoom();
    }

    calDeposit() {
        let deposit = 0;
        let totalCostRoom = 0;
        let day = 0;
        this.state.listRoomSelected.map(v => {
            totalCostRoom = totalCostRoom + v.Price;
        });
        let date1 = new Date(this.state.StartDate);
        let date2 = new Date(this.state.EndDate);
        let diffTime = Math.abs(date2 - date1);
        day = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        deposit = totalCostRoom * day * 0.4;
        this.setState({ Deposit: deposit })

    }

    getAllCustomer() {
        customerProvider.getAll().then(res => {
            console.log(res)
            if (res.code == 0) {
                this.setState({
                    listCustomer: res.data,
                })
            }
            else {
                this.setState({
                    listCustomer: []
                })
            }
        }).catch(e => {
            console.log(e)
        })
    }


    getAllRoom() {
        roomProvider.getAll().then(res => {
            console.log(res)
            if (res.code == 0) {
                this.setState({
                    listRoom: res.data.filter(x=>x.StatusStay=="Trống"),
                })
            }
            else {
                this.setState({
                    listRoom: []
                })
            }
        }).catch(e => {
            console.log(e)
        })
    }

    handleAdd() {
        let {
            BookRoomNo,
            StartDate,
            EndDate,
            CreateDate,
            CustomerID,
            Deposit
        } = this.state;

        let payload = {
            BookRoomNo,
            StartDate,
            EndDate,
            CreateDate,
            CustomerID,
            Deposit
        }

        let listId = [];
        this.state.listRoomSelected.map(v => listId.push(v.RoomID));

        console.log(payload);
        bookroomProvider.create(payload).then(res => {
            console.log(res)
            if (res.code == 0) {
                this.setState({
                    bookroomIDRes: res.data
                }, () => {
                    bookroomProvider.createDetail(this.state.bookroomIDRes, listId).then(res1 => {
                        console.log(res1)
                        if (res1.code == 0) {
                            toast.success("Tạo mới Đặt phòng thành công !", {
                                position: toast.POSITION.TOP_RIGHT
                            });
                            this.props.loadPage();
                            this.handleClose();

                        } else {
                            toast.error("Tạo mới Đặt phòng thất bại !", {
                                position: toast.POSITION.TOP_RIGHT
                            });
                        }
                    }).catch(e => {

                    });
                   

                });

            }
        }).catch(e => {
            // toast.error("Tạo mới Đặt phòng thất bại !", {
            //     position: toast.POSITION.TOP_RIGHT
            // });
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
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Mã đặt phòng</Text>
                                <Input
                                    value={this.state.BookRoomNo}
                                    placeholder="Nhập mã phòng"
                                    style={{ width: '70%' }}
                                    onChange={(val) => {
                                        this.setState({ BookRoomNo: val.target.value })
                                    }}
                                />

                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Ngày đến</Text>
                                <DatePicker
                                    value={moment(this.state.StartDate, dateFormat)}
                                    format={dateFormat}
                                    placeholder="Nhập ngày đến"
                                    style={{ width: '70%' }}
                                    onChange={(date, dateString) => {
                                        this.setState({ StartDate: dateString }, () => this.calDeposit());

                                    }}
                                />
                            </Col>
                        </Row>
                        <Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Ngày đi</Text>
                                <DatePicker
                                    value={moment(this.state.EndDate, dateFormat)}
                                    format={dateFormat}
                                    placeholder="Nhập ngày đi"
                                    style={{ width: '70%' }}
                                    onChange={(date, dateString) => {
                                        this.setState({ EndDate: dateString }, () => this.calDeposit());
                                    }}
                                />
                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Tiền cọc</Text>
                                <Input
                                    value={this.state.Deposit}
                                    placeholder="Nhập số người"
                                    style={{ width: '50%' }}
                                    onChange={(val) => this.setState({ Deposit: val.target.value })}
                                />
                            </Col>
                        </Row>
                        <Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Tên khách hàng</Text>
                                <Select
                                    placeholder="Chọn khách hàng"
                                    style={{
                                        width: '70%'
                                    }}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }

                                    showSearch
                                    allowClear
                                    showArrow={false}
                                    notFoundContent={null}
                                    defaultActiveFirstOption={false}
                                    onChange={(val) => {
                                        this.setState({ CustomerID: val });
                                    }}
                                >
                                    {this.state.listCustomer.map(v =>
                                        <Option value={v.CustomerID} key={v.CustomerID}>{v.Name}</Option>)

                                    }
                                </Select>
                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Text strong style={{ margin: '8px 0px', width: 130 }}>Phòng</Text>
                                <Button
                                    type="default" onClick={() => this.setState({ showModalSelectRoom: true })}>
                                    Chọn
                                </Button>
                                <span style={{ marginLeft: 8 }}>
                                    {this.state.listRoomSelected.map((item, index) =>
                                        <Typography style={{ margin: '8px 0px' }}>{item.RoomNo}</Typography>
                                    )}
                                </span>
                            </Col>
                        </Row>
                    </Card>
                </Modal>

                <Modal
                    visible={this.state.showModalSelectRoom}
                    title="Chọn phòng"
                    onCancel={() => this.setState({
                        showModalSelectRoom: false
                    })}
                    footer={[
                        <Button key="back" type="default" onClick={() => {
                            this.setState({
                                listRoomSelected: [],
                            })
                        }}>
                            Reset
                        </Button>,
                        <Button key="submit" type="primary" onClick={() => {
                            this.setState({
                                showModalSelectRoom: false
                            })
                        }}>
                            Xác nhận
                        </Button>,
                    ]}
                >
                    <Row gutter={{ md: 24, lg: 24, xl: 24 }}>
                        <Col md={244} sm={24} xs={24} style={{ display: 'inline-flex' }}>
                            <Typography style={{ margin: '8px 0px', width: 130 }}>Mã phòng</Typography>
                            <Select
                                placeholder="Chọn mã phòng"
                                style={{
                                    width: '70%'
                                }}
                                value={this.state.roomId}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                showSearch
                                allowClear
                                onChange={(val, e) => {
                                    if (this.state.listRoomSelected.filter(v => v.RoomID == val).length == 1) {
                                        this.setState({ listRoomSelected: this.state.listRoomSelected.filter(v => v.RoomID != val) })
                                    }
                                    else {
                                        this.state.listRoomSelected.push(this.state.listRoom.filter(v => v.RoomID == val)[0])
                                    }
                                    this.calDeposit();
                                    this.setState({ roomId: val });
                                }}
                            >
                                {this.state.listRoom.filter(v => v.StatusStay == 'Trống').map(v =>
                                    <Option value={v.RoomID} key={v.RoomID}>{v.RoomName}</Option>
                                )
                                }
                            </Select>


                        </Col>
                        <Col md={244} sm={24} xs={24} >
                            <Typography style={{ margin: '8px 0px', width: 130 }}>Phòng đã chọn</Typography>

                            {this.state.listRoomSelected.map((item, index) =>
                                <Typography style={{ margin: '8px 0px' }}>{item.RoomNo}</Typography>
                            )}

                        </Col>
                    </Row>
                </Modal>


            </div>
        )
    }

}


export default Add
