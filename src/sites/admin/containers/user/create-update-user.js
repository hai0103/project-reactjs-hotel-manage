import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Dialog from '@material-ui/core/Dialog';
// import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ModalAddUpdate extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            disabled:false,
            labelError:false,
            open: true,
            dataUser: this.props.data,
        }
        this.data = JSON.stringify(this.props.data);
        this.data2 = this.props.data;
    }

    componentDidMount() {
        console.log(this.props.data)
    }

    componentWillUnmount() {
        // remove rule when it is not needed
    }

    render(){
        const {open} = this.state
        return(
            <Dialog open={open}
                    TransitionComponent={Transition}
                    fullWidth="lg"
                    maxWidth="lg"
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
            >       
                  <DialogTitle>Thêm mới người dùng</DialogTitle>
                  <DialogContent>
                      Thêm mới hihii
                  </DialogContent>
            </Dialog>
        )
    }
}
export default ModalAddUpdate