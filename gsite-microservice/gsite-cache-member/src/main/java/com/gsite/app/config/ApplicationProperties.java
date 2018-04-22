package com.gsite.app.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    private final Cache cache = new Cache();

    public Cache getCache() {
        return cache;
    }

    public static class Cache {
        private final Hazelcast hazelcast = new Hazelcast();

        public Hazelcast getHazelcast() {
            return hazelcast;
        }

        public static class Hazelcast {
            private final Network network = new Network();
            private final ManagementCenter managementCenter = new ManagementCenter();

            private String groupName = "gname";
            private String groupPass = "gpass";

            public Network getNetwork() {
                return network;
            }

            public ManagementCenter getManagementCenter() {
                return managementCenter;
            }

            public String getGroupName() {
                return groupName;
            }

            public String getGroupPass() {
                return groupPass;
            }

            public void setGroupName(String groupName) {
                this.groupName = groupName;
            }

            public void setGroupPass(String groupPass) {
                this.groupPass = groupPass;
            }


            public static class Network {
                private boolean enabledMulticast = true;

                public boolean isEnabledMulticast() {
                    return enabledMulticast;
                }

                public void setEnabledMulticast(boolean enabledMulticast) {
                    this.enabledMulticast = enabledMulticast;
                }
            }


            public static class ManagementCenter {

                private boolean enable = false;
                private int updateInterval = 1;
                private String url = "";

                public boolean isEnable() {
                    return enable;
                }

                public void setEnable(boolean enable) {
                    this.enable = enable;
                }

                public int getUpdateInterval() {
                    return updateInterval;
                }

                public void setUpdateInterval(int updateInterval) {
                    this.updateInterval = updateInterval;
                }

                public String getUrl() {
                    return url;
                }

                public void setUrl(String url) {
                    this.url = url;
                }
            }
        }
    }

}
