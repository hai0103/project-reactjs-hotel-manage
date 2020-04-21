import React from 'react'

class TableToolbar extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="panel-top">
            <div className="toolbar">
                <div className="toolbar-item add black-tooltip-main " data-toggle="tooltip" data-placement="bottom" title="Ctrl + 1" id="sub-open">
                    <span className="toolbar-icon icon-add" />
                    <span className="toolbar-text">Thêm mới</span>
                </div>
                <div className="toolbar-item double black-tooltip-main " data-toggle="tooltip" data-placement="bottom" title="Ctrl + 2">
                    <span className="toolbar-icon icon-double" />
                    <span>Nhân bản</span>
                </div>
                <div className="toolbar-item view black-tooltip-main" data-toggle="tooltip" data-placement="bottom" title="Ctrl + 3">
                    <span className="toolbar-icon icon-view" />
                    <span>Xem</span>
                </div>
                <div className="toolbar-item edit black-tooltip-main" data-toggle="tooltip" data-placement="bottom" title="Ctrl + E">
                    <span className="toolbar-icon icon-edit" />
                    <span>Sửa</span>
                </div>
                <div className="toolbar-item delete black-tooltip-main" data-toggle="tooltip" data-placement="bottom" title="Ctrl + D">
                    <span className="toolbar-icon icon-delete" />
                    <span>Xóa</span>
                </div>
                <div className="toolbar-item f5 black-tooltip-main" data-toggle="tooltip" data-placement="bottom" title="Ctrl + R">
                    <span className="toolbar-icon icon-refresh" />
                    <span>Nạp</span>
                </div>
            </div>
        </div>
        )
    }
}
export default TableToolbar