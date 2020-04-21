import React from 'react'
import { connect } from 'react-redux';
class Header extends React.Component{
    constructor(props){
        super(props)
        this.state={
            activeSub:false
        }
    }

    handleLogout=()=>{
        localStorage.clear();
        window.location.href="/dang-nhap"
    }

    render(){
        return(
            <header className="header-admin">
                <div className="left-side-header">
                    <p style={{marginTop:18}}>Hotel Mange</p>
                </div>
                {this.props.userApp.currentUser?
                    <div onClick={()=>this.setState({activeSub:!this.state.activeSub})} className="user-setting">
                        <img src="/icon/user.png" className="user-avatar"/>
                        <span onClick={()=>this.setState({activeSub:!this.state.activeSub})} className="user-name">{this.props.userApp.currentUser.userName}</span>
                        <img onClick={()=>this.setState({activeSub:!this.state.activeSub})} src ="/icon/icon-down.png" className="icon-down"/>
                        {
                            this.state.activeSub? 
                            <ul  className="sub-menu-setting">
                                <li onClick={this.handleLogout}>Đăng xuất</li>
                                <li>Thiết lập</li>
                            </ul>: ''
                        }
                        
                    </div>
                 :''}
               
            </header>
        )
    }
}
function mapStateToProps(state) {
    return {
      userApp: state.userApp
    };
  }
  
  export default connect(mapStateToProps)(Header);