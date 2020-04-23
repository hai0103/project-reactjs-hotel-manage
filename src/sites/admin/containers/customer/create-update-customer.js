import React from 'react'
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
    Form,
    DatePicker ,
    
} from 'antd';
import { toast } from 'react-toastify';
import customerProvider from '../../../../data-access/customer-provider'
import moment from 'moment'

const { Column } = Table;
const { Option } = Select;
class ModalAddUpdate extends React.Component {
    constructor(props) {
        super(props)

        this.state={
            customerID: this.props.data&&this.props.data.id?this.props.data.id:'',
            customerName: this.props.data&&this.props.data.name?this.props.data.name:'',
            customerCode: this.props.data&&this.props.data.no?this.props.data.no:'',
            email: this.props.data&&this.props.data.email?this.props.data.email:'',
            phoneNumber: this.props.data&&this.props.data.phone?this.props.data.phone:'',
            identityCard: this.props.data&&this.props.data.identity_card?this.props.data.identity_card:'',
            nationality: this.props.data&&this.props.data.nationality?this.props.data.nationality:'',
            address : this.props.data&&this.props.data.address?this.props.data.address:'',
            dob: this.props.data &&this.props.data.dob ? this.props.data.dob: new Date(),
            gender : this.props.data&&this.props.data.gender? this.props.data.gender:'',
            validName:true,
            validNo: true,
            validEmail:true,
            validNation:true,
            validCard: true
        }

    }

    createUpdateCustomer(){
        let payload = {
            no : this.state.customerCode,
            name : this.state.customerName,
            gender: this.state.gender,
            dob : this.state.dob,
            address: this.state.address,
            phone: this.state.phoneNumber,
            email: this.state.email,
            identity_card: this.state.identityCard,
            nationality: this.state.nationality
        }

        if(this.props.data&&this.props.data.id){
            customerProvider.update(this.state.customerID,payload).then(res=>{
                if(res.code==0){
                    toast.success("Cập nhật thành công",{
                        position:toast.POSITION.TOP_RIGHT
                    })
                    this.props.callBackOff()
                    this.props.refresh()
                }
                else{
                    toast.error("Cập nhật thất bại",{
                        position: toast.POSITION.TOP_RIGHT
                    })
                    this.props.callBackOff()
                    this.props.refresh()
                }
            }).catch(e=>{
                toast.error("Đã xảy ra lỗi, vui lòng thử lại",{
                    position: toast.POSITION.TOP_RIGHT
                })
            })
        }
        else{
            customerProvider.create(payload).then(res=>{
                switch(res.code){
                    case 0 :
                        toast.success("Tạo mới khách hàng thành công",{
                            position: toast.POSITION.TOP_RIGHT
                        })
                        this.props.callBackOff()
                        this.props.refresh()
                        break;
                    case 1 : 
                        toast.error("Tạo mới khách hàng không thành công",{
                            position: toast.POSITION.TOP_RIGHT
                        })
                        this.props.callBackOff()
                        this.props.refresh()
                        break;
                    case 2 : 
                        toast.error("CMND/CCCD đã tồn tại",{
                            position: toast.POSITION.TOP_RIGHT
                        })
                        break;
                    case 3: 
                        toast.error("Mã KH đã tồn tại",{
                            position: toast.POSITION.TOP_RIGHT
                        })
                        break;

                }
            }).catch(e=>{
                toast.error("Đã xảy ra lỗi, vui lòng thử lại",{
                    position: toast.POSITION.TOP_RIGHT
                })
            })
        }
    }


    render() {
        const{customerID,customerName,email,phoneNumber,identityCard,nationality, address, dob, gender,customerCode}=this.state
        console.log(this.props.data)    
        return (
        
            <div>
                <Modal
                    title={this.props.data&&this.props.data.id?"Cập nhật khách hàng":"Thêm mới khách hàng"}
                    width={"70%"}
                    visible={true}
                    onCancel={() => {
                        this.props.callBackOff()
                    }}
                    footer={
                        [
                            <Button key="back" onClick={() => this.setState({ showModalAdd: false })}>
                                Hủy
                                </Button>,
                            <Button onClick={()=>this.createUpdateCustomer()} type="danger" >
                                {this.props.data&&this.props.data.id? 'Cập nhật':'Thêm mới'}
                                </Button>,
                        ]
                    }
                >
                    <Card style={{ padding: 4 }} bordered={false}>
                        <Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Tên KH(*)</Typography>
                                <Input

                                    value={customerName}
                                    placeholder="Nhập tên KH"
                                    className={this.state.validName ? "border-none" : "border-red"}
                                    style={{ width: '70%' }}
                                    onChange={(val) => {
                                        this.setState({ customerName: val.target.value })
                                    }}
                                    onBlur={(val) => {
                                        if (val.target.value.length == 0) {
                                            this.setState({
                                                validName: false
                                            })
                                        }
                                        else {
                                            this.setState({
                                                validName: true
                                            })
                                        }
                                    }}
                                />

                            </Col>

                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Số CMND/CCCD(*)</Typography>
                                <Input
                                    value={identityCard}
                                    className={this.state.validCard ? "border-none" : "border-red"}
                                    placeholder="Nhập số CMND/CCCD"
                                    style={{ width: '70%' }}
                                    onChange={(val) => this.setState({ identityCard: val.target.value })}
                                    onBlur={(val) => {
                                        if (val.target.value.length == 0) {
                                            this.setState({
                                                validCard: false
                                            })
                                        }
                                        else {
                                            this.setState({
                                                validCard: true
                                            })
                                        }
                                    }}
                                />
                            </Col>
                        </Row>
                        
                        <Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Mã KH(*)</Typography>
                                <Input
                                    
                                    value = {customerCode}
                                    onChange = {(val)=>this.setState({customerCode:val.target.value})}
                                    placeholder="Nhập mã KH"
                                    style={{ width: '70%' }}
                               />
                            </Col>

                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Địa chỉ</Typography>
                               <Input
                                    
                                    value = {address}
                                    onChange = {(val)=>this.setState({address:val.target.value})}
                                    placeholder="Nhập địa chỉ"
                                    style={{ width: '70%' }}
                               />
                            </Col>
                        </Row>

                        <Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Quốc tịch(*)</Typography>
                                <Input
                                    value={this.state.nationality}
                                    className={this.state.validNation ? "border-none" : "border-red"}
                                    placeholder="Nhập quốc tịch"
                                    style={{ width: '70%' }}
                                    onChange={(val) => this.setState({ nationality: val.target.value })}
                                    onBlur={(val) => {
                                        if (val.target.value.length == 0) {
                                            this.setState({
                                                validNation: false
                                            })
                                        }
                                        else {
                                            this.setState({
                                                validNation: true
                                            })
                                        }
                                    }}
                                />
                            </Col>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Giới tính</Typography>
                                <Select
                                    allowClear
                                    value={gender}
                                    style={{ width: '70%' }}
                                    onChange={(val) => this.setState({ gender: val })}
                                >
                                    <Option  value={true}>Nam</Option>
                                    <Option  value={false}>Nữ</Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Ngày sinh</Typography>
                                <DatePicker value={moment(dob, 'YYYY-MM-DD')} format={'YYYY-MM-DD'} onChange={(dateString)=>this.setState({dob:dateString})} />
                            </Col>

                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Số điện thoại</Typography>
                               <Input
                                    
                                    value = {phoneNumber}
                                    onChange = {(val)=>this.setState({phoneNumber:val.target.value})}
                                    placeholder="Nhập số điện thoại"
                                    style={{ width: '70%' }}
                               />
                            </Col>
                        </Row>

                        <Row gutter={{ md: 12, lg: 12, xl: 12 }}>
                            <Col md={12} sm={12} xs={24} style={{ display: 'inline-flex' }}>
                                <Typography style={{ margin: '8px 0px', width: 130 }}>Email</Typography>
                                <Input
                                    value={email}
                                    placeholder="Nhập email"
                                    style={{ width: '70%' }}
                                onChange={(val)=>this.setState({email:val.target.value})} />
                            </Col>

                        </Row>
                    </Card>
                </Modal>
            </div>
        )
    }
}
export default ModalAddUpdate