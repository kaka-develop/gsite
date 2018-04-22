var status = rs.status();
if(status.errmsg === 'no replset config has been received') {
    rs.initiate();
}
for (var i = 0; i < hostnames.length; i++) {
    if(i!==0)
        rs.add(hostnames[i] + ":27017");
}
cfg = rs.conf();
cfg.members[0].host = hostnames[0] + ":27017";
rs.reconfig(cfg);
