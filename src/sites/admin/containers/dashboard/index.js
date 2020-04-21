import React from 'react'
import roomProvider from '../../../../data-access/room-provider'
import bookroomProvider from '../../../../data-access/room-provider'
import customerProvider from '../../../../data-access/customer-provider'
import employeeProvider from '../../../../data-access/employee-provider'
import './style.css'
import Chart from "react-apexcharts";
// import { Resizable, ResizableBox } from 'react-resizable';


import {
    Typography,
    Card,
    Row,
    Col,
    Button,
    Spin,
    Icon,
    Progress
} from 'antd';

const { Title, Text } = Typography;

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookroom: 0,
            customer: 0,
            employee: 0,
            room: 0,
            listRoom: [],
            roomEmpty: 0,
            percent: 0,
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                }
            },
            series: [
                {
                    name: "Số khách hàng",
                    data: [30, 40, 45, 50, 49, 60, 70, 91, 36, 22, 34, 50]
                }
            ]
        }
    }

    componentDidMount() {
        this.getAll();
        this.getAllBook();
        this.getAllCustomer();
        this.getAllEmployee();
    }

    getAll() {
        roomProvider.getAll().then(res => {
            if (res.code == 0) {
                this.setState({
                    room: res.data.length,
                    listRoom: res.data,
                    roomEmpty : res.data.filter(x=>x.StatusStay=="Trống").length
                })
            }
        }).catch(e => {
            console.log(e)
        })
    }

    getAllBook() {
        bookroomProvider.getAll().then(res => {
            if (res.code == 0) {
                this.setState({
                    bookroom: res.data.length
                })
            }
        }).catch(e => {
            console.log(e)
        })
    }

    getAllCustomer() {
        customerProvider.getAll().then(res => {
            this.setState({
                customer: res.data.length
            })
        }).catch(e => {
            console.log(e)
        })
    }

    getAllEmployee() {
        employeeProvider.getAll().then(res => {
            console.log(res)
            if (res.code == 0) {
                this.setState({
                    employee: res.data.length
                })
            }
        }).catch(e => {
            console.log(e)
        })
    }

    render() {
        return (
            <div className="content-area">
                <Row gutter={{ md: 24, lg: 24, xl: 24 }}>
                    <Col md={24} sm={24} xs={24} style={{ margin: 8 }}>
                        <Title level={2}>Bảng điều khiển</Title>
                    </Col>
                </Row>

                <Row gutter={{ md: 22, lg: 22, xl: 22 }} style={{ padding: 28 }}>
                    <Col md={6} sm={6} xs={6} style={{}}>
                        <Card onClick={()=>this.props.history.push("/admin/book-room")} bordered={false} style={{ background: '#7BD5F5', height: 200, width: 300, display: 'inline-flex' }}>
                            <div style={{ display: 'inline-flex' }}>
                                <Card
                                    bordered={false}
                                    style={{
                                        width: 170,
                                        background: 'unset',
                                        padding: 4
                                    }}
                                >
                                    <Title style={{ color: '#fff', fontSize: 16, margin: '8px 0px' }}>Lượt đặt phòng</Title>
                                    <Title style={{ color: '#fff', fontSize: 44, margin: 0 }}>{this.state.bookroom}</Title>

                                </Card>
                                <Card
                                    bordered={false}
                                    style={{
                                        background: 'url("/images/order.png")',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 80,
                                        height: 150,
                                        width: 100,
                                        backgroundPosition: 'left',
                                    }}
                                >
                                </Card>
                            </div>



                        </Card>
                    </Col>
                    <Col md={6} sm={6} xs={6} style={{}}>
                        <Card  onClick={()=>this.props.history.push("/admin/employee")} bordered={false} style={{ background: '#F9E2AE', height: 200, width: 300, display: 'inline-flex' }}>
                            <div style={{ display: 'inline-flex' }}>
                                <Card
                                    bordered={false}
                                    style={{
                                        width: 170,
                                        background: 'unset',
                                        padding: 4
                                    }}
                                >
                                    <Title style={{ color: '#fff', fontSize: 16, margin: '8px 0px' }}>Số nhân viên</Title>
                                    <Title style={{ color: '#fff', fontSize: 44, margin: 0 }}>{this.state.employee}</Title>
                                </Card>
                                <Card
                                    bordered={false}
                                    style={{
                                        background: 'url("/images/employee.png")',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 80,
                                        height: 150,
                                        width: 100,
                                        backgroundPosition: 'center',
                                    }}
                                >
                                </Card>
                            </div>
                        </Card>
                    </Col>
                    <Col md={6} sm={6} xs={6} style={{}}>
                        <Card  onClick={()=>this.props.history.push("/admin/customer")} bordered={false} style={{ background: '#85CBCC', height: 200, width: 300, display: 'inline-flex' }}>
                            <div style={{ display: 'inline-flex' }}>
                                <Card
                                    bordered={false}
                                    style={{
                                        width: 170,
                                        background: 'unset',
                                        padding: 4
                                    }}
                                >
                                    <Title style={{ color: '#fff', fontSize: 16, margin: '8px 0px' }}>Khách hàng</Title>
                                    <Title style={{ color: '#fff', fontSize: 44, margin: 0 }}>{this.state.customer}</Title>
                                </Card>
                                <Card
                                    bordered={false}
                                    style={{
                                        background: 'url("/images/customer.png")',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 80,
                                        height: 150,
                                        width: 100,
                                        backgroundPosition: 'center',
                                    }}
                                >
                                </Card>
                            </div>
                        </Card>
                    </Col>
                    <Col md={6} sm={6} xs={6} style={{}}>
                        <Card  onClick={()=>this.props.history.push("/admin/room")} bordered={false} style={{ background: '#E84A5F', height: 200, width: 300, display: 'inline-flex' }}>
                            <div style={{ display: 'inline-flex' }}>
                                <Card
                                    bordered={false}
                                    style={{
                                        width: 170,
                                        background: 'unset',
                                        padding: 4
                                    }}
                                >
                                    <Title style={{ color: '#fff', fontSize: 16, margin: '8px 0px' }}>Phòng</Title>
                                    <Title style={{ color: '#fff', fontSize: 44, margin: 0 }}>{this.state.room}</Title>
                                </Card>
                                <Card
                                    bordered={false}
                                    style={{
                                        background: 'url("/images/room.png")',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 80,
                                        height: 150,
                                        width: 100,
                                        backgroundPosition: 'center',
                                    }}
                                >
                                </Card>
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Row gutter={{ md: 22, lg: 22, xl: 22 }} style={{ padding: 28 }}>
                    <Col  md={12} sm={12} xs={12} style={{}}>
                        <Card bordered={false} style={{ background: '#fff', height: 500, width: 710, display: 'inline-flex' }}>
                            <p className="title-thongke">Số lượng khách hàng theo tháng</p>
                            <div className="mixed-chart">
                                <Chart
                                    options={this.state.options}
                                    series={this.state.series}
                                    type="bar"
                                    width="500"
                                />
                            </div>
                        </Card>
                    </Col>
                    <Col md={6} sm={6} xs={6} style={{}}>
                        <Card bordered={false} style={{ background: '#fff', height: 500, width: 300, display: 'inline-flex' }}>
                        <p className="title-thongke">Số lượng đặt phòng theo tháng</p>
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            width="500"
                            />
                        </Card>
                    </Col>
                    
                </Row>
                <Row gutter={{ md: 24, lg: 24, xl: 24 }}>
                    <Col md={6} sm={6} xs={6} style={{}}>
                        <Card style={{ background: '#fff', height: 500, width: 300, display: 'inline-flex' }}>
                            <Title style={{ fontSize: 16, margin: '8px 0px' }}>
                                <Icon style={{ fontSize: 26 }} type="bar-chart" />
                                Thống kê phòng trống
                            </Title>
                            <Text>Số lượng phòng trống được cập nhật liên tục đúng với thực tế</Text>
                            <Progress style={{ marginTop: 50 }} width={250} type="circle" percent={((this.state.roomEmpty/this.state.room)*100)} format={percent => `${this.state.roomEmpty+'/'+this.state.room}`} />
                        </Card>
                    </Col>
                </Row>


            </div >
        )
    }
}
export default Dashboard