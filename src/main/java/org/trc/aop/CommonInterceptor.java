/**   
 * @Title: CommonInterceptor.java 
 * @Package com.hoo.interceptor 
 * @Description: TODO(用一句话描述该文件做什么) 
 * @author Tony-Li
 * @date 2016年5月6日 下午1:52:45 
 * Copyright (c) 2016, 杭州海适云承科技有限公司 All Rights Reserved.
 * @version V1.0   
 */
package org.trc.aop;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

/** 
 * @ClassName: CommonInterceptor 
 * @Description: TODO
 * @author Tony-Li
 * @date 2016年5月6日 下午1:52:45 
 *  
 */
public class CommonInterceptor extends HandlerInterceptorAdapter{
	private final Log log = LogFactory.getLog(CommonInterceptor.class);
	public static final String LOGIN_URL = "/index.do"; 
    /** 
     * 在业务处理器处理请求之前被调用 
     * 如果返回false 
     *     从当前的拦截器往回执行所有拦截器的afterCompletion(),再退出拦截器链
     * 如果返回true 
     *    执行下一个拦截器,直到所有的拦截器都执行完毕 
     *    再执行被拦截的Controller 
     *    然后进入拦截器链, 
     *    从最后一个拦截器往回执行所有的postHandle() 
     *    接着再从最后一个拦截器往回执行所有的afterCompletion() 
     */  
    @Override  
    public boolean preHandle(HttpServletRequest request,  
            HttpServletResponse response, Object handler) throws Exception {  
        //log.info("==============执行顺序: 1、preHandle================");  
		String requestUri = request.getRequestURI();
		String contextPath = request.getContextPath();
		String url = requestUri.substring(contextPath.length());
        /*log.info("requestUri:"+requestUri);  
        log.info("contextPath:"+contextPath);  
        log.info("url:"+url); */ 
        Object user = request.getSession().getAttribute("user");
        if(null == user || url.equals("/")){
        	//跳转到login页面
         	response.sendRedirect(request.getContextPath()+LOGIN_URL);
         	/*PrintWriter out = response.getWriter(); 
         	out.write("<script type='text/javascript'>window.parent.frames.location.href = '/supply-front/index.do';</script>");*/
         	return false;
         }else{
        	 return true;
         }
    }  
  
    /**
     * 在业务处理器处理请求执行完成后,生成视图之前执行的动作   
     * 可在modelAndView中加入数据，比如当前时间
     */
    @Override  
    public void postHandle(HttpServletRequest request,  
            HttpServletResponse response, Object handler,  
            ModelAndView modelAndView) throws Exception {   
        //log.info("==============执行顺序: 2、postHandle================");  
//        if(modelAndView != null){  //加入当前时间  
//            modelAndView.addObject("var", "测试postHandle");  
//        }  
    }  
  
    /** 
     * 在DispatcherServlet完全处理完请求后被调用,可用于清理资源等  
     *  
     * 当有拦截器抛出异常时,会从当前拦截器往回执行所有的拦截器的afterCompletion() 
     */  
    @Override  
    public void afterCompletion(HttpServletRequest request,  
            HttpServletResponse response, Object handler, Exception ex)  
            throws Exception {  
        //log.info("==============执行顺序: 3、afterCompletion================");  
    }  

}  
