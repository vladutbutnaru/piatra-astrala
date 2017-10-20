package ro.piatraastrala.utils;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class CacheManagerTest {
    @Before
    public void setUp() throws Exception {
    }

    @After
    public void tearDown() throws Exception {
    }

    @Test
    public void refreshData() throws Exception {
        CacheManager.refreshData();
        Assert.assertTrue(CacheManager.getAllPlayers().size() > 0 );
    }

    @Test
    public void getNPCsNeaby() throws Exception {
    }

    @Test
    public void getPlayersNearby() throws Exception {
    }

    @Test
    public void getPlayerById() throws Exception {
    }

    @Test
    public void updatePlayerLocation() throws Exception {
    }

    @Test
    public void getLakesNearby() throws Exception {
    }

}