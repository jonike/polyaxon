import * as _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

import { AppState } from '../constants/types';

import * as actions from '../actions/job';
import JobDetail from '../components/jobDetail';
import { getJobUniqueName } from '../constants/utils';

export function mapStateToProps(state: AppState, params: any) {
  const jobUniqueName = getJobUniqueName(
    params.match.params.user,
    params.match.params.projectName,
    params.match.params.jobId);
  return _.includes(state.jobs.uniqueNames, jobUniqueName) ?
    {job: state.jobs.byUniqueNames[jobUniqueName]} :
    {job: null};
}

export interface DispatchProps {
  onDelete: () => actions.JobAction;
  onStop: () => actions.JobAction;
  fetchData?: () => actions.JobAction;
  bookmark: () => actions.JobAction;
  unbookmark: () => actions.JobAction;
}

export function mapDispatchToProps(dispatch: Dispatch<actions.JobAction>, params: any): DispatchProps {
  return {
    fetchData: () => dispatch(
      actions.fetchJob(
        params.match.params.user,
        params.match.params.projectName,
        params.match.params.jobId)),
    onDelete: () => dispatch(actions.deleteJob(
      getJobUniqueName(
        params.match.params.user,
        params.match.params.projectName,
        params.match.params.jobId),
      true
    )),
    onStop: () => dispatch(actions.stopJob(
      getJobUniqueName(
        params.match.params.user,
        params.match.params.projectName,
        params.match.params.jobId)
    )),
    bookmark: () => dispatch(
      actions.bookmark(
        params.match.params.user,
        params.match.params.projectName,
        params.match.params.jobId)),
    unbookmark: () => dispatch(
      actions.unbookmark(
        params.match.params.user,
        params.match.params.projectName,
        params.match.params.jobId))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JobDetail));
