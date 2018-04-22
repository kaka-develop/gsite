package com.gsite.app.config.dbmigrations;

import com.github.mongobee.changeset.ChangeLog;
import com.github.mongobee.changeset.ChangeSet;
import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DB;
import com.mongodb.DBCollection;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@ChangeLog(order = "001")
public class InitialSetupMigration {

    @ChangeSet(author = "initiator", id = "01-addNotifications", order = "02")
    public void addNotifications(DB db) {
        DBCollection templateCollection = db.getCollection("notification");
        templateCollection.createIndex("title");
        List<String> sentUsers = new ArrayList<>();
        sentUsers.add("user@localhost.com");
        templateCollection.insert(BasicDBObjectBuilder
            .start("_id", "notification-1")
            .add("title", "GSite Beta!")
            .add("content", "GSite is still in Beta. Have fun and please give us feedbacks.")
            .add("is_read", false)
            .add("sent_users", sentUsers)
            .add("created", new Date())
            .get());
        templateCollection.insert(BasicDBObjectBuilder
            .start("_id", "notification-2")
            .add("title", "New templates!")
            .add("content", "GSite just releases free templates.")
            .add("is_read", false)
            .add("sent_users", sentUsers)
            .add("created", new Date())
            .get());
        templateCollection.insert(BasicDBObjectBuilder
            .start("_id", "notification-3")
            .add("title", "More custom options!")
            .add("content", "GSite just provides more custom options for user's websites.")
            .add("is_read", false)
            .add("sent_users", sentUsers)
            .add("created", new Date())
            .get());


    }
}
