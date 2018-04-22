package com.gsite.app.service;

import java.util.List;

public abstract class AbstractService<T> {

    public void fallBackVoid(String param){
    }

    public void fallBackVoid(){
    }

    public boolean fallBackBoolean(String param){
        return false;
    }
}
