package ro.piatraastrala.utils;


import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

/**
 * Created by Vlad Butnaru on 5/26/2017.
 */
public class DBSyncJob implements Job {
    @Override
    public void execute(JobExecutionContext jobExecutionContext) throws JobExecutionException {
        System.out.println("Syncing db STARTED");
        CacheManager.refreshData();
        System.out.println("Syncing db FINISHED");
    }
}
