package ro.piatraastrala.utils;


import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

/**
 * This class provides Cron Job implementation of the persistence interval
 *
 *
 * @version 1.0
 * @author  Vlad Butnaru
 */
public class DBSyncJob implements Job {
    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        System.out.println("Syncing db STARTED");
        CacheManager.refreshData();
        System.out.println("Syncing db FINISHED");
    }
}
