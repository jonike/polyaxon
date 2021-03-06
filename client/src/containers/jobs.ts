import * as _ from 'lodash';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Jobs from '../components/jobs';
import { AppState } from '../constants/types';
import { isTrue } from '../constants/utils';
import { JobModel } from '../models/job';

import * as actions from '../actions/job';

interface OwnProps {
  user: string;
  projectName?: string;
  groupId?: string;
  useFilters?: boolean;
  bookmarks?: boolean;
  fetchData?: () => any;
}

export function mapStateToProps(state: AppState, ownProps: OwnProps) {
  // let useFilter = () => {
  //   let jobs: JobModel[] = [];
  //   let project = state.projects.byUniqueNames[ownProps.projectName];
  //   let jobNames = project.jobs;
  //   jobNames = getPaginatedSlice(jobNames);
  //   jobNames.forEach(
  //     function (job: string, idx: number) {
  //       jobs.push(state.jobs.byUniqueNames[job]);
  //     });
  //   return {jobs: jobs, count: project.num_jobs};
  // };

  const useLastFetched = () => {
    const jobNames = state.jobs.lastFetched.names;
    const count = state.jobs.lastFetched.count;
    const jobs: JobModel[] = [];
    jobNames.forEach(
      function(job: string, idx: number) {
        jobs.push(state.jobs.byUniqueNames[job]);
      });
    return {jobs, count};
  };
  const results = useLastFetched();

  return {
    isCurrentUser: state.auth.user === ownProps.user,
    jobs: results.jobs,
    count: results.count,
    useFilters: isTrue(ownProps.useFilters),
    bookmarks: isTrue(ownProps.bookmarks),
  };
}

export interface DispatchProps {
  onCreate?: (job: JobModel) => actions.JobAction;
  onDelete: (jobName: string) => actions.JobAction;
  onStop: (jobName: string) => actions.JobAction;
  onUpdate?: (job: JobModel) => actions.JobAction;
  fetchData?: (offset?: number, query?: string, sort?: string) => actions.JobAction;
}

export function mapDispatchToProps(dispatch: Dispatch<actions.JobAction>, ownProps: OwnProps): DispatchProps {
  return {
    onCreate: (job: JobModel) => dispatch(actions.createJobActionCreator(job)),
    onDelete: (jobName: string) => dispatch(actions.deleteJob(jobName)),
    onStop: (jobName: string) => dispatch(actions.stopJob(jobName)),
    onUpdate: (job: JobModel) => dispatch(actions.updateJobActionCreator(job)),
    fetchData: (offset?: number, query?: string, sort?: string) => {
      const filters: {[key: string]: number|boolean|string} = {};
      if (query) {
        filters.query = query;
      }
      if (sort) {
        filters.sort = sort;
      }
      if (offset) {
        filters.offset = offset;
      }
      if (_.isNil(ownProps.projectName) && ownProps.bookmarks) {
        return dispatch(actions.fetchBookmarkedJobs(ownProps.user, filters));
      } else if (ownProps.projectName) {
        return dispatch(actions.fetchJobs(ownProps.projectName, filters));
      } else {
        throw new Error('Jobs container expects either a project name or bookmarks.');
      }
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
