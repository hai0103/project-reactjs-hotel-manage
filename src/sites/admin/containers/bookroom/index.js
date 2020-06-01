import React from 'react'
import bookRoomProvider from '../../../../data-access/bookroom-provider';
import customerProvider from '../../../../data-access/customer-provider';
import roomProvider from '../../../../data-access/room-provider';

import { withStyles } from '@material-ui/core/styles';
import './style.css'
import moment from 'moment';
import ColumnResizer from "react-column-resizer";
import { toast } from 'react-toastify';
import NumberFormat from "react-number-format";

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
        this.setState({
            bookroomNo: '',
            roomId: '',
            customerId: '',
            statusStay: '',
            nop: '',
            customerCode: '',
            identity: ''
        }, () => {
            this.getBookRoomByPageOnSearch();
            this.getAllCustomer();
        })
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

    getBookRoomByPageOnSearch() {
        this.setState({ progress: true })
        let {bookroomNo, customerId, customerCode, identity, page, size} = this.state;
        let payload = {
            bookNo: bookroomNo,
            customerName: customerId,
            customerCode: customerCode,
            identity: identity,
            page: page,
            size: size,
            // customerId: customerId,
        }
        bookRoomProvider.searchAndPaging(payload).then(res => {
            console.log(res)
            this.setState({
                data: res.data.content,
                total: res.data.totalElements,
            })
            this.setState({ progress: false })
        }).catch(e => {
            console.log(e)
            this.setState({ progress: false })
        })
    }


    closeModal() {
        this.getBookRoomByPageOnSearch();
        this.setState({ openCreateModal: false });
    }

    showModalDelete(item) {
        this.setState({
            confirmDialog: true,
            tempDelete: item
        })
    }

    
    renderStatus = (status) => {
        switch (status) {
            case 0:
                return <h6><span className="badge badge-warning">Chưa thanh toán</span></h6>;
            case 1:
                return <h6><span className="badge badge-success">Đã thanh toán</span></h6>;
            case 2:
                return <h6><span className="badge badge-warning">Quá hạn thanh toán</span></h6>;
            default:
                return '';
        }
    };

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
                                // debugger
                            }}
                        >
                            <span className="toolbar-icon icon-done" />
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
                            <span>Refresh</span>
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
                                    onChange={(val) => this.setState({ identity: val.target.value.trim() })}
                                    placeholder="Nhập số CMND/CCCD"
                                    style={{ marginTop: 4, width: '70%' }}
                                />
                            </Col>

                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Tên khách hàng</Typography>
                                {/* <Select
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
                                        <Option value={v.id} key={v.id}>{v.name}</Option>)

                                    }
                                </Select> */}
                                <Input
                                    allowClear
                                    value={this.state.customerId}
                                    onChange={(val) => this.setState({ customerId: val.target.value })}
                                    placeholder="Nhập khách hàng"
                                    style={{ marginTop: 4, width: '70%' }}
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
                                    onClick={() => this.getBookRoomByPageOnSearch()}
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
                            <Column title="Mã đặt phòng" dataIndex="bookNo" key="bookNo" align={'Left'}
                                render={(text, record, index) => text}
                            />
                            <Column title="Khách hàng" dataIndex="customer" key="customer" align={'Left'}
                                render={(text, record, index) =>
                                    record.customer.name
                                }
                            />
                            <Column title="Phòng" dataIndex="rooms" key="rooms" align={'Left'}
                                render={(text, record, index) =>
                                    record.rooms.map(v => <h4>{v.no}</h4>)
                                }
                            />
                            <Column title="Ngày đến" dataIndex="start_date" key="start_date" align={'Left'}
                                render={(text, record, index) => moment(text).format('DD-MM-YYYY')}
                            />
                            <Column title="Ngày đi" dataIndex="end_date" key="end_date" align={'Center'}
                                render={(text, record, index) => moment(text).format('DD-MM-YYYY')}
                            />
                            <Column title="Ngày tạo" dataIndex="created_date" key="created_date" align={'Center'}
                                render={(text, record, index) => moment(text).format('DD-MM-YYYY')}
                            />
                            {/* <Column title="Đã hủy" dataIndex="status" key="status" align={'Center'}
                                render={(text, record, index) => text == 0 ? 'Có' : 'Không'}
                            /> */}
                            <Column title="Tiền cọc" dataIndex="deposit" key="deposit" align={'Left'}
                                render={(text, record, index) => <NumberFormat
                                    value={text}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    suffix={' VND'}
                                />
                                }
                            />
                            <Column title="Trạng thái" dataIndex="status" key="status" align={'Center'}
                                render={(text, record, index) => this.renderStatus(text)}
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