import React, { Component } from 'react';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import { paging } from 'rest-redux'
import { incompleteTodos } from '../api'

class GridComponent extends Component {
  constructor(props) {
    super(props);
    // debugger;
  }
  componentWillReceiveProps(nextProps) {
    // debugger;
  }
  render() {
    let { refresh, instances, next, prev, total, currentPage, gotoPage } = this.props
    let pageProperties = {
      currentPage: currentPage + 1,
      pageSize: 3,
      recordCount: total,
    }

    return (
      <div>
        <Griddle
          data={instances}
          pageProperties={pageProperties}
          events={{
            onFilter: (filterText) => { },
            onSort: (sortProperties) => { },
            onNext: next,
            onPrevious: prev,
            onGetPage: (pageNumber) => gotoPage(pageNumber - 1),
          }} >
          <RowDefinition>
            <ColumnDefinition id="id" title="id"  width={100}/>
            <ColumnDefinition id="text" title="Desc"  width={100} />
          </RowDefinition>
        </Griddle>
        <p>
          <a onClick={() => refresh()}> Refresh </a>
        </p>
      </div>
    )
  }
}

export default paging(incompleteTodos, {
  title: 'Todo In Grid'
})(GridComponent)
