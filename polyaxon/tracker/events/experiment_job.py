import tracker

from event_manager.events import experiment_job

tracker.subscribe(experiment_job.ExperimentJobViewedEvent)
tracker.subscribe(experiment_job.ExperimentJobResourcesViewedEvent)
tracker.subscribe(experiment_job.ExperimentJobLogsViewedEvent)
tracker.subscribe(experiment_job.ExperimentJobStatusesViewedEvent)
