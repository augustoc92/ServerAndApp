import React from 'react'
import {
  Layout
} from 'antd'
import 'antd/dist/antd.css';
// import styles from './DetailsSideBar.style.css'
import DetailsForm from '../DetailsForm'

const { Sider } = Layout

export default class DetailsSideBar extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false)
  }

  escFunction = (event) => {
    const { toggleDetailsBar, collapsed } = this.props
    if (event.keyCode === 27 && !collapsed) {
      toggleDetailsBar(collapsed)
    }
  }

  render() {
    const {
      collapsed,
      selectedRow
    } = this.props
    return (
      <Sider
        collapsed={collapsed}
        reverseArrow
        collapsedWidth={0}
        width={390}
      >
        <div>
          <DetailsForm selectedRow={selectedRow} />
        </div>
      </Sider>
    )
  }
}
