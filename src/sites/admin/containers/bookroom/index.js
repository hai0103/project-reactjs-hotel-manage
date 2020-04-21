import React from 'react'
import bookRoomProvider from '../../../../data-access/bookroom-provider';
import customerProvider from '../../../../data-access/customer-provider';
import roomProvider from '../../../../data-access/room-provider';

import { withStyles } from '@material-ui/core/styles';
import './style.css'
import moment from 'moment';
import ColumnResizer from "react-column-resizer";
import { toast } from 'react-toastify';

import ModalAddBookRoom from './create';
import ModalDeleteBookRoom from './delete';
import ModalDetailBookRoom from './detail';
// import ModalUpdateBookRoom from './update';
import ModalAddPayment from './add-payment';

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


class BookRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModalAdd: false,
            showModalDelete: false,
            showModalDetail: false,
            showModalUpdate: false,
            showModalPayment: false,
            confirmDialog: false,
            dataUser: {},
            data: [],
            listBookRoomSelected: [],
            listCustomer: [],
            listRoom: [],
            page: 0,
            size: 10,
            total: 0,
            progress: false,

            searchTerm: '',
            sortColumn: '',
            sortOrder: '',

            bookroomNo: '',
            roomId: '',
            customerId: '',
            statusStay: '',
            nop: '',
            customerCode: '',
            identity: ''

        }
    }

    componentDidMount() {
        this.loadPage();
        console.log(this.state.data)
    }

    loadPage() {
        this.getBookRoomByPageOnSearch();
        this.getAllCustomer();
        this.getAllRoom();
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
                    listRoom: res.data,
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

    getBookRoomByPageOnSearch() {


        this.setState({ progress: true })
        let param = {
            pageSize: this.state.size,
            pageNumber: this.state.page,
            customerId: this.state.customerId,
            bookroomNo: this.state.bookroomNo,
            customerCode: this.state.customerCode,
            identity: this.state.identity
        }
        bookRoomProvider.searchAndPage(param).then(res => {
            console.log(res)
            this.setState({
                data: res.data.Results,
                total: res.data.TotalNumberOfRecords,
            })
            this.setState({ progress: false })
        }).catch(e => {
            console.log(e)
            this.setState({ progress: false })
        })
    }

    handleSearch() {
        this.getBookRoomByPageOnSearch();
    }

    renderListRoom = (listRoom) => {
        let lst = '';
        debugger
        listRoom.map(item =>
            lst = lst + item.RoomNo + ','
        )

        return <Typography>{lst}</Typography>
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
                this.setState({ listBookRoomSelected: selectedRows });
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
                            className={this.state.listBookRoomSelected.length == 1 ? "toolbar-item edit black-tooltip-main" : "toolbar-item edit black-tooltip-main disable-toolbar"}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Ctrl + 3"
                            onClick={() => {
                                // if (this.state.listBookRoomSelected.length == 1)
                                this.setState({ showModalPayment: true })
                                debugger
                            }}
                        >
                            <span className="toolbar-icon icon-double" />
                            <span>Thanh toán</span>
                        </div>
                        <div
                            className={this.state.listBookRoomSelected.length == 1 ? "toolbar-item edit black-tooltip-main" : "toolbar-item edit black-tooltip-main disable-toolbar"}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Ctrl + 3"
                            onClick={() => {
                                if (this.state.listBookRoomSelected.length == 1)
                                    this.setState({ showModalDetail: true })
                            }}
                        >
                            <span className="toolbar-icon icon-view" />
                            <span>Xem</span>
                        </div>
                        <div
                            className={this.state.listBookRoomSelected.length == 1 ? "toolbar-item edit black-tooltip-main" : "toolbar-item edit black-tooltip-main disable-toolbar"}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Ctrl + 3"
                            onClick={() => {
                                if (this.state.listBookRoomSelected.length == 1)
                                    this.setState({ showModalUpdate: true })
                            }}
                        >
                            <span className="toolbar-icon icon-edit" />
                            <span>Sửa</span>
                        </div>
                        <div
                            className={this.state.listBookRoomSelected.length > 0 ? "toolbar-item edit black-tooltip-main" : "toolbar-item edit black-tooltip-main disable-toolbar"}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Ctrl + 3"
                            onClick={() => {
                                if (this.state.listBookRoomSelected.length != 0)
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
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Mã khách hàng</Typography>
                                <Input
                                    allowClear
                                    value={this.state.customerCode}
                                    onChange={(val) => this.setState({ customerCode: val.target.value })}
                                    placeholder="Nhập mã KH"
                                    style={{ width: '70%' }}
                                />
                            </Col>

                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>CMND/CCCD</Typography>
                                <Input
                                    allowClear
                                    value={this.state.identity}
                                    onChange={(val) => this.setState({ identity: val.target.value })}
                                    placeholder="Nhập số CMND/CCCD"
                                    style={{ marginTop: 4, width: '70%' }}
                                />
                            </Col>

                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Tên khách hàng</Typography>
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
                                        this.setState({ customerId: val });
                                    }}
                                >
                                    {this.state.listCustomer.map(v =>
                                        <Option value={v.CustomerID} key={v.CustomerID}>{v.Name}</Option>)

                                    }
                                </Select>
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
                                        this.setState({ size: pageSize, page: current - 1 }, () => this.getBookRoomByPageOnSearch())
                                    },
                                    onChange: (value) => {
                                        console.log(value)
                                        this.setState({ page: value - 1 }, () => this.getBookRoomByPageOnSearch())
                                    }
                                }
                            }
                            bordered
                            scroll={{ y: 400 }}
                        >
                            <Column title="STT" key="index" width={90} align={'Center'}
                                render={(text, record, index) => (this.state.page) * this.state.size + index + 1}
                            />
                            <Column title="Mã đặt phòng" dataIndex="BookRoomNo" key="BookRoomNo" align={'Left'}
                                render={(text, record, index) => text}
                            />
                            <Column title="Khách hàng" dataIndex="CustomerID" key="CustomerID" align={'Left'}
                                render={(text, record, index) =>
                                    record.Customer.Name
                                }
                            />
                            <Column title="Phòng" dataIndex="Deposit" key="Deposit" align={'Left'}
                                render={(text, record, index) =>
                                    record.Rooms.map(v => <h4>{v.RoomNo}</h4>)
                                }
                            />
                            <Column title="Ngày đến" dataIndex="StartDate" key="StartDate" align={'Left'}
                                render={(text, record, index) => moment(text).format('DD-MM-YYYY')}
                            />
                            <Column title="Ngày đi" dataIndex="EndDate" key="EndDate" align={'Center'}
                                render={(text, record, index) => moment(text).format('DD-MM-YYYY')}
                            />
                            <Column title="Ngày tạo" dataIndex="CreateDate" key="CreateDate" align={'Center'}
                                render={(text, record, index) => moment(text).format('DD-MM-YYYY')}
                            />
                            <Column title="Đã hủy" dataIndex="IsCancel" key="IsCancel" align={'Center'}
                                render={(text, record, index) => text == true ? 'Có' : 'Không'}
                            />
                            <Column title="Tiền cọc" dataIndex="Deposit" key="Deposit" align={'Left'}
                                render={(text, record, index) => text.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') + 'VNĐ'

                                }
                            />
                            <Column title="Đã thanh toán" dataIndex="Status" key="Status" align={'Left'}
                                render={(text, record, index) => text == true ? 'Rồi' : 'Chưa'}
                            />
                        </Table>
                    </Spin>
                    {this.state.showModalAdd && <ModalAddBookRoom loadPage={() => this.loadPage()} closeModal={() => this.setState({ showModalAdd: false })} />}
                    {this.state.showModalDelete && <ModalDeleteBookRoom listBookRoom={this.state.listBookRoomSelected} loadPage={() => this.loadPage()} closeModal={() => this.setState({ showModalDelete: false })} />}
                    {/* {this.state.showModalDetail && <ModalDetailBookRoom listBookRoom={this.state.listBookRoomSelected} closeModal={() => this.setState({ showModalDetail: false })} />}
                    {this.state.showModalUpdate && <ModalUpdateBookRoom listBookRoom={this.state.listBookRoomSelected} loadPage={() => this.loadPage()} closeModal={() => this.setState({ showModalUpdate: false })} />} */}
                    {this.state.showModalPayment && <ModalAddPayment listBookRoom={this.state.listBookRoomSelected} loadPage={() => this.loadPage()} closeModal={() => this.setState({ showModalPayment: false })} />}

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
export default withStyles(styles)(BookRoom)