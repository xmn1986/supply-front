package org.trc.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/system")
public class SystemController {

	private static Log log = LogFactory.getLog(SystemController.class);

	@RequestMapping("/main")
	public String start(HttpServletRequest request, ModelMap modelMap){
		return "supply/main";
	}
	
	@RequestMapping("/index")
	public String index(HttpServletRequest request, ModelMap modelMap){
		return "index";
	}


}
