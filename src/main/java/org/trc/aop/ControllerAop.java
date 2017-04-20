/**   
* @Title: SysLogAspectJ.java 
* @Package com.hoo.interceptor 
* @Description: TODO(用一句话描述该文件做什么) 
* @author 吴东雄
* @date 2016年1月15日 下午4:22:53 
* Copyright (c) 2016, 杭州海适云承科技有限公司 All Rights Reserved.
* @version V1.0   
*/
package org.trc.aop;

import java.lang.reflect.Method;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.ui.ModelMap;

import org.trc.enums.ResultEnum;
import org.trc.util.AppResult;
import org.trc.util.BeanToMapUtil;
import org.trc.util.CommonUtil;
import org.trc.util.DateUtils;
import org.trc.util.ExceptionUtil;

/** 
 * @ClassName: SysLogAspectJ 
 * @Description: TODO
 * @author 吴东雄
 * @date 2016年1月15日 下午4:22:53 
 *  
 */
@Component
@Aspect
public class ControllerAop {
	
	private Log log = null;

	@Pointcut("within(@org.springframework.stereotype.Controller *)")
    public void cutController(){
        
    }
    
    @Around("cutController()")
    public Object invoke(ProceedingJoinPoint point) throws Throwable{
    	Class<?> targetClass = point.getTarget().getClass();//被代理的类
		log = LogFactory.getLog(targetClass);
		MethodSignature signature = (MethodSignature)point.getSignature();
		Method method = signature.getMethod();//被执行方法
		Class<?>[]  paramTypes = method.getParameterTypes();//方法参数类型
		Class<?> returnType = method.getReturnType();//方法返回类型
		Date start = new Date();
		long startL = System.nanoTime();
		String prefix = ">>>>>";
		String endfix = "<<<<<";
		String[] paramNames = CommonUtil.getMethodParams(targetClass, method.getName());//获取参数名称数组
		if(log.isInfoEnabled()){
			log.info(prefix+"开始调用"+targetClass.getName()+"方法"+method.getName()+", 参数："+CommonUtil.getMethodParam(paramNames, point.getArgs(),paramTypes)+". 开始时间"+DateUtils.dateToString(start, DateUtils.DATETIME_FORMAT));
		}
		Object resultObj = null;
		try {
			//校验参数必须包含HttpServletRequest类型参数
			/*if(!isContainRequest(paramTypes))
				throw new ParamValidException("Controller方法中必须包含javax.servlet.http.HttpServletRequest类型参数");*/
			//执行方法
			resultObj = point.proceed();
			//方法参数是否包含ModelMap类型参数
			if(isContainModelMap(paramTypes)){
				HttpServletRequest request = getRequest(point.getArgs(),paramTypes);
				handlerModelMap(request, point.getArgs(), paramTypes);
			}
		} catch (Exception e) {
			String errorMsg = ExceptionUtil.handlerException(e, targetClass, method.getName());
			log.error(errorMsg, e);
			if(StringUtils.equals("AppResult", returnType.getSimpleName())){
				AppResult appResult = new AppResult(ResultEnum.FAILURE.getCode(), errorMsg, "");
				resultObj = appResult;
			}else if(StringUtils.equals("JSONObject", returnType.getSimpleName())){
				JSONObject appResult = new JSONObject();
				appResult.put("appcode", ResultEnum.FAILURE.getCode());
				appResult.put("databuffer", errorMsg);
				appResult.put("result", "");
				resultObj = appResult;
			}
			
		}
		Date end = new Date();
		long endL = System.nanoTime();
		if(log.isInfoEnabled()){
			log.info(endfix+"结束调用"+targetClass.getName()+"方法"+method.getName()+". 结束时间"+DateUtils.dateToString(end, DateUtils.DATETIME_FORMAT)+", 耗时"+DateUtils.getMilliSecondBetween(startL, endL)+"毫秒");
			log.info(endfix+"返回结果："+ BeanToMapUtil.convertBeanToMap(resultObj));
		}
		return resultObj;
    }
    
    /**
     * 
    * @Title: isContainRequest 
    * @Description: 校验方法参数是否包含HttpServletRequest类型参数
    * @param @param paramTypes
    * @param @return    
    * @return boolean
    * @throws
     */
    private  boolean isContainRequest(Class<?>[] paramTypes){
    	boolean flag = false;
    	for(Class<?> clazz : paramTypes){
			if(StringUtils.equals(CommonUtil.HTTP_SERVLET_REQUEST, clazz.getSimpleName())){
				flag = true;
				break;
			}
		}
    	return flag;
    }
    
    /**
     * 
    * @Title: isContainModelMap 
    * @Description: 校验方法参数是否包含ModelMap类型参数
    * @param @param paramTypes
    * @param @return    
    * @return boolean
    * @throws
     */
    private  boolean isContainModelMap(Class<?>[] paramTypes){
    	boolean flag = false;
    	for(Class<?> clazz : paramTypes){
			if(StringUtils.equals(CommonUtil.MODEL_MAP, clazz.getSimpleName())){
				flag = true;
				break;
			}
		}
    	return flag;
    }
    
    /**
     * 
    * @Title: getRequest 
    * @Description: 从参数中获取HttpServletRequest参数
    * @param @param parameterValues
    * @param @param paramTypes
    * @param @return    
    * @return Object[]
    * @throws
     */
    private HttpServletRequest getRequest(Object[] parameterValues, Class<?>[] paramTypes){
    	for(int i=0; i<paramTypes.length; i++){
    		if(StringUtils.equals(CommonUtil.HTTP_SERVLET_REQUEST, paramTypes[i].getSimpleName()))
    			return (HttpServletRequest)parameterValues[i];
    	}
    	return null;
    }
    
    /**
     * 
    * @Title: handlerModelMap 
    * @Description: 处理ModelMap参数
    * @param @param request    
    * @return void
    * @throws
     */
    private void handlerModelMap(HttpServletRequest request, Object[] parameterValues, Class<?>[] paramTypes){
    	
    	for(int i=0; i<paramTypes.length; i++){
    		if(StringUtils.equals(CommonUtil.MODEL_MAP, paramTypes[i].getSimpleName())){//ModelMap参数
    			ModelMap modelMap = (ModelMap)parameterValues[i];
    			if(null != request){
    				Object user = request.getSession().getAttribute("user");
        			if(null != user)
        				modelMap.put("user", JSON.toJSON(user));
        			parameterValues[i] = modelMap;
    			}
    		}
    	}
    	
    }
    
}
