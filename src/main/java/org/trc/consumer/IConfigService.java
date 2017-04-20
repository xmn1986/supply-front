package org.trc.consumer;

import com.alibaba.fastjson.JSONObject;
import org.trc.util.AppResult;

/**
 * Created by hzwdx on 2017/4/19.
 */
public interface IConfigService {

    /**
     * 查询字典类型列表
     * @param
     * @return
     */
    public AppResult queryDictTypes() throws Exception;

    /**
     * 保存字典类型
     * @param json
     * @return
     */
    public AppResult saveDictType(JSONObject json) throws Exception;

    /**
     *根据主键查询字典类型
     * @param id
     * @return
     */
    public AppResult findDictTypeById(Long id) throws Exception;

    /**
     * 根据类型编号查询字典类型
     * @param typeNo
     * @return
     */
    public AppResult findDictTypeByTypeNo(String typeNo) throws Exception;

    /**
     * 删除字典类型
     * @param id
     * @return
     * @throws Exception
     */
    public AppResult deleteDictType(Long id) throws Exception;

    /**
     * 查询字典列表
     * @param json
     * @return
     */
    public AppResult queryDicts(JSONObject json) throws Exception;

    /**
     * 保存字典
     * @param json
     * @return
     */
    public AppResult saveDict(JSONObject json) throws Exception;

    /**
     * 根据类型编号查询字典
     * @param id
     * @return
     */
    public AppResult findDictById(Long id) throws Exception;

    /**
     * 删除字典
     * @param id
     * @return
     * @throws Exception
     */
    public AppResult deleteDict(Long id) throws Exception;

}
