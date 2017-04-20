package org.trc.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.alibaba.fastjson.JSONObject;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import org.trc.util.AppResult;
import org.trc.util.ResultUtil;
import org.trc.util.ValidateUtil;

@Controller
@SessionAttributes("user")
public class LoginController {
	
	private static Log log = LogFactory.getLog(LoginController.class);
	
	@RequestMapping(value = "/",method = RequestMethod.GET)
	public String index() {
		return "supply/login";
	}
	
	@RequestMapping(value = "/index",method = RequestMethod.GET)
	public String index(HttpServletRequest request){
		return "supply/login";
	}
	
	@RequestMapping("/login")
	@ResponseBody
	public AppResult login(HttpServletRequest request, ModelMap modelMap, HttpSession session) throws Exception{
		ValidateUtil.requestParamNullCheck(request, "account:登陆用户名","password:登陆密码");//参数是否存在校验
		String account = request.getParameter("account");
		String password = request.getParameter("password");
		/*UserInfo user = systemBiz.login(account, password);
		AppResult appResult = ResultUtil.createSucssAppResult("登录成功");
		if(user != null){
			modelMap.addAttribute("user", user);
		}else{
			appResult.setAppcode(ResultEnum.FAILURE.getCode());
			appResult.setDatabuffer("登录失败");
		}
		return appResult;*/

		JSONObject user = new JSONObject();
		user.put("name", "test");
		modelMap.addAttribute("user", user);
		return ResultUtil.createSucssAppResult("登录成功","");
	}
	
	@RequestMapping("/logout")  
	public String logout(HttpServletRequest request,ModelMap model){
		HttpSession session = request.getSession();
		session.removeAttribute("user");
		model.remove("user");
		return "supply/login";
	}
	
}
