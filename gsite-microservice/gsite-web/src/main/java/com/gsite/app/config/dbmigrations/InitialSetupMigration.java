package com.gsite.app.config.dbmigrations;

import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import com.gsite.app.service.util.RandomUtil;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DB;
import com.mongodb.DBCollection;

import java.time.LocalDateTime;
import java.util.*;

@ChangeLog(order = "001")
public class InitialSetupMigration {

    private Map<String, String>[] authoritiesUser = new Map[]{new HashMap<>()};

    private Map<String, String>[] authoritiesManager = new Map[]{new HashMap<>(), new HashMap<>()};
    private Map<String, String>[] authoritiesAdmin = new Map[]{new HashMap<>(), new HashMap<>(), new HashMap<>()};

    {
        authoritiesUser[0].put("_id", "ROLE_USER");

        authoritiesManager[0].put("_id", "ROLE_USER");
        authoritiesManager[1].put("_id", "ROLE_MANAGER");

        authoritiesAdmin[0].put("_id", "ROLE_USER");
        authoritiesAdmin[1].put("_id", "ROLE_MANAGER");
        authoritiesAdmin[2].put("_id", "ROLE_ADMIN");
    }

    @ChangeSet(order = "01", author = "initiator", id = "01-addAuthorities")
    public void addAuthorities(DB db) {
        DBCollection authorityCollection = db.getCollection("authority");
        authorityCollection.insert(
            BasicDBObjectBuilder.start()
                .add("_id", "ROLE_ADMIN")
                .get());
        authorityCollection.insert(
            BasicDBObjectBuilder.start()
                .add("_id", "ROLE_MANAGER")
                .get());
        authorityCollection.insert(
            BasicDBObjectBuilder.start()
                .add("_id", "ROLE_USER")
                .get());
    }

    @ChangeSet(order = "02", author = "initiator", id = "01-addUsers")
    public void addUsers(DB db) {
        DBCollection usersCollection = db.getCollection("user");
        usersCollection.createIndex("login");
        usersCollection.createIndex("email");
        usersCollection.insert(BasicDBObjectBuilder.start()
            .add("_id", "user-0")
            .add("login", "system")
            .add("password", "$2a$10$zoqy0gjNfiyYXYehnebGEOalyMb9GX4rqyjR9as17lOOh1G/aSdCy")
            .add("first_name", "")
            .add("last_name", "System")
            .add("email", "system@localhost")
            .add("activated", "true")
            .add("lang_key", "en")
            .add("created_by", "system")
            .add("created_date", new Date())
            .add("authorities", authoritiesAdmin)
            .get()
        );
        usersCollection.insert(BasicDBObjectBuilder.start()
            .add("_id", "user-1")
            .add("login", "anonymousUser")
            .add("password", "$2a$10$yQNsuhl6GqGDBVhxDFADPerRs8XbigiYbwb6Gu0AdflACbLmS4sg2")
            .add("first_name", "Anonymous")
            .add("last_name", "User")
            .add("email", "anonymous@localhost")
            .add("activated", "true")
            .add("lang_key", "en")
            .add("created_by", "system")
            .add("created_date", new Date())
            .add("authorities", new Map[]{})
            .get()
        );
        usersCollection.insert(BasicDBObjectBuilder.start()
            .add("_id", "user-2")
            .add("login", "admin")
            .add("password", "$2a$10$Rny02OnnWr/dhozshakTd.KW3jMHIHDuKOXU0TjIRvI5jx0OoE00G")
            .add("first_name", "admin")
            .add("last_name", "Administrator")
            .add("email", "admin@localhost.com")
            .add("activated", "true")
            .add("lang_key", "en")
            .add("created_by", "system")
            .add("created_date", new Date())
            .add("authorities", authoritiesAdmin)
            .get()
        );
        usersCollection.insert(BasicDBObjectBuilder.start()
            .add("_id", "user-3")
            .add("login", "manager")
            .add("password", "$2a$10$hNZLbJmcEKnMQy5byOG43.H3vbZ57lfdsWeifoEvvfSr/XBTZhuyi")
            .add("first_name", "")
            .add("last_name", "Manager")
            .add("email", "manager@localhost.com")
            .add("activated", "true")
            .add("lang_key", "en")
            .add("created_by", "system")
            .add("created_date", new Date())
            .add("authorities", authoritiesManager)
            .get()
        );
        usersCollection.insert(BasicDBObjectBuilder.start()
            .add("_id", "user-5")
            .add("login", "user")
            .add("password", "$2a$10$qInfLlH5J/5MxF.zDgU8ielbBPJ88DtpugJ/1IswNeUXJ6y1xPW7q")
            .add("first_name", "")
            .add("last_name", "User")
            .add("email", "user@localhost.com")
            .add("activated", "true")
            .add("lang_key", "en")
            .add("created_by", "system")
            .add("created_date", new Date())
            .add("authorities", authoritiesUser)
            .get()
        );
    }

    @ChangeSet(author = "initiator", id = "01-addSocialUserConnection", order = "03")
    public void addSocialUserConnection(DB db) {
        DBCollection socialUserConnectionCollection = db.getCollection("social_user_connection");
        socialUserConnectionCollection.createIndex(BasicDBObjectBuilder
                .start("user_id", 1)
                .add("provider_id", 1)
                .add("provider_user_id", 1)
                .get(),
            "user-prov-provusr-idx", true);
    }



}
