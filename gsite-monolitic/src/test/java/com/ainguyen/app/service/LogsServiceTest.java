package com.ainguyen.app.service;

import com.ainguyen.app.GsiteApp;
import com.ainguyen.app.web.rest.vm.LoggerVM;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.inject.Inject;

import static org.assertj.core.api.Assertions.assertThat;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = GsiteApp.class)
public class LogsServiceTest {

    @Inject
    private LogService logService;

    @Test
    public void testHavingAllLogs() {
        assertThat(logService.getList().isEmpty()).isFalse();
    }

    @Test
    public void testChangeLogLevel() {
        LoggerVM loggerVM = new LoggerVM();
        loggerVM.setName("info");
        loggerVM.setLevel("INFO");
        assertThat(logService.changeLevel(loggerVM)).isTrue();
    }
}
