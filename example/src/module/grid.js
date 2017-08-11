import React, { Component } from 'react';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import { paging } from 'rest-redux'
import { incompleteTodos } from '../api'

class GridComponent extends Component {
  constructor(props) {
    super(props);
    this.onFilter = this.onFilter.bind(this)
    this.onSort = this.onSort.bind(this)
    // debugger;
  }
  componentWillReceiveProps(nextProps) {
    // debugger;
  }
  onFilter(filterText) {
    console.log("filterText", filterText)
  }
  onSort(sortProperties) {
    console.log("sortProperties", sortProperties)
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
            onFilter: (filterText) => { this.onFilter(filterText) },
            onSort: (sortProperties) => { this.onSort(sortProperties) },
            onNext: next,
            onPrevious: prev,
            onGetPage: (pageNumber) => gotoPage(pageNumber - 1),
          }} >
          <RowDefinition>
            <ColumnDefinition id="id" title="id" width={100} />
            <ColumnDefinition id="text" title="Desc" width={100} />
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
