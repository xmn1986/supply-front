package org.trc.consumer.impl;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.trc.constant.Constant;
import org.trc.util.AppResult;
import org.trc.util.CommonUtil;
import org.trc.util.HttpClientUtil;
import org.trc.consumer.IConfigService;
import org.trc.util.PropertyResourceUtil;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by hzwdx on 2017/4/19.
 */
@Service("configService")
public class ConfigService implements IConfigService{

    @Autowired
    private HttpClientUtil supplyConfigHttp;

    @Override
    public AppResult queryDictTypes() throws Exception {
        return supplyConfigHttp.getMethod(Constant.QUERY_DICT_TYPES, new HashMap<String, String>());
    }

    @Override
    public AppResult saveDictType(JSONObject json) throws Exception {
        return supplyConfigHttp.postMethod(Constant.SAVE_DICT_TYPE, CommonUtil.jsonToMap(json));
    }

    @Override
    public AppResult findDictTypeById(Long id) throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        map.put("id", id.toString());
        return supplyConfigHttp.getMethod(Constant.FIND_DICT_TYPE_BY_ID, map);
    }

    @Override
    public AppResult findDictTypeByTypeNo(String typeNo) throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        map.put("typeNo", typeNo);
        return supplyConfigHttp.getMethod(Constant.FIND_DICT_TYPE_BY_TYPE_NO, map);
    }

    @Override
    public AppResult deleteDictType(Long id) throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        map.put("id", id.toString());
        return supplyConfigHttp.getMethod(Constant.DELETE_DICT_TYPE_BY_ID, map);
    }

    @Override
    public AppResult queryDicts(JSONObject json) throws Exception {
        return supplyConfigHttp.getMethod(Constant.QUERY_DICTS, CommonUtil.jsonToMap(json));
    }

    @Override
    public AppResult saveDict(JSONObject json) throws Exception {
        return supplyConfigHttp.postMethod(Constant.SAVE_DICT, CommonUtil.jsonToMap(json));
    }

    @Override
    public AppResult findDictById(Long id) throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        map.put("id", id.toString());
        return supplyConfigHttp.getMethod(Constant.FIND_DICT_BY_ID, map);
    }

    @Override
    public AppResult deleteDict(Long id) throws Exception {
        Map<String, String> map = new HashMap<String, String>();
        map.put("id", id.toString());
        return supplyConfigHttp.getMethod(Constant.DELETE_DICT_BY_ID, map);
    }
}
