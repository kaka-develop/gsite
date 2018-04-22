package com.gsite.app.config;

import com.hazelcast.config.Config;
import com.hazelcast.config.ManagementCenterConfig;
import com.hazelcast.config.NetworkConfig;
import com.hazelcast.core.HazelcastInstance;
import com.hazelcast.instance.HazelcastInstanceFactory;
import com.hazelcast.spring.cache.HazelcastCacheManager;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
@SuppressWarnings("unused")
public class HazelcastConfiguration {

    private final ApplicationProperties applicationProperties;

    public HazelcastConfiguration(ApplicationProperties applicationProperties) {
        this.applicationProperties = applicationProperties;
    }

    @Bean
    public HazelcastInstance hazelcastInstance() {
        Config config = new Config();
        config.getGroupConfig().setName(applicationProperties.getCache().getHazelcast().getGroupName());
        config.getGroupConfig().setPassword(applicationProperties.getCache().getHazelcast().getGroupPass());

        ManagementCenterConfig managementCenterConfig = new ManagementCenterConfig();
        managementCenterConfig.setEnabled(applicationProperties.getCache().getHazelcast().getManagementCenter().isEnable());
        managementCenterConfig.setUpdateInterval(applicationProperties.getCache().getHazelcast().getManagementCenter().getUpdateInterval());
        managementCenterConfig.setUrl(applicationProperties.getCache().getHazelcast().getManagementCenter().getUrl());
        config.setManagementCenterConfig(managementCenterConfig);

        NetworkConfig networkConfig = new NetworkConfig();
        networkConfig.getJoin().getMulticastConfig().setEnabled(applicationProperties.getCache().getHazelcast().getNetwork().isEnabledMulticast());
        config.setNetworkConfig(networkConfig);

        return HazelcastInstanceFactory.newHazelcastInstance(config);
    }

    @Bean
    public CacheManager cacheManager() {
        return  new HazelcastCacheManager(hazelcastInstance());
    }
}
