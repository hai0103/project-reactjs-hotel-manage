import React from 'react'
import './style.css'
import { withStyles } from '@material-ui/core/styles';
import TableToolbar from '../../components/common/toolbar-top'
import { DatePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from 'moment';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

import userProvider from '../../../../data-access/user-provider'
import roleProvider from '../../../../data-access/role-provider'
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


// import ColumnResizer from "react-column-resizer";

class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModalAdd: false,
            showModalDetail: false,
            showModalDelete: false,
            confirmDialog: false,
            dataUser: {},
            data: [],
            listUserSelected: [],
            fromDate: new Date(),
            toDate: new Date(),
            page: 0,
            size: 10,
            total: 0,
            progress: false,

            dataRole:[],

            emailAdd: '',
            userNameAdd: '',
            passwordAdd: '',
            confirmPasswordAdd: '',
            roleAdd: '',

            emailEdit: '',
            userNameEdit: '',

            // search
            roleSearch:'',
            //validate
            validEmail:true,
            validPass:true,
            validName:true,
            validRePass:true
            
        }
    }

    componentDidMount() {
       this.loadPage()

        console.log(this.state.data)
    }

    loadPage() {
        // this.getAllUser();
        this.getUserByPage();
        this.getAllRole()
    }

    getAllRole(){
        
        roleProvider.getAll().then(res=>{
            console.log(res)
            if(res.code==0){
                this.setState({
                    dataRole:res.data
                })
            }
        }).catch(e=>{
            console.log(e)
        })
    }

    getAllUser() {
        this.setState({ progress: true })
        userProvider.getAll().then(res => {
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

    getUserByPage() {
        this.setState({ progress: true })
        let param = {
            pagesize: this.state.size,
            pagenumber: this.state.page
        }
        userProvider.getByPage(param).then(res => {
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

    handleAddUser() {
        let {
            emailAdd,
            passwordAdd,
            confirmPasswordAdd,
            userNameAdd,
            roleAdd
        } = this.state
        let payload = {
            Email: emailAdd,
            Password: passwordAdd,
            ConfirmPassword: confirmPasswordAdd,
            CreateDate: new Date(),
            UserName: userNameAdd,
            RoleName: roleAdd
        }
        if(this.state.validName&&this.state.validEmail&&this.state.validPass&&this.state.validRePass){
            userProvider.create(payload).then(res => {
                console.log(res)
                if (res.code == 0) {
                    switch (res.code) {
                        case 0:
                            toast.success("Tạo mới tài khoản thành công !", {
                                position: toast.POSITION.TOP_RIGHT
                            });
                            this.loadPage();
                            this.setState({ showModalAdd: false });
                            break;
                        default:
                            toast.error("Tạo mới tài khoản thất bại !", {
                                position: toast.POSITION.TOP_RIGHT
                            });
                            break;
                    }
                }
            }).catch(e => {
                toast.error("Tạo mới tài khoản thất bại !", {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
        }
        else{
            toast.error("Vui lòng nhập đúng thông tin !", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        

    }

    handleUpdateUser() {
        let {
            listUserSelected,
            emailEdit,
            userNameEdit
        } = this.state;
        let id = listUserSelected[0].UserId
        let payload = {
            Email: emailEdit,
            UserName: userNameEdit,
            PhoneNumber: ' '
        }

        userProvider.update(id, payload).then(res => {
            console.log(res)
            if (res.code == 0) {
                switch (res.code) {
                    case 0:
                        toast.success("Cập nhật tài khoản thành công !", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        this.loadPage();
                        this.setState({ showModalDetail: false });
                        break;
                    default:
                        toast.error("Cập nhật tài khoản thất bại !", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        break;
                }
            }
        }).catch(e => {
            toast.error("Cập nhật tài khoản thất bại !", {
                position: toast.POSITION.TOP_RIGHT
            });
        })

    }


    handleDeleteUser() {
        let {
            listUserSelected
        } = this.state;
        let listId = [];
        listUserSelected.map(v => listId.push(v.UserId));

        console.log(listId);

        userProvider.deleteUsers(listId).then(res => {
            console.log(res)
            if (res.code == 0) {
                switch (res.code) {
                    case 0:
                        toast.success("Xóa thành công !", {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        this.loadPage();
                        this.setState({ showModalDelete: false });
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


    closeModal() {
        this.loadPage();
        this.setState({ 
            openCreateModal: false,
         });
    }

    getAllUser(){
        this.setState({
            progress:true
        })
        userProvider.getAll().then(res=>{
            console.log(res)
            switch(res.code){
                case 0: 
                    this.setState({
                        data:res.data
                    })
                    this.setState({
                        progress:false
                    })
                    break;
                default:

            }
            if(res.status==401){
                toast.error("Bạn không có quyền, vui lòng liên hệ admin!",{
                    position:toast.POSITION.TOP_RIGHT
                })
                this.setState({
                    progress:false
                })
            }
        }).catch(e=>{
            console.log(e)
            this.setState({
                progress:false
            })
        })
    }

    modalCreateUpdate(item) {
        if (item) {
            this.setState({
                openCreateModal: true,
                dataUser: item
            })
        }
        else {
            this.setState({
                openCreateModal: true,
                dataUser: {}
            })
        }
    }

    handleChangeFilter(event, action) {
        if (action == 1) {
            this.setState({
                page: 0,
                name: event.target.value
            }, () => {
                if (this.clearTimeOutAffterRequest) {
                    try {
                        clearTimeout(this.clearTimeOutAffterRequest);

                    } catch (error) {

                    }
                }
                this.clearTimeOutAffterRequest = setTimeout(() => {
                    this.loadPage()
                }, 500)
            })
        }

        if (action == 2) {
            this.setState({
                page: 0,
                intervalTime: event.target.value
            }, () => {
                if (this.clearTimeOutAffterRequest) {
                    try {
                        clearTimeout(this.clearTimeOutAffterRequest);

                    } catch (error) {

                    }
                }
                this.clearTimeOutAffterRequest = setTimeout(() => {
                    this.loadPage()
                }, 500)
            })
        }

        if (action == 3) {
            this.setState({
                page: 0,
                createdUser: event.target.value
            }, () => {
                if (this.clearTimeOutAffterRequest) {
                    try {
                        clearTimeout(this.clearTimeOutAffterRequest);

                    } catch (error) {

                    }
                }
                this.clearTimeOutAffterRequest = setTimeout(() => {
                    this.loadPage()
                }, 500)
            })
        }
        if (action == 4) {
            this.setState({
                page: 0,
                fromDate: moment(event._d).format('YYYY-MM-DD')
            }, () => {
                if (this.clearTimeOutAffterRequest) {
                    try {
                        clearTimeout(this.clearTimeOutAffterRequest);

                    } catch (error) {

                    }
                }
                this.clearTimeOutAffterRequest = setTimeout(() => {
                    this.loadPage()
                }, 500)
            })
        }
        if (action == 5) {
            this.setState({
                page: 0,
                toDate: moment(event._d).format('YYYY-MM-DD')
            }, () => {
                if (this.clearTimeOutAffterRequest) {
                    try {
                        clearTimeout(this.clearTimeOutAffterRequest);

                    } catch (error) {

                    }
                }
                this.clearTimeOutAffterRequest = setTimeout(() => {
                    this.loadPage()
                }, 500)
            })
        }
    }

    showModalDelete(item) {
        this.setState({
            confirmDialog: true,
            tempDelete: item
        })
    }

    render() {
        const classes = this.props;
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ listUserSelected: selectedRows })
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
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
            dataRole
        } = this.state
        return (
            <div className="content-area">

                <div className="panel-top">
                    <div className="toolbar">
                        <div
                            className="toolbar-item add black-tooltip-main "
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Ctrl + 1"
                            id="sub-open"
                            onClick={() => this.setState({ showModalAdd: true })}
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
                        <div className={this.state.listUserSelected.length>0?"toolbar-item edit black-tooltip-main": "toolbar-item edit black-tooltip-main disable-toolbar" }
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Ctrl + E"
                            onClick={() => {
                                if(this.state.listUserSelected&&this.state.listUserSelected.length>0){
                                    this.setState({
                                        emailEdit: this.state.listUserSelected[0].Email,
                                        userNameEdit: this.state.listUserSelected[0].UserName,
                                        showModalDetail: true
                                    })
                                }
                               
                            }}
                        >
                            <span className="toolbar-icon icon-edit" />
                            <span>Sửa</span>

                        </div>
                        <div
                            className={this.state.listUserSelected.length>0?"toolbar-item delete black-tooltip-main": "toolbar-item delete black-tooltip-main disable-toolbar" }
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Ctrl + D"
                            onClick={() => this.setState({ showModalDelete: true })}
                        >
                            <span className="toolbar-icon icon-delete" />
                            <span>Xóa</span>
                        </div>
                        <div className="toolbar-item f5 black-tooltip-main"
                            data-toggle="tooltip"
                            data-placement="bottom"
                            title="Ctrl + R"
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
                                <Typography style={{ margin: '8px 0px', width: 130 }}>User Name</Typography>
                                <Input
                                    placeholder="Nhập User Name"
                                    style={{ width: '70%' }}
                                />
                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Email</Typography>
                                <Input
                                    placeholder="Nhập Email"
                                    style={{ width: '70%' }}
                                />
                            </Col>
                        </Row>
                        <Row gutter={{
                            md: 24,
                            lg: 24,
                            xl: 24
                        }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Quyền</Typography>
                                <Select
                                    defaultValue=""
                                    value={this.state.roleSearch}
                                    style={{ width: '70%' }}
                                    
                                    onChange={(value) => this.setState({roleSearch:`${value}`}) }>
                                    {dataRole&&dataRole.length>0&&dataRole.map((item,index)=>{
                                        return(
                                            <Option key={index} value={item.Name}>{item.Name}</Option>
                                            
                                        )
                                    })}
                                   
                                </Select>
                            </Col>
                            <Col md={12} sm={24} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Tình trạng xác nhận email</Typography>
                                <Select
                                    defaultValue=""
                                    style={{ width: '70%' }}
                                    onChange={() => { }}>
                                    <Option value="yes">Đã xác nhận</Option>
                                    <Option value="no">Chưa xác nhận</Option>
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
                                >
                                    Tìm kiếm
                                    </Button>
                            </Col>
                        </Row>




                    </Card>
                </div>

                <div className="table-list">
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
                                        this.setState({ size: pageSize, page: current - 1 }, () => this.getUserByPage())
                                    },
                                    onChange: (value) => {
                                        console.log(value)
                                        this.setState({ page: value - 1 }, () => this.getUserByPage())
                                    }
                                }
                            }
                            bordered
                            scroll={{ y: 400 }}
                        >
                            <Column title="STT" key="index" width={90} align={'Center'}
                                render={(text, record, index) => index}
                            />
                            <Column title="User Name" dataIndex="UserName" key="UserName" align={'Left'}
                                render={(text, record, index) => text}
                            />
                            <Column title="Email" dataIndex="Email" key="Email" align={'Left'}
                                render={(text, record, index) => text}
                            />
                            <Column title="Ngày tạo" dataIndex="CreateDate" key="CreateDate" align={'Center'}
                                render={(text, record, index) => moment(text).format('DD-MM-YYYY')}
                            />
                            {/* <Column title="Đã xác nhận email" dataIndex="EmailConfirmed" key="EmailConfirmed" align={'Center'}
                                render={(text, record, index) => text ? 'Đã xác nhận' : 'Chưa xác nhận'}
                            /> */}
                            <Column title="Quyền" dataIndex="Roles" key="Roles" align={'Center'}
                                render={(text, record, index) => record.Roles.map(x=>x.Name)}
                            />

                        </Table>

                        {/* Modalllllllllllllllllllllllllllllllllllllllllllllllll */}

                        <Modal
                            title="Thêm mới user"
                            width={"50%"}
                            visible={this.state.showModalAdd}
                            onCancel={() => {
                                this.setState({ showModalAdd: false })
                            }}
                            footer={
                                [
                                    <Button key="back" onClick={() => this.setState({ showModalAdd: false })}>
                                        Hủy
                                </Button>,
                                    <Button key="submit"  htmlType="submit" type="danger" onClick={() => this.handleAddUser()}>
                                        Thêm mới
                                </Button>,
                                ]
                            }
                        >
                            <Card style={{ padding: 4 }} bordered={false}>
                                <Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                                    <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                        <Typography style={{ margin: '8px 0px', width: 130 }}>Email(*)</Typography>
                                        <Input

                                            value={this.state.emailAdd}
                                            placeholder="Nhập email"
                                            className={this.state.validEmail?"border-none":"border-red"}
                                            style={{ width: '70%'}}
                                            onChange={(val) => {
                                                this.setState({ emailAdd: val.target.value })
                                            }}
                                            onBlur = {(val)=>{
                                                if(val.target.value.length==0){
                                                    this.setState({
                                                        validEmail: false
                                                    })
                                                }
                                                else{
                                                    this.setState({
                                                        validEmail:true
                                                    })
                                                }
                                            }}
                                        />
                                        
                                    </Col>
                             
                                    <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                        <Typography style={{ margin: '8px 0px', width: 130 }}>User name(*)</Typography>
                                        <Input
                                            value={this.state.userNameAdd}
                                            className={this.state.validName?"border-none":"border-red"}
                                            placeholder="Nhập username"
                                            style={{ width: '70%' }}
                                            onChange={(val) => this.setState({ userNameAdd: val.target.value })}
                                            onBlur = {(val)=>{
                                                if(val.target.value.length==0){
                                                    this.setState({
                                                        validName: false
                                                    })
                                                }
                                                else{
                                                    this.setState({
                                                        validName:true
                                                    })
                                                }
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                                    <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                        <Typography style={{ margin: '8px 0px', width: 130 }}>Mật khẩu(*)</Typography>
                                        <Input
                                            value={this.state.passwordAdd}
                                            className={this.state.validPass?"border-none":"border-red"}
                                            placeholder="Nhập mật khẩu"
                                            style={{ width: '70%' }}
                                            onChange={(val) => this.setState({ passwordAdd: val.target.value })}
                                            onBlur = {(val)=>{
                                                if(val.target.value.length<8){
                                                    this.setState({
                                                        validPass: false
                                                    })
                                                }
                                                else{
                                                    this.setState({
                                                        validPasss:true
                                                    })
                                                }
                                            }}
                                        />
                                    </Col>
                                    <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                        <Typography style={{ margin: '8px 0px', width: 130 }}>Quyền</Typography>
                                        <Select
                                            allowClear
                                            value={this.state.roleAdd}
                                            style={{ width: '70%' }}
                                            onChange={(val) => this.setState({ roleAdd: val })}
                                        >
                                            {dataRole&&dataRole.length>0&&dataRole.map((item,index)=>{
                                                return(
                                                    <Option key={index} value={item.Name}>{item.Name}</Option>
                                                )
                                            })}
                                        </Select>
                                    </Col>
                                </Row>
                                <Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                                    <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                        <Typography style={{ margin: '8px 0px', width: 130 }}>Nhập lại mật khẩu</Typography>
                                        <Input
                                            value={this.state.confirmPasswordAdd}
                                            className={this.state.validRePass?"border-none":"border-red"}
                                            placeholder="Xác nhận mật khẩu"
                                            style={{ width: '70%' }}
                                            onChange={(val) => this.setState({ confirmPasswordAdd: val.target.value })}
                                            onBlur = {(val)=>{
                                                if(val.target.value.length==0||val.target.value!=this.state.passwordAdd){
                                                    this.setState({
                                                        validRePass: false
                                                    })
                                                }
                                                else{
                                                    this.setState({
                                                        validRePass:true
                                                    })
                                                }
                                            }}
                                        />
                                    </Col>
                                </Row>
                            </Card>
                        </Modal>


                        <Modal
                            title="Sửa thông tin user"
                            width={"50%"}
                            visible={this.state.showModalDetail}
                            onCancel={() => {
                                this.setState({ showModalDetail: false })
                            }}
                            footer={
                                [
                                    <Button key="back" onClick={() => this.setState({ showModalDetail: false })}>
                                        Hủy
                                </Button>,
                                    <Button key="submit" htmlType="submit" type="danger" onClick={() => this.handleUpdateUser()}>
                                        Cập nhật
                                </Button>,
                                ]
                            }
                        >
                            <Card style={{ padding: 4 }} bordered={false}>
                                <Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                                    <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                        <Typography style={{ margin: '8px 0px', width: 130 }}>Email</Typography>
                                        <Input
                                            value={this.state.emailEdit}
                                            placeholder="Nhập email"
                                            style={{ width: '70%' }}
                                            onChange={(val) => {
                                                this.setState({ emailEdit: val.target.value })
                                            }}
                                        />

                                    </Col>
                                    <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                        <Typography style={{ margin: '8px 0px', width: 130 }}>User name</Typography>
                                        <Input
                                            value={this.state.userNameEdit}
                                            placeholder="Nhập username"
                                            style={{ width: '70%' }}
                                            onChange={(val) => this.setState({ userNameEdit: val.target.value })}
                                        />
                                    </Col>
                                </Row>

                            </Card>
                        </Modal>



                        <Modal
                            title="Xác nhận xóa"
                            width={"20%"}
                            visible={this.state.showModalDelete}
                            onCancel={() => {
                                this.setState({ showModalDelete: false })
                            }}
                            footer={
                                [
                                    <Button key="back" onClick={() => this.setState({ showModalDelete: false })}>
                                        Hủy
                                </Button>,
                                    <Button key="submit" type="danger" onClick={() => this.handleDeleteUser()}>
                                        Xóa
                                </Button>,
                                ]
                            }
                        >
                            {this.state.listUserSelected.map((item, index) => <p>{index + 1 + '. ' + item.UserName}</p>)}
                        </Modal>
                    </Spin>
                </div>

            </div >
        )
    }
}
export default User