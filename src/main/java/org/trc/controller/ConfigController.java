package org.trc.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.trc.consumer.IConfigService;
import org.trc.enums.ValidEnum;
import org.trc.util.AppResult;
import org.trc.util.CommonUtil;
import org.trc.util.ResultUtil;
import org.trc.util.ValidateUtil;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by hzwdx on 2017/4/19.
 */
@Controller
@RequestMapping("/config")
public class ConfigController {

    @Autowired
    private IConfigService configService;

    @RequestMapping("/dictTypeList")
    public String dictTypeList(HttpServletRequest request, ModelMap modelMap){
        return "supply/dictTypeList";
    }

    @RequestMapping("/dictTypeListJson")
    @ResponseBody
    public JSONObject dictTypeListJson(HttpServletRequest request, ModelMap modelMap) throws Exception {
        AppResult appResult = configService.queryDictTypes();
        JSONArray array = (JSONArray)appResult.getResult();
        JSONObject json = new JSONObject();
        json.put("results", array.size());
        json.put("rows", array);
        return json;
    }

    @RequestMapping("/dictTypeAddPage")
    public String dictTypeAddPage(HttpServletRequest request, ModelMap modelMap){
        return "supply/dictTypeAdd";
    }

    @RequestMapping("/dictTypeAdd")
    @ResponseBody
    public AppResult dictTypeAdd(HttpServletRequest request, ModelMap modelMap) throws Exception {
        AppResult result = configService.saveDictType(CommonUtil.getJsonParams(request));
        return ResultUtil.createSucssAppResult("添加成功",result.getResult());
    }

    @RequestMapping("/dictTypeUpdatePage")
    public String dictTypeUpdatePage(HttpServletRequest request, ModelMap modelMap) throws Exception {
        ValidateUtil.requestParamNullCheck(request, "id:主键ID");
        modelMap.put("id", request.getParameter("id"));
        return "supply/dictTypeUpdate";
    }

    @RequestMapping("/dictTypeUpdate")
    @ResponseBody
    public AppResult dictTypeUpdate(HttpServletRequest request, ModelMap modelMap) throws Exception {
        AppResult result = configService.saveDictType(CommonUtil.getJsonParams(request));
        return ResultUtil.createSucssAppResult("修改成功",result.getResult());
    }

    @RequestMapping("/deleteDictType")
    @ResponseBody
    public AppResult deleteDictType(HttpServletRequest request, ModelMap modelMap) throws Exception {
        ValidateUtil.requestParamNullCheck(request,"id:主键ID");
        AppResult result = configService.deleteDictType(Long.parseLong(request.getParameter("id")));
        return ResultUtil.createSucssAppResult("删除成功",result.getResult());
    }

    @RequestMapping("/dictTypeDetail")
    @ResponseBody
    public AppResult dictTypeDetail(HttpServletRequest request) throws Exception {
        ValidateUtil.requestParamNullCheck(request,"id:主键ID");
        AppResult result = configService.findDictTypeById(Long.parseLong(request.getParameter("id")));
        return ResultUtil.createSucssAppResult("添加成功",result.getResult());
    }

    @RequestMapping("/dictTypeSelectList")
    @ResponseBody
    public AppResult dictTypeSelectList(HttpServletRequest request, ModelMap modelMap) throws Exception {
        AppResult result = configService.queryDictTypes();
        return ResultUtil.createSucssAppResult("添加成功",result.getResult());
    }

    @RequestMapping("/dictList")
    public String dictList(HttpServletRequest request, ModelMap modelMap){
        return "supply/dictList";
    }

    @RequestMapping("/dictListJson")
    @ResponseBody
    public JSONObject dictListJson(HttpServletRequest request, ModelMap modelMap) throws Exception {
        AppResult appResult = configService.queryDicts(new JSONObject());
        JSONArray array = (JSONArray)appResult.getResult();
        JSONObject json = new JSONObject();
        json.put("results", array.size());
        json.put("rows", array);
        return json;
    }

    @RequestMapping("/dictAddPage")
    public String dictAddPage(HttpServletRequest request, ModelMap modelMap){
        return "supply/dictAdd";
    }

    @RequestMapping("/dictAdd")
    @ResponseBody
    public AppResult dictAdd(HttpServletRequest request, ModelMap modelMap) throws Exception {
        AppResult result = configService.saveDict(CommonUtil.getJsonParams(request));
        return ResultUtil.createSucssAppResult("添加成功",result.getResult());
    }

    @RequestMapping("/dictUpdatePage")
    public String dictUpdatePage(HttpServletRequest request, ModelMap modelMap) throws Exception {
        ValidateUtil.requestParamNullCheck(request, "id:主键ID");
        modelMap.put("id", request.getParameter("id"));
        return "supply/dictUpdate";
    }

    @RequestMapping("/dictUpdate")
    @ResponseBody
    public AppResult dictUpdate(HttpServletRequest request, ModelMap modelMap) throws Exception {
        AppResult result = configService.saveDict(CommonUtil.getJsonParams(request));
        return ResultUtil.createSucssAppResult("修改成功",result.getResult());
    }

    @RequestMapping("/deleteDict")
    @ResponseBody
    public AppResult deleteDict(HttpServletRequest request, ModelMap modelMap) throws Exception {
        ValidateUtil.requestParamNullCheck(request,"id:主键ID");
        AppResult result = configService.deleteDict(Long.parseLong(request.getParameter("id")));
        return ResultUtil.createSucssAppResult("删除成功",result.getResult());
    }

    @RequestMapping("/dictDetail")
    @ResponseBody
    public AppResult dictDetail(HttpServletRequest request) throws Exception {
        ValidateUtil.requestParamNullCheck(request,"id:主键ID");
        AppResult result = configService.findDictById(Long.parseLong(request.getParameter("id")));
        return ResultUtil.createSucssAppResult("查询成功",result.getResult());
    }

    @RequestMapping("/isValidList")
    @ResponseBody
    public AppResult isValidList(HttpServletRequest request){
        return ResultUtil.createSucssAppResult("成功", ValidEnum.toJSONArray());
    }

}
