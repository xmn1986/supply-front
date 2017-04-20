/**   
* @Title: SexEnum.java 
* @Package com.hoo.enums 
* @Description: TODO(用一句话描述该文件做什么) 
* @author 吴东雄
* @date 2016年5月13日 下午5:12:52 
* Copyright (c) 2016, 杭州海适云承科技有限公司 All Rights Reserved.
* @version V1.0   
*/
package org.trc.enums;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.lang.StringUtils;

/** 
 * @ClassName: SexEnum 
 * @Description: 性别
 * @author 吴东雄
 * @date 2016年5月13日 下午5:12:52 
 *  
 */
public enum ValidEnum {

	启用("0","启用"),
	停用("1","停用");
	
	private String code; 
	private String name; 
	
	ValidEnum(String code, String name){
		this.code = code;
		this.name = name;
	}
	
	/**
	 * 
	* @Title: getSexEnumByName 
	* @Description: 根据枚举名称获取枚举
	* @param @param name
	* @param @return    
	* @return SexEnum
	* @throws
	 */
	public static ValidEnum getSexEnumByName(String name){
		for(ValidEnum sexEnum : ValidEnum.values()){
			if(StringUtils.equals(name, sexEnum.getName())){
				return sexEnum;
			}
		}
		return null;
	}
	
	/**
	 * 
	* @Title: getSexEnumByCode 
	* @Description: 根据枚举编码获取枚举
	* @param @param name
	* @param @return    
	* @return SexEnum
	* @throws
	 */
	public static ValidEnum getSexEnumByCode(String code){
		for(ValidEnum sexEnum : ValidEnum.values()){
			if(StringUtils.equals(sexEnum.getCode(), code)){
				return sexEnum;
			}
		}
		return null;
	}
	
	/**
	 * 
	* @Title: toJSONArray 
	* @Description: 转换成json数组
	* @param @return    
	* @return JSONArray
	* @throws
	 */
	public static JSONArray toJSONArray(){
		JSONArray array = new JSONArray();
		for(ValidEnum sexEnum : ValidEnum.values()){
			JSONObject obj = new JSONObject();
			obj.put("code", sexEnum.getCode());
			obj.put("name", sexEnum.getName());
			array.add(obj);
		}
		return array;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
	
}
