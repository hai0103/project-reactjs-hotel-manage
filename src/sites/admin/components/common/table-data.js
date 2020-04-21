import React from 'react'

class TableData extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="table-data">
                <table class="table">
                    <thead>
                        <tr>
                            {this.props.dataHead&&this.props.dataHead.length>0&&
                                this.props.dataHead.map((item,index)=>{
                                    return(
                                        <th key={index}>{item.name}</th>
                                    )
                                    
                                })
                            }
                          
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.dataBody&&this.props.dataBody.length>0&&
                        this.props.dataBody.map((item,index)=>{
                            return(
                                <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                              </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default TableData