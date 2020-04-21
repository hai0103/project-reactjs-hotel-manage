import React from 'react'
import paymentProvider from '../../../../data-access/payment-provider';
import bookRoomProvider from '../../../../data-access/bookroom-provider';

import { withStyles } from '@material-ui/core/styles';
import './style.css'
import moment from 'moment';
import ColumnResizer from "react-column-resizer";
import { toast } from 'react-toastify';

// import ModalAddRoom from './create';
// import ModalDeleteRoom from './delete';
// import ModalDetailRoom from './detail';
// import ModalUpdateRoom from './update';

import {
    Table,
    Select,
    Typography,
    Card,
    Row,
    Col,
    Button,
    Input,
    Modal,
    Spin
} from 'antd';

const { Column } = Table;
const { Option } = Select;


class Payment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModalAdd: false,
            showModalDelete: false,
            showModalDetail: false,
            showModalUpdate: false,
            confirmDialog: false,
            dataUser: {},
            data: [],

            listBookRoom: [],
            listPaymentSelected: [],
            page: 0,
            size: 10,
            total: 0,
            progress: false,

            bookroomNo: '',
            paymentNo: ''

        }
    }

    componentDidMount() {
        this.loadPage();
        console.log(this.state.data)
    }

    async loadPage() {
        await this.getBookRoomByPageOnSearch();
        this.getAllPayment();
    }

    getAllPayment() {
        this.setState({ progress: true })
        paymentProvider.getAll().then(res => {
            console.log(res)
            if (res.code == 0) {
                this.setState({
                    data: res.data,
                    total: res.data.length
                })
            }
            else {
                this.setState({
                    data: []
                })
            }
            this.setState({ progress: false })
        }).catch(e => {
            console.log(e)
            this.setState({ progress: false })
        })
    }



    getBookRoomByPageOnSearch() {
        this.setState({ progress: true })
        let param = {
            pageSize: 100,
            pageNumber: 0,
            customerId: '',
            bookroomNo: ''
        }
        bookRoomProvider.searchAndPage(param).then(res => {
            console.log(res)
            this.setState({
                listBookRoom: res.data.Results,
            })
            this.setState({ progress: false })
        }).catch(e => {
            console.log(e)
            this.setState({ progress: false })
        })
    }

    handleSearch() {

    }


    closeModal() {
        this.loadPage();
        this.setState({ openCreateModal: false });
    }
    showModalDelete(item) {
        this.setState({
            confirmDialog: true,
            tempDelete: item
        })
    }


    render() {

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ listPaymentSelected: selectedRows });
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };

        const classes = this.props;
        const { modalAdd,
            modalDetailtServiceType,
            confirmDialog,
            dataUser,
            fromDate,
            toDate,
            data,
            progress,
            page,
            size,
            total,
            rowsPerPage
        } = this.state
        return (
            <div className="content-area">
                <div className="panel-top">
                    <div className="toolbar">
                        <div className="toolbar-item add black-tooltip-main " data-toggle="tooltip" data-placement="bottom" title="Ctrl + 1" id="sub-open"
                            onClick={() => this.setState({ showModalAdd: true })}
                        >
                            <span className="toolbar-icon icon-add" />
                            <span className="toolbar-text">Thêm mới</span>

                        </div>
                        <div
                            className={this.state.listPaymentSelected.length == 1 ? "toolbar-item edit black-tooltip-main" : "toolbar-item edit black-tooltip-main disable-toolbar"}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Ctrl + 3"
                            onClick={() => {
                                if (this.state.listPaymentSelected.length == 1)
                                    this.setState({ showModalDetail: true })
                            }}
                        >
                            <span className="toolbar-icon icon-view" />
                            <span>Xem</span>
                        </div>
                        <div
                            className={this.state.listPaymentSelected.length == 1 ? "toolbar-item edit black-tooltip-main" : "toolbar-item edit black-tooltip-main disable-toolbar"}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Ctrl + 3"
                            onClick={() => {
                                if (this.state.listPaymentSelected.length == 1)
                                    this.setState({ showModalUpdate: true })
                            }}
                        >
                            <span className="toolbar-icon icon-edit" />
                            <span>Sửa</span>
                        </div>
                        <div
                            className={this.state.listPaymentSelected.length > 0 ? "toolbar-item edit black-tooltip-main" : "toolbar-item edit black-tooltip-main disable-toolbar"}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Ctrl + 3"
                            onClick={() => {
                                if (this.state.listPaymentSelected.length != 0)
                                    this.setState({ showModalDelete: true })
                            }}
                        >
                            <span className="toolbar-icon icon-delete" />
                            <span>Xóa</span>
                        </div>
                        <div className="toolbar-item f5 black-tooltip-main" data-toggle="tooltip" data-placement="bottom" title="Ctrl + R"
                            onClick={() => this.loadPage()}
                        >
                            <span className="toolbar-icon icon-refresh" />
                            <span>Nạp</span>
                        </div>
                    </div>
                </div>

                <div className="filter-data">
                    <Card>

                        <Row gutter={{ md: 24, lg: 24, xl: 24 }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Mã thanh toán</Typography>
                                <Input
                                    allowClear
                                    value={this.state.paymentNo}
                                    placeholder="Nhập mã đặt phòng"
                                    style={{ width: '70%' }}
                                    onChange={(val) => {
                                        this.setState({ bookroomNo: val.target.value.trim() })
                                    }}
                                />
                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Mã đặt phòng</Typography>
                                <Input
                                    allowClear
                                    value={this.state.bookroomNo}
                                    placeholder="Nhập mã đặt phòng"
                                    style={{ width: '70%' }}
                                    onChange={(val) => {
                                        this.setState({ bookroomNo: val.target.value.trim() })
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row gutter={{
                            md: 8,
                            lg: 24,
                            xl: 24
                        }}>
                            <Col md={12} sm={24} xs={24} >
                                <Button
                                    style={{ margin: '8px 0px' }}
                                    onClick={() => this.handleSearch()}
                                >
                                    Tìm kiếm
                                    </Button>
                            </Col>
                        </Row>
                    </Card>
                </div>

                <div className="table-list">
                    <Spin spinning={this.state.progress} size="large">
                        <Table
                            rowSelection={rowSelection}
                            dataSource={data}
                            pagination={
                                {
                                    showSizeChanger: true,
                                    current: page + 1,
                                    pageSize: size,
                                    total: total,
                                    onShowSizeChange: (current, pageSize) => {
                                        console.log(current, pageSize)
                                    },
                                    onChange: (value) => {
                                        console.log(value)
                                    }
                                }
                            }
                            bordered
                            scroll={{ y: 400 }}
                        >
                            <Column title="STT" key="index" width={90} align={'Center'}
                                render={(text, record, index) => (this.state.page) * this.state.size + index + 1}
                            />
                            <Column title="Mã thanh toán" dataIndex="PaymentNo" key="PaymentNo" align={'Left'}
                                render={(text, record, index) => text
                                }
                            />
                            <Column title="Ngày thanh toán" dataIndex="Date" key="Date" align={'Left'}
                                render={(text, record, index) => moment(text).format('DD-MM-YYYY')}
                            />
                            <Column title="Tổng tiền" dataIndex="TotalCost" key="TotalCost" align={'Left'}
                                render={(text, record, index) => text.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') + 'VNĐ'}
                            />
                            <Column title="Mã đặt phòng" dataIndex="BookRoomID" key="BookRoomID" align={'Left'}
                                render={(text, record, index) =>
                                    this.state.listBookRoom.filter(v => v.BookRoomID == record.BookRoomID)[0] ? this.state.listBookRoom.filter(v => v.BookRoomID == record.BookRoomID)[0].BookRoomNo : ''
                                }
                            />
                        </Table>
                    </Spin>
                    {/* 
                    {this.state.showModalAdd && <ModalAddRoom loadPage={() => this.loadPage()} closeModal={() => this.setState({ showModalAdd: false })} />}
                    {this.state.showModalDelete && <ModalDeleteRoom listRoom={this.state.listRoomSelected} loadPage={() => this.loadPage()} closeModal={() => this.setState({ showModalDelete: false })} />}
                    {this.state.showModalDetail && <ModalDetailRoom listRoom={this.state.listRoomSelected} closeModal={() => this.setState({ showModalDetail: false })} />}
                    {this.state.showModalUpdate && <ModalUpdateRoom listRoom={this.state.listRoomSelected} loadPage={() => this.loadPage()} closeModal={() => this.setState({ showModalUpdate: false })} />}
 */}
                </div>
            </div >
        )
    }
}
const styles = theme => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});
export default withStyles(styles)(Payment)