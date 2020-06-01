import React from 'react'
import roomProvider from '../../../../data-access/room-provider'
import typeRoomProvider from '../../../../data-access/typeroom-provider'
import { withStyles } from '@material-ui/core/styles';
import './style.css'
import moment from 'moment';
import ColumnResizer from "react-column-resizer";
import { toast } from 'react-toastify';

import ModalAddRoom from './create';
import ModalDeleteRoom from './delete';
import ModalDetailRoom from './detail';
import ModalUpdateRoom from './update';

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


class Room extends React.Component {
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
            listRoomSelected: [],
            listTypeRoom: [],
            page: 0,
            size: 10,
            total: 0,
            progress: false,

            searchTerm: '',
            sortColumn: '',
            sortOrder: '',

            roomNo: '',
            typeRoomId: '',
            status: '',
            statusStay: '',
            nop: '',

        }
    }

    componentDidMount() {
        this.loadPage();
        console.log(this.state.data)
    }

    loadPage() {
        this.setState({
            roomNo: '',
            typeRoomId: '',
            status: '',
            statusStay: '',
            page: 0,
            size: 10
        }, () => {
            this.getRoomOnSearch();
            this.getAllTypeRoom();

        })
    }

    getAllTypeRoom() {
        typeRoomProvider.getAll().then(res => {
            console.log(res)
            if (res.code == 0) {
                this.setState({
                    listTypeRoom: res.data,
                }, () => {
                    console.log('aaaaaa', this.state.listTypeRoom)
                })
            } else {
                this.setState({
                    listTypeRoom: []
                })
            }

        }).catch(e => {
            console.log(e)

        })
    }

    getRoomOnSearch() {
        this.setState({ progress: true })
        let {
            page,
            size,
            roomNo,
            typeRoomId,
            status,
            statusStay,
            nop,
        } = this.state;

        let payload = {
            page: page,
            size: size,
            roomNo,
            roomTypeId: typeRoomId ? typeRoomId : '',
            status,
            statusStay,
        };
        console.log(payload);
        roomProvider.searchAndPaging(payload).then(res => {
            console.log(res)
            this.setState({
                data: res.data.content,
                total: res.data.totalElements,
            }, () => {
                this.setState({ progress: false })
            })
        }).catch(e => {
            console.log(e)
            this.setState({ progress: false })
        })
    }


    closeModal() {
        this.loadPage();
        this.setState({ openCreateModal: false });
    }

    modalCreateUpdate(item) {
        if (item) {
            this.setState({
                openCreateModal: true,
                dataUser: item
            })
        } else {
            this.setState({
                openCreateModal: true,
                dataUser: {}
            })
        }
    }

    showModalDelete(item) {
        this.setState({
            confirmDialog: true,
            tempDelete: item
        })
    }

    renderStatus = (status) => {
        switch (status) {
            case 'CLEAN':
                return 'Sạch';
            case 'DIRTY':
                return 'Bẩn';
            case 'CLEANING':
                return 'Đang dọn';
            default:
                return '';
        }
    }


    // renderStatus = (status) => {
    //     switch (status) {
    //         case 0:
    //             return <h6><span className="badge badge-warning">Chưa thanh toán</span></h6>;
    //         case 1:
    //             return <h6><span className="badge badge-success">Đã thanh toán</span></h6>;
    //         case 2:
    //             return <h6><span className="badge badge-warning">Quá hạn thanh toán</span></h6>;
    //         default:
    //             return '';
    //     }
    // };

    renderStatusStay = (status) => {
        switch (status) {
            case 'EMPTY':
                // return 'Trống';
                return <h6><span className="badge badge-success">Trống</span></h6>;
            case 'USING':
                // return 'Đã có người';
                return <h6><span className="badge badge-warning">Đã có người</span></h6>;
            default:
                return '';
        }
    }

    render() {

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ listRoomSelected: selectedRows });
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };

        const classes = this.props;
        const {
            modalAdd,
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
                        <div className="toolbar-item add black-tooltip-main " data-toggle="tooltip"
                            data-placement="bottom" title="Ctrl + 1" id="sub-open"
                            onClick={() => this.setState({ showModalAdd: true })}
                        >
                            <span className="toolbar-icon icon-add" />
                            <span className="toolbar-text">Thêm mới</span>

                        </div>
                        {/* <div className="toolbar-item double black-tooltip-main" data-toggle="tooltip" data-placement="bottom" title="Ctrl + 2">
                            <span className="toolbar-icon icon-double" />
                            <span>Nhân bản</span>
                        </div> */}
                        <div
                            className={this.state.listRoomSelected.length == 1 ? "toolbar-item edit black-tooltip-main" : "toolbar-item edit black-tooltip-main disable-toolbar"}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Ctrl + 3"
                            onClick={() => {
                                if (this.state.listRoomSelected.length == 1)
                                    this.setState({ showModalDetail: true })
                            }}
                        >
                            <span className="toolbar-icon icon-view" />
                            <span>Xem</span>
                        </div>
                        <div
                            className={this.state.listRoomSelected.length == 1 ? "toolbar-item edit black-tooltip-main" : "toolbar-item edit black-tooltip-main disable-toolbar"}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Ctrl + 3"
                            onClick={() => {
                                if (this.state.listRoomSelected.length == 1)
                                    this.setState({ showModalUpdate: true })
                            }}
                        >
                            <span className="toolbar-icon icon-edit" />
                            <span>Sửa</span>
                        </div>
                        <div
                            className={this.state.listRoomSelected.length > 0 ? "toolbar-item edit black-tooltip-main" : "toolbar-item edit black-tooltip-main disable-toolbar"}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Ctrl + 3"
                            onClick={() => {
                                if (this.state.listRoomSelected.length != 0)
                                    this.setState({ showModalDelete: true })
                            }}
                        >
                            <span className="toolbar-icon icon-delete" />
                            <span>Xóa</span>
                        </div>
                        <div className="toolbar-item f5 black-tooltip-main" data-toggle="tooltip"
                            data-placement="bottom" title="Ctrl + R"
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
                                <Typography style={{ margin: '6px 0px', width: 130 }}>Mã phòng</Typography>
                                <Input
                                    allowClear
                                    value={this.state.roomNo}
                                    placeholder="Nhập mã phòng"
                                    style={{ width: '70%' }}
                                    onChange={(val) => {
                                        this.setState({ roomNo: val.target.value })
                                    }}
                                />
                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Loại phòng</Typography>
                                <Select
                                    allowClear
                                    defaultValue=""
                                    value={this.state.typeRoomId}
                                    style={{ width: '70%' }}
                                    onChange={(val) => {
                                        this.setState({ typeRoomId: val })
                                    }}>
                                        <Option value=''>Tất cả</Option>
                                    {this.state.listTypeRoom.map((item, index) =>
                                        <Option value={item.id}>{item.description}</Option>
                                    )}
                                </Select>
                            </Col>
                        </Row>
                        <Row gutter={{
                            md: 24,
                            lg: 24,
                            xl: 24
                        }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Trạng thái ở</Typography>
                                <Select
                                    allowClear
                                    defaultValue=""
                                    value={this.state.statusStay}
                                    style={{ width: '70%' }}
                                    onChange={(val, e) => {
                                        this.setState({ statusStay: val })
                                    }}
                                >
                                    <Option value=''>Tất cả</Option>
                                    <Option value="EMPTY">Trống</Option>
                                    <Option value="USING">Đã có người</Option>
                                </Select>
                            </Col>
                            <Col md={12} sm={24} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Tình trạng phòng</Typography>
                                <Select
                                    allowClear
                                    defaultValue=""
                                    value={this.state.status}
                                    style={{ width: '70%' }}
                                    onChange={(val, e) => {
                                        this.setState({ status: val })
                                    }}
                                >
                                    <Option value=''>Tất cả</Option>
                                    <Option value="CLEAN">Sạch</Option>
                                    <Option value="DIRTY">Bẩn</Option>
                                    <Option value="CLEANING">Đang dọn</Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row gutter={{
                            md: 8,
                            lg: 24,
                            xl: 24
                        }}>
                            <Col md={12} sm={24} xs={24}>
                                <Button
                                    style={{ margin: '8px 0px' }}
                                    onClick={() => this.getRoomOnSearch()}
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
                                        this.setState({ size: pageSize, page: current - 1 }, () => this.getRoomOnSearch())
                                    },
                                    onChange: (value) => {
                                        console.log(value)
                                        this.setState({ page: value - 1 }, () => this.getRoomOnSearch())
                                    }
                                }
                            }
                            bordered
                            scroll={{ y: 400 }}
                        >
                            <Column title="STT" key="index" width={90} align={'Center'}
                                render={(text, record, index) => (this.state.page) * this.state.size + index + 1}
                            />
                            <Column title="Mã phòng" dataIndex="no" key="no" align={'Left'}
                                render={(text, record, index) => text}
                            />
                            <Column title="Tên phòng" dataIndex="name" key="name" align={'Left'}
                                render={(text, record, index) => text}
                            />
                            <Column title="Số người" dataIndex="nop" key="nop" align={'Center'}
                                render={(text, record, index) => text}
                            />
                            {/* <Column title="Tầng" dataIndex="Floor" key="Floor" align={'Center'}
                                    render={(text, record, index) => text}
                            /> */}
                            {/* <Column title="Giá" dataIndex="Price" key="Price" align={'Center'}
                            render={(text, record, index) => text}
                        /> */}
                            <Column title="Loại phòng" dataIndex="typeroom" key="typeroom" align={'Center'}
                                render={(text, record, index) => record.typeroom.description}
                            />
                            <Column title="Trạng thái ở" dataIndex="status" key="status" align={'Center'}
                                render={(text, record, index) => this.renderStatus(text)

                                }
                            />
                            <Column title="Tình trạng phòng" dataIndex="statusStay" key="statusStay" align={'Center'}
                                render={(text, record, index) => this.renderStatusStay(text)

                                }
                            />
                        </Table>
                    </Spin>

                    {this.state.showModalAdd && <ModalAddRoom loadPage={() => this.loadPage()}
                        closeModal={() => this.setState({ showModalAdd: false })} />}
                    {this.state.showModalDelete &&
                        <ModalDeleteRoom listRoom={this.state.listRoomSelected} loadPage={() => this.loadPage()}
                            closeModal={() => this.setState({ showModalDelete: false })} />}
                    {this.state.showModalDetail && <ModalDetailRoom listRoom={this.state.listRoomSelected}
                        closeModal={() => this.setState({ showModalDetail: false })} />}
                    {this.state.showModalUpdate &&
                        <ModalUpdateRoom listRoom={this.state.listRoomSelected} loadPage={() => this.loadPage()}
                            closeModal={() => this.setState({ showModalUpdate: false })} />}
                </div>

            </div>
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


export default withStyles(styles)(Room)
