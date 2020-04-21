import React from 'react'
import equipmentProvider from '../../../../data-access/equipment-provider';
import deviceProvider from '../../../../data-access/device-provider';
import roomProvider from '../../../../data-access/room-provider';
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


class Equipment extends React.Component {
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
            listEquipSelected: [],
            listRoom: [],
            listDevice: [],
            page: 0,
            size: 10,
            total: 0,
            progress: false,

            roomId: '',
            deviceId: ''

        }
    }

    componentDidMount() {
        this.loadPage();
        console.log(this.state.data)
    }

    loadPage() {
        this.getAllEquipment();
        this.getAllDevice();
        this.getAllRoom();
    }

    getAllEquipment() {
        this.setState({ progress: true })
        equipmentProvider.getAll().then(res => {
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

    getAllDevice() {

        deviceProvider.getAll().then(res => {
            console.log(res)
            if (res.code == 0) {
                this.setState({
                    listDevice: res.data,
                })
            }
            else {
                this.setState({
                    listDevice: []
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
                this.setState({ listEquipSelected: selectedRows });
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
                            className={this.state.listEquipSelected.length == 1 ? "toolbar-item edit black-tooltip-main" : "toolbar-item edit black-tooltip-main disable-toolbar"}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Ctrl + 3"
                            onClick={() => {
                                if (this.state.listEquipSelected.length == 1)
                                    this.setState({ showModalDetail: true })
                            }}
                        >
                            <span className="toolbar-icon icon-view" />
                            <span>Xem</span>
                        </div>
                        <div
                            className={this.state.listEquipSelected.length == 1 ? "toolbar-item edit black-tooltip-main" : "toolbar-item edit black-tooltip-main disable-toolbar"}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Ctrl + 3"
                            onClick={() => {
                                if (this.state.listEquipSelected.length == 1)
                                    this.setState({ showModalUpdate: true })
                            }}
                        >
                            <span className="toolbar-icon icon-edit" />
                            <span>Sửa</span>
                        </div>
                        <div
                            className={this.state.listEquipSelected.length > 0 ? "toolbar-item edit black-tooltip-main" : "toolbar-item edit black-tooltip-main disable-toolbar"}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Ctrl + 3"
                            onClick={() => {
                                if (this.state.listEquipSelected.length != 0)
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
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Thiết bị</Typography>
                                <Select
                                    placeholder="Chọn thiết bị"
                                    style={{
                                        width: '70%'
                                    }}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    showSearch
                                    allowClear
                                    onChange={(val, e) => {
                                        console.log(val)
                                        this.setState({ deviceId: val });
                                    }}
                                >
                                    {this.state.listDevice.map(v =>
                                        <Option value={v.DeviceID} key={v.DeviceID}>{v.DeviceName}</Option>)

                                    }
                                </Select>
                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Mã phòng</Typography>
                                <Select
                                    placeholder="Chọn mã phòng"
                                    style={{
                                        width: '70%'
                                    }}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    showSearch
                                    allowClear
                                    onChange={(val, e) => {
                                        console.log(val)
                                        this.setState({ roomId: val });
                                    }}
                                >
                                    {this.state.listRoom.map(v =>
                                        <Option value={v.RoomID} key={v.RoomID}>{v.RoomName}</Option>)

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
                            <Column title="Tên thiết bị" dataIndex="DeviceID" key="DeviceID" align={'Left'}
                                render={(text, record, index) =>
                                    record.Device.DeviceName
                                }
                            />
                            <Column title="Phòng" dataIndex="Quantity" key="Quantity" align={'Left'}
                                render={(text, record, index) => record.Room.RoomName}
                            />
                            <Column title="Số lượng" dataIndex="Quantity" key="Quantity" align={'Left'}
                                render={(text, record, index) => text}
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


export default withStyles(styles)(Equipment)