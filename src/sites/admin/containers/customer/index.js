import React from 'react'
import moment from 'moment';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import './customer.css'
import customerProvider from '../../../../data-access/customer-provider'
import roleProvider from '../../../../data-access/role-provider'
import ModalAddUpdate from './create-update-customer'
import ConfirmDialog from '../../components/confirm/index'
import {
    Table,
    Select,
    Typography,
    Card,
    Row,
    Col,
    Button,
    Input,
    Spin,
    Modal,
    Form
} from 'antd';
import { toast } from 'react-toastify';

const { Column } = Table;
const { Option } = Select;

class Customer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listUserSelected: [],
            progress: true,
            data:[],
            page:0,
            size:10,
            total:0,
            openAddUpdate : false,
            dataCustomer:{},
            confirmDialog:false,
            name:'',
            code:'',
            identity:'',
            gender:''
        }
    }

    componentDidMount(){
        this.loadPage()
    }

    loadPage(){
        this.getCustomerByPage()
    }

    search=()=>{
        let param = {
            customerName : this.state.name,
            customerNo: this.state.code,
            identityCard: this.state.identity,
            gender: this.state.gender

        }
        customerProvider.search(param).then(res=>{
            console.log(res)
            if(res.code==0){
                this.setState({
                    data: res.data
                })
            }
        }).catch(e=>{
            console.log(e)
        })
    }

    getCustomerByPage() {
        this.setState({ progress: true })
        let param = {
            pagesize: this.state.size,
            pagenumber: this.state.page
        }
        customerProvider.getByPage(param).then(res => {
            console.log(res)
            if(res.code==0){
                this.setState({
                    data: res.data.Results,
                    total: res.data.TotalNumberOfRecords,
                    // totalPerPage:res.Data.TotalNumberOfRecords
                })
                this.setState({ progress: false })
            }
           
        }).catch(e => {
            console.log(e)
            this.setState({ progress: false })
        })
    }

    closeModal = ()=>{
        this.setState({
            openAddUpdate:false
        })
    }

    showModalDelete(item) {
        this.setState({
            confirmDialog: true,
            // tempDelete: item
        })
    }

    delete(type) {
        let {
            listUserSelected
        } = this.state;
        let listId = [];
        listUserSelected.map(v => listId.push(v.CustomerID));

        console.log(listId);
        
        if(type==1){
            customerProvider.delete(listId).then(res => {
                console.log(res)
                if (res.code == 0) {
                    switch (res.code) {
                        case 0:
                            toast.success("Xóa thành công !", {
                                position: toast.POSITION.TOP_RIGHT
                            });
                            this.loadPage();
                            this.setState({ confirmDialog: false });
                            break;
                        default:
                            toast.error("Xóa thất bại !", {
                                position: toast.POSITION.TOP_RIGHT
                            });
                            break;
                    }
                }
            }).catch(e => {
                toast.error("Xóa thất bại !", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
        }
        

    }


    render() {
        const {
            confirmDialog,
            dataUser,
            fromDate,
            toDate,
            listUserSelected,
            data,
            progress,
            page,
            size,
            total,
            openAddUpdate,
            dataCustomer,
            dataCustomer2,
            dataRole
        } = this.state

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(selectedRows)
                this.setState({listUserSelected:selectedRows, dataCustomer: selectedRows[0],dataCustomer2:selectedRows[0] })
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };

        return (
            <div className="content-area content-customer">

                <div className="panel-top">
                    <div className="toolbar">
                        <div
                            className="toolbar-item add black-tooltip-main "
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Ctrl + 1"
                            id="sub-open"
                            
                             onClick={() => this.setState({ openAddUpdate: true,dataCustomer:{} })}
                        >
                            <span className="toolbar-icon icon-add" />
                            <span className="toolbar-text">Thêm mới</span>
                        </div>
                        <div className="toolbar-item view black-tooltip-main"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Ctrl + 3"
                        >
                            <span className="toolbar-icon icon-view" />
                            <span>Xem</span>
                        </div>
                        <div className={this.state.listUserSelected && this.state.listUserSelected.length > 0 ? "toolbar-item edit black-tooltip-main" : "toolbar-item edit black-tooltip-main disable-toolbar"}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Ctrl + E"
                            onClick={() => this.setState({ openAddUpdate: true,dataCustomer:this.state.dataCustomer2})}
                        >
                            <span className="toolbar-icon icon-edit" />
                            <span>Sửa</span>

                        </div>
                        <div
                            className={this.state.listUserSelected.length > 0 ? "toolbar-item delete black-tooltip-main" : "toolbar-item delete black-tooltip-main disable-toolbar"}
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Ctrl + D"
                            onClick={() => this.setState({ confirmDialog: true })}
                        >
                            <span className="toolbar-icon icon-delete" />
                            <span>Xóa</span>
                        </div>
                        <div className="toolbar-item f5 black-tooltip-main"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Ctrl + R"
                            onClick = {()=>this.loadPage()}
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
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Tên KH</Typography>
                                <Input
                                    value={this.state.name}
                                    placeholder="Nhập tên KH"
                                    style={{ width: '70%' }}
                                    onChange = {(val)=> this.setState({name:val.target.value })}
                                />
                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Số CMND</Typography>
                                <Input
                                    value={this.state.identity}
                                    placeholder="Nhập số CMND"
                                    style={{ width: '70%' }}
                                    onChange = {(val)=> this.setState({identity: val.target.value})}
                                />
                            </Col>
                        </Row>
                        <Row gutter={{
                            md: 24,
                            lg: 24,
                            xl: 24
                        }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Mã KH</Typography>
                            
                                <Input
                                    value={this.state.code}
                                    placeholder="Nhập mã KH"
                                    style={{ width: '70%' }}
                                    onChange = {(val)=> this.setState({code :val.target.value})}
                                />
                            </Col>
                            <Col md={12} sm={24} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Giới tính</Typography>
                                <Select
                                    defaultValue=""
                                    style={{ width: '70%' }}
                                    onChange={(val) => {this.setState({gender:val}) }}>
                                    <Option value={true}>Nam</Option>
                                    <Option value={false}>Nữ</Option>
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
                                    onClick={this.search}
                                >
                                    Tìm kiếm
                                    </Button>
                            </Col>
                        </Row>




                    </Card>
                </div>


                <div className="table-data">
                <Spin spinning={progress}>
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
                                        this.setState({ size: pageSize, page: current - 1 }, () => this.getCustomerByPage())
                                    },
                                    onChange: (value) => {
                                        console.log(value)
                                        this.setState({ page: value - 1 }, () => this.getCustomerByPage())
                                    }
                                }
                            }
                            bordered
                            scroll={{ y: 400 }}
                        >
                            <Column title="STT" key="index" width={90} align={'Center'}
                                render={(text, record, index) => index}
                            />

                            <Column title="Ngày sinh" key="Dob" dataIndex="Dob" width={180} align={'Center'}
                                render={(text, record, index) => moment(text).format('DD-MM-YYYY')}
                            />


                            <Column title="Mã KH" dataIndex="CustomerNo" key="No" align={'Left'}
                                render={(text, record, index) => text}
                            />

                            <Column title="Tên KH" dataIndex="Name" key="Name" align={'Left'}
                                render={(text, record, index) => text}
                            />
                            <Column title="Email" dataIndex="Email" key="Email" align={'Left'}
                                render={(text, record, index) => text}
                            />
                            <Column title="Số CMND" dataIndex="IdentityCard" key="IdentityCard" align={'Center'}
                                render={(text, record, index) => text}
                            />
                            <Column title="Địa chỉ" dataIndex="Address" key="Address" align={'Center'}
                                render={(text, record, index) => text }
                            />
                            <Column title="Quốc tịch" dataIndex="Nationality" key="Nationality" align={'Center'}
                                render={(text, record, index) => text}
                            />

                        </Table>
                        </Spin>
                </div>
                {this.state.confirmDialog && <ConfirmDialog title="Xác nhận" content={"Bạn có chắc chắn muốn xóa " +this.state.listUserSelected.length+ " khách hàng?"} btnOk="Xác nhận" btnCancel="Hủy" cbFn={this.delete.bind(this)} />}
                {openAddUpdate&&<ModalAddUpdate data = {dataCustomer} refresh={this.loadPage.bind(this)} callBackOff ={this.closeModal.bind(this)}/>}
            </div>
        )
    }
}
export default Customer