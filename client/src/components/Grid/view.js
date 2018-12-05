import React from 'react'
import { Field } from 'redux-form'
import { Table, Input, Modal, Icon } from 'antd'
import 'antd/dist/antd.css';
import { makeField } from '../../helpers/makefield'
import DetailsSideBar from '../SideBar/view';

const AInput = makeField(Input)

class Grid extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colToShow: [],
      recordId: 0,
      modalVisible: false,
    }
  }

  componentDidMount() {
    const {
      thunkGetPeople
    } = this.props
    thunkGetPeople()
  }

  componentWillReceiveProps(nextProps) {
    const {
      cols: nextColumns
    } = nextProps
    const {
      cols: prevCols
    } = this.props
    if (prevCols !== nextColumns) {
      const columnsToShow = this.createFilter(nextColumns)
      this.setState({
        colToShow: columnsToShow
      })
    }
  }

  createFilter = nextColumns => nextColumns.reduce(
    (acc, col) => {
      acc.push({
        ...col,
        title: (
          <div>
            <div>
              { col.key }
            </div>
            <Field
              id={col.key}
              name={col.key}
              component={AInput}
              type="text"
              placeholder={col.key}
            />
          </div>
        )
      })
      return acc
    },
    []
  )  
  
  onRow = record => ({
    onDoubleClick: (event) => {
      const {
        trueOrFalse,
        toggleDetailsBar,
        selectRow,
      } = this.props
      if (trueOrFalse) {
        toggleDetailsBar(trueOrFalse)
      }
      selectRow(record)
      event.preventDefault()
    },
    onContextMenu: (event) => {
      event.preventDefault()
      this.setState({
        recordId: record.id
      })
      this.showModal()
    }
  })


  showModal = () => {
    this.setState({
      modalVisible: true,
    })
  }

  hideModal = () => {
    this.setState({
      modalVisible: false,
    })
  }

  deleteItem = () => {
    const { recordId } = this.state
    const { removeItem } = this.props
    removeItem(recordId)
    this.hideModal()
  }

  addNewItem = () => {
    const {
      toggleDetailsBar,
      selectRow,
      trueOrFalse,
    } = this.props
    const {
      colToShow
    } = this.state
    const emptyObject = {}
    colToShow.forEach((item) => {
      emptyObject[item.key] = undefined
    })
    console.log(emptyObject)
    selectRow(emptyObject)
    if (trueOrFalse) {
      toggleDetailsBar(trueOrFalse)
    }
  }

  render () {
    const { 
      list,
      selectedRow,
      trueOrFalse,
      toggleDetailsBar
    } = this.props
    const {
      colToShow,
      recordId,
      modalVisible
    } = this.state
    return (
      <React.Fragment>
      <h1> Grid Page</h1>
      <Table
        dataSource={list}
        columns={colToShow}
        pagination={false}
        onRow={this.onRow}
      />
      <Icon type={'plus'} onClick={() => this.addNewItem()} />
      <DetailsSideBar
        collapsed={trueOrFalse}
        selectedRow={selectedRow}
        toggleDetailsBar={toggleDetailsBar}
      />
      <Modal
          title="Delete item"
          visible={modalVisible}
          onOk={this.deleteItem}
          onCancel={this.hideModal}
          okText="Confirm"
          cancelText="Cancel"
        >
          <p>
            Are you sure? If you delete this, you will not be able to get it back
          </p>
          <p>
            Item with id:
            {' '}
            {recordId}
          </p>
        </Modal>
      </React.Fragment>
    )
  }
} 
export default Grid
