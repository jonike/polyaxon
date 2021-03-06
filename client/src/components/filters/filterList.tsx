import * as React from 'react';

import './filterList.less';

export interface Props {
  query?: string;
  sort?: string;
  handleFilter: (query: string, sort: string) => any;
}

interface State {
  query: string;
  sort: string;
  showFilters: boolean;
}

export default class FilterList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {query: props.query || '', sort: props.sort || '', showFilters: false};
  }

  public handleFilter = (event: any) => {
    event.preventDefault();
    this.props.handleFilter(this.state.query, this.state.sort);
  }

  public onQueryInput = (value: string) => {
    this.setState((prevState, prevProps) => ({
      query: value,
      sort: prevState.sort,
    }));
  }

  public onSortInput = (value: string) => {
    this.setState((prevState, prevProps) => ({
      query: prevState.query,
      sort: value,
    }));
  }

  public onHideFilters = () => {
    this.setState((prevState, prevProps) => ({
      showFilters: !prevState.showFilters
    }));
  }

  public render() {
    const getFilter = () => {
      return (
        <div className="filter-list">
            <div className="col-md-offset-10 col-md-2">
              <div className="col-md-offset-2 col-md-10">
              <button
                className="btn btn-default btn-filters btn-sm"
                onClick={this.onHideFilters}
              >
                <i className="fa fa-sliders icon" aria-hidden="true"/>
              </button>
              </div>
          </div>
          {this.state.showFilters &&
          <form className="form-horizontal" onSubmit={this.handleFilter}>
            <div className="col-md-10">
              <div className="form-group">
                <label htmlFor="query" className="col-md-1 control-label">Query</label>
                <div className="col-md-11">
                  <input
                    type="text"
                    className="form-control"
                    id="query"
                    placeholder="build.id:3|4, status:~running|scheduled, created_at:2018-01-01..2018-02-01"
                    value={this.state.query}
                    onChange={(event) => this.onQueryInput(event.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="query" className="col-md-1 control-label">Sort</label>
                <div className="col-md-11">
                  <input
                    type="text"
                    className="form-control"
                    id="sort"
                    placeholder="-started_at, -metric.accuracy"
                    value={this.state.sort}
                    onChange={(event) => this.onSortInput(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="filter-buttons col-md-1">
              <div className="form-group">
                <div className="col-md-offset-2 col-md-10">
                  <button type="submit" className="btn btn-primary">Search</button>
                </div>
              </div>
            </div>
          </form>
          }
        </div>
      );
    };

    return getFilter();
  }
}
