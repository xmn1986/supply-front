package org.trc.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.trc.exception.BizException;

import java.io.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class HttpClientUtil {

	private static Log log = LogFactory.getLog(HttpClientUtil.class);

    /**
     * HttpUrl路径分割符号
     */
    public static final String HTTP_URL_SPLIT = "/";

	private String url;

	public HttpClientUtil(String url){
	    this.url = url;
    }

	/**
	 * httpClient客户端post方式请求
	 * 
	 * @Title: postMethod
	 * @Description:
	 * @param @param url 接口地址
	 * @param @param paramMap 参数： 如：[{"aaa", "bbb"},{"data":{"test":"123"}}]
	 *        表示2个参数aaa=bbb和data={"test":"123"}
	 * @param @return
	 * @return String
	 * @throws
	 */
	public AppResult postMethod(String methodPath, Map<String, String> paramMap) {
		Date dateStart = new Date();
		long start = System.nanoTime();
		log.warn("http调用开始时间:" + DateUtils.dateToNormalFullString(dateStart)
				+ ">>>>>>>>>>>>>>>>>");
		String tmpUrl = url;
		if (StringUtils.isEmpty(tmpUrl)) {
			throw new BizException("http接口调用地址参数url不能为空");
		}
		tmpUrl = joinHttpUrl(tmpUrl, methodPath);
		if (null == paramMap) {
			throw new BizException("http接口调用参数paramMap不能为空");
		}
		HttpClient httpClient = new HttpClient();
		httpClient.getParams().setContentCharset("UTF-8");
		PostMethod postMethod = new PostMethod(tmpUrl);
		List<NameValuePair> paramList = new ArrayList<NameValuePair>();
		for (Map.Entry<String, String> entry : paramMap.entrySet()) {
			NameValuePair nameValuePair = new NameValuePair(entry.getKey(),
					entry.getValue());
			paramList.add(nameValuePair);
		}
		NameValuePair[] data = paramList.toArray(new NameValuePair[paramList
				.size()]);
		postMethod.setRequestBody(data);
        postMethod.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        JSONObject paramObj = CommonUtil.mapToJson(paramMap);
		String responseMsg = "";
		try {
			log.warn("Http接口POST调用请求：" + tmpUrl + "，调用参数：" + paramObj.toString());
			httpClient.executeMethod(postMethod);
			responseMsg = postMethod.getResponseBodyAsString().trim();
			log.warn("Http接口调用返回结果：" + responseMsg);
		} catch (HttpException e) {
			log.warn("Http接口调用异常：" + e);
		} catch (IOException e) {
			log.warn("Http接口调用IO异常：" + e);
		} finally {
			postMethod.releaseConnection();
			httpClient.getHttpConnectionManager().closeIdleConnections(0);
		}
		Date dateEnd = new Date();
		long end = System.nanoTime();
		log.warn("http调用返回结果:" + responseMsg);
		log.warn("http调用结束时间:" + DateUtils.dateToNormalFullString(dateEnd)
				+ ", 耗时" + DateUtils.getMilliSecondBetween(start, end)
				+ "毫秒<<<<<<<<<<<<<<<<");
        AppResult appResult = null;
        try {
            JSONObject json = JSON.parseObject(responseMsg);
            appResult = JSON.toJavaObject(json, AppResult.class);
            return appResult;
        }catch (Exception e){
            log.error(CommonUtil.joinStr("Http调用返回结果格式不正确").toString(),e);
            appResult = ResultUtil.createFailAppResult(CommonUtil.joinStr("Http调用返回结果格式不正确").toString());
        }
        return appResult;
	}

	/**
	 * httpClient客户端post方式请求
	 * 
	 * @Title: postMethod
	 * @Description:
	 * @param @param url 接口地址
	 * @param @param paramMap 参数： 如：[{"aaa", "bbb"},{"data":{"test":"123"}}]
	 *        表示2个参数aaa=bbb和data={"test":"123"}
	 * @param @return
	 * @return String
	 * @throws
	 */
	public AppResult getMethod(String methodPath,Map<String, String> paramMap) {
		String tmpUrl = url;
		if (StringUtils.isEmpty(tmpUrl)) {
			throw new BizException("http接口调用地址参数url不能为空");
		}
		tmpUrl = joinHttpUrl(tmpUrl, methodPath);
		if (null == paramMap) {
			throw new BizException("http接口调用参数paramMap不能为空");
		}
		Date dateStart = new Date();
		long start = System.nanoTime();
		log.warn("http调用开始时间:" + DateUtils.dateToNormalFullString(dateStart)
				+ ">>>>>>>>>>>>>>>>>");
		HttpClient httpClient = new HttpClient();
		httpClient.getParams().setContentCharset("UTF-8");
		StringBuilder stringBuilder = new StringBuilder();
		for (Map.Entry<String, String> entry : paramMap.entrySet()) {
			stringBuilder.append(entry.getKey());
			stringBuilder.append("=");
			if(null != entry.getValue()){
                stringBuilder.append(String.valueOf(entry.getValue()));
            }
			else{
				stringBuilder.append("");
			}
			stringBuilder.append("&");
		}
		String paramStr = stringBuilder.toString();
		if (paramStr.length() > 0) {
			paramStr = paramStr.substring(0, paramStr.length() - 1);
		}
        String invokeUrl = tmpUrl + "?" + paramStr;
		GetMethod getMethod = new GetMethod(invokeUrl);
		getMethod.getParams().setParameter(HttpMethodParams.RETRY_HANDLER,
				new DefaultHttpMethodRetryHandler());
		BufferedReader br = null;
		String responseMsg = "";
		try {
			JSONObject paramObj = CommonUtil.mapToJson(paramMap);
			log.warn("Http接口GET调用请求url：" + invokeUrl + "请求参数："
					+ paramObj.toString());
			httpClient.executeMethod(getMethod);
			InputStream ins = getMethod.getResponseBodyAsStream();
			br = new BufferedReader(new InputStreamReader(ins, "UTF-8"));
			StringBuffer sbf = new StringBuffer();
			while ((responseMsg = br.readLine()) != null) {
				sbf.append(responseMsg);
			}
			responseMsg = sbf.toString();
			log.warn("Http接口调用返回结果：" + responseMsg);
		} catch (HttpException e) {
			log.warn("Http接口调用异常：" + e);
		} catch (IOException e) {
			log.warn("Http接口调用IO异常：" + e);
		} finally {
			try {
				br.close();
			} catch (IOException e) {
				log.warn("关闭Http返回结果流异常", e);
			}
			// 6.释放连接
			getMethod.releaseConnection();
			httpClient.getHttpConnectionManager().closeIdleConnections(0);
		}
		Date dateEnd = new Date();
		long end = System.nanoTime();
		log.warn("http调用返回结果:" + responseMsg);
		log.warn("http调用结束时间:" + DateUtils.dateToNormalFullString(dateEnd)
				+ ", 耗时" + DateUtils.getMilliSecondBetween(start, end)
				+ "毫秒<<<<<<<<<<<<<<<<");
        AppResult appResult = null;
        try {
            JSONObject json = JSON.parseObject(responseMsg);
            appResult = JSON.toJavaObject(json, AppResult.class);
            return appResult;
        }catch (Exception e){
            log.error(CommonUtil.joinStr("Http调用返回结果格式不正确").toString(),e);
            appResult = ResultUtil.createFailAppResult(CommonUtil.joinStr("Http调用返回结果格式不正确").toString());
        }
        return appResult;
	}

    /**
     * 拼接httpRul请求地址
     * @param requestPath 服务请求路径
     * @param methodPath 方法路径
     * @return
     */
    public String joinHttpUrl(String requestPath, String ...methodPath){
        StringBuilder sb = new StringBuilder();
        sb.append(requestPath);
        if(!StringUtils.endsWith(requestPath,HTTP_URL_SPLIT))
            sb.append(HTTP_URL_SPLIT);
        for(String path : methodPath){
            sb.append(path).append(HTTP_URL_SPLIT);
        }
        return sb.toString();
    }

}
