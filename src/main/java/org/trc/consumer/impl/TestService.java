package org.trc.consumer.impl;

import org.springframework.stereotype.Service;
import org.trc.consumer.ITestService;
import org.trc.util.AppResult;

/**
 * Created by hzwdx on 2017/4/19.
 */
@Service("testService")
public class TestService implements ITestService {
    @Override
    public AppResult test() {
        return null;
    }
}
