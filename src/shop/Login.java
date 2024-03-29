package shop;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.alipay.api.*;
import com.alipay.api.request.AlipaySystemOauthTokenRequest;
import com.alipay.api.request.AlipayUserInfoShareRequest;
import com.alipay.api.response.AlipaySystemOauthTokenResponse;
import com.alipay.api.response.AlipayUserInfoShareResponse;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import entity.CustomerInfo;
import net.sf.json.JSONObject;
import service.Dbservice;
import tool.Checkemail_phone;
import tool.GetHtmlSrc;
import tool.MD5Utils;

public class Login extends HttpServlet {
	public static String loginid;
	public static String username;
	public static String password;
	public static String gender;
	public static String email;
	public static String phone;
	public static String address;
	public static String figureurl;
	public static String logintype;
	public static String userid;
	public Dbservice dbservice = new Dbservice();

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request  the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException      if an error occurred
	 */
	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		String callback = request.getParameter("callback");
		if ((request.getParameter("state") != null && (request.getParameter("state").equals("qqlogin")
				|| request.getParameter("state").equals("dreamflyqqlogin")))
				|| (request.getParameter("state") != null && (request.getParameter("state").equals("alipaylogin")
						|| request.getParameter("state").equals("dreamflyalipaylogin")))
				|| (request.getParameter("state") != null && (request.getParameter("state").equals("weibologin")
						|| request.getParameter("state").equals("dreamflyweibologin")))) {
			if (request.getParameter("state") != null && (request.getParameter("state").equals("qqlogin")
					|| request.getParameter("state").equals("dreamflyqqlogin"))) {
				if (request.getParameter("state").equals("qqlogin")) {
					response.sendRedirect(
							"https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=clientId&redirect_uri=https://shop.dfvips.com/Login&state=dreamflyqqlogin&scope=get_user_info");
				} else {
					qqlogin(request, response);
					logincheck(response);
				}
			} else if (request.getParameter("state") != null && (request.getParameter("state").equals("alipaylogin")
					|| request.getParameter("state").equals("dreamflyalipaylogin"))) {
				if (request.getParameter("state").equals("alipaylogin")) {
					response.sendRedirect(
							"https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=appid&scope=auth_user&redirect_uri=https://shop.dfvips.com/Login&state=dreamflyalipaylogin");
				} else {
					alipay_login(request, response);
					logincheck(response);
				}
			} else if (request.getParameter("state") != null && (request.getParameter("state").equals("weibologin")
					|| request.getParameter("state").equals("dreamflyweibologin"))) {
				if (request.getParameter("state").equals("weibologin")) {
					response.sendRedirect(
							"https://api.weibo.com/oauth2/authorize?client_id=clientid&response_type=code&redirect_uri=https://shop.dfvips.com/Login&state=dreamflyweibologin");
				} else {
					weibo_login(request, response);
					logincheck(response);
				}
			}
		} else if (request.getParameter("state") != null && request.getParameter("state").equals("msg")) {
			String ep = request.getParameter("ep");
			System.out.println(Checkemail_phone.isMobile(ep));
			System.out.println(ep);
			phone = "";
			email = "";
			logintype = "msg";
			CustomerInfo c = new CustomerInfo();
			CustomerInfo userinfo1 = null;
			if (Checkemail_phone.isMobile(ep)) {
				c.setPhone(ep);
			} else if (Checkemail_phone.isEmail(ep)) {
				c.setEmail(ep);
			}
			System.out.println(c);
			userinfo1 = dbservice.findCustomer(c);
			if (userinfo1 == null) {
				c.setFigureurl("http://shop.dfvips.com/images/logo-l.png");
				c.setUsername("DreamFly用户");
				int result = dbservice.insertcustomer(c);
				if (result == 1) {
					CustomerInfo userinfo2 = dbservice.findCustomer(c);
					if (userinfo2 != null) {
						out.println(callback + "(" + loginsuccess(response, userinfo2) + ")");
					}
				} else {
					out.println(callback + "(" + loginfail() + ")");
				}
			} else {
				out.println(callback + "(" + loginsuccess(response, userinfo1) + ")");
			}
		} else if (request.getParameter("state") != null && request.getParameter("state").equals("oldlogin")) {
			phone = "";
			email = "";
			logintype = "oldlogin";
			String username = request.getParameter("username");
			String password = request.getParameter("password");
			CustomerInfo c2 = new CustomerInfo();
			if (Checkemail_phone.isMobile(username)) {
				c2.setPhone(phone = username);
			} else if (Checkemail_phone.isEmail(username)) {
				c2.setEmail(email = username);
			}
			c2.setPassword(password);
			CustomerInfo userinfo3 = dbservice.findCustomer(c2);
			if (userinfo3 != null) {
				System.out.println("111" + userinfo3);
				out.println(callback + "(" + loginsuccess(response, userinfo3) + ")");
			} else {
				out.println(callback + "(" + loginfail() + ")");
			}
		}
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request  the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException      if an error occurred
	 */
	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

	public void logincheck(HttpServletResponse response) {
		CustomerInfo c = new CustomerInfo();
		c.setLoginid(loginid);
		CustomerInfo userinfo = dbservice.findCustomer(c);
		try {
			if (userinfo == null) {
				c.setLoginid(loginid);
				c.setFigureurl(figureurl);
				c.setUsername(username);
				int result = dbservice.insertcustomer(c);

				if (result == 1) {
					CustomerInfo user = dbservice.findCustomer(c);
					thirdloginsuccess(response, user);
				} else {
					response.sendRedirect("userlogin.do");
				}
			} else {
				thirdloginsuccess(response, userinfo);
			}
		} catch (Exception e) {
			// TODO: handle exception
		}

	}

	public static String getSubUtilSimple(String soap, String rgex) {
		Pattern pattern = Pattern.compile(rgex);
		Matcher m = pattern.matcher(soap);
		if (m.find()) {
			return m.group(1);
		}
		return "";
	}

	public static String loginsuccess(HttpServletResponse response, CustomerInfo c) {
		JSONObject jsonobj = new JSONObject();
		gender = c.getGender();
		email = c.getEmail();
		phone = c.getPhone();
		address = c.getAddress();
		loginid = c.getLoginid();
		username = c.getUsername();
		figureurl = c.getFigureurl();
		userid = MD5Utils.encode("Dreamfly") + c.getUid();
		password = c.getPassword();
		set_addCookie("userid", initString(userid), response);
		set_addCookie("gender", initString(gender), response);
		set_addCookie("email", initString(email), response);
		set_addCookie("phone", initString(phone), response);
		set_addCookie("address", initString(address), response);
		set_addCookie("loginid", initString(loginid), response);
		set_addCookie("username", initString(username), response);
		set_addCookie("figureurl", initString(figureurl), response);
		set_addCookie("logintype", initString(logintype), response);
		set_addCookie("usertoken", initString(password), response);
		jsonobj.put("result", "success");
		return jsonobj.toString();
	}

	public static void thirdloginsuccess(HttpServletResponse response, CustomerInfo c) throws IOException {
		gender = c.getGender();
		email = c.getEmail();
		phone = c.getPhone();
		address = c.getAddress();
		userid = MD5Utils.encode("Dreamfly") + c.getUid();
		password = c.getPassword();
		if (c.getUsername() != null && !c.getUsername().equals("")) {
			username = c.getUsername();
		}
		if (c.getFigureurl() != null && !c.getFigureurl().equals("")) {
			figureurl = c.getFigureurl();
		}
		set_addCookie("userid", initString(userid), response);
		set_addCookie("gender", initString(gender), response);
		set_addCookie("email", initString(email), response);
		set_addCookie("phone", initString(phone), response);
		set_addCookie("address", initString(address), response);
		set_addCookie("loginid", initString(loginid), response);
		set_addCookie("username", initString(username), response);
		set_addCookie("figureurl", initString(figureurl), response);
		set_addCookie("logintype", initString(logintype), response);
		set_addCookie("usertoken", initString(password), response);
		response.sendRedirect("home");
	}

	public static String loginfail() {
		JSONObject jsonobj = new JSONObject();
		jsonobj.put("result", "fail");
		return jsonobj.toString();
	}

	public static void qqlogin(HttpServletRequest request, HttpServletResponse response) {
		String code = request.getParameter("code");
		String url = "https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=clientId&client_secret=&code="
				+ code + "&redirect_uri=https://shop.dfvips.com/Login";
		String result = GetHtmlSrc.GetHtml(url);
		if (result != null) {
			String regx = "access_token=(.*?)&";
			String access_token = getSubUtilSimple(result, regx);
			String OpenIDjson = GetHtmlSrc.GetHtml("https://graph.qq.com/oauth2.0/me?access_token=" + access_token)
					.replace("callback(", "").replace(");", "");
			if (OpenIDjson != null) {
				JsonObject openidjson = new JsonParser().parse(OpenIDjson).getAsJsonObject();
				if (openidjson.get("openid") != null) {
					String openid = openidjson.get("openid").toString().replace("\"", "");
					String app_id = openidjson.get("client_id").toString().replace("\"", "");
					String json = GetHtmlSrc.GetHtml("https://graph.qq.com/user/get_user_info?access_token="
							+ access_token + "&oauth_consumer_key=" + app_id + "&openid=" + openid);
					JsonObject userjson = new JsonParser().parse(json).getAsJsonObject();
					String nickname = userjson.get("nickname").getAsString();
					String figureurl = userjson.get("figureurl").getAsString();
					loginid = openid;
					username = nickname;
					figureurl = figureurl;
					logintype = "qq";
				}
			}
		}
	}

	public static void alipay_login(HttpServletRequest request, HttpServletResponse response) {
		String auth_code = request.getParameter("auth_code");
		String URL = "https://openapi.alipay.com/gateway.do";
		String APP_ID = "appid";
		String APP_PRIVATE_KEY = "";
		String CHARSET = "UTF-8";
		String ALIPAY_PUBLIC_KEY = "";
		String SIGN_TYPE = "RSA2";
		String accessToken = "";
		AlipayClient alipayClient = new DefaultAlipayClient("https://openapi.alipay.com/gateway.do",
				APP_ID, APP_PRIVATE_KEY, "json", CHARSET, ALIPAY_PUBLIC_KEY, "RSA2");
		AlipaySystemOauthTokenRequest Alipayrequest = new AlipaySystemOauthTokenRequest();
		Alipayrequest.setCode(auth_code);
		Alipayrequest.setGrantType("authorization_code");
		AlipayUserInfoShareResponse userinfoShareResponse = null;
		AlipayUserInfoShareRequest Alipayuserinforequest = new AlipayUserInfoShareRequest();
		try {
			AlipaySystemOauthTokenResponse oauthTokenResponse = (AlipaySystemOauthTokenResponse) alipayClient
					.execute((AlipayRequest) Alipayrequest);
			accessToken = oauthTokenResponse.getAccessToken();
			userinfoShareResponse = (AlipayUserInfoShareResponse) alipayClient
					.execute((AlipayRequest) Alipayuserinforequest, accessToken);
		} catch (AlipayApiException e) {
			e.printStackTrace();
		}
		JsonObject alipay_user_info_share_response = new JsonParser().parse(userinfoShareResponse.getBody())
				.getAsJsonObject();
		JsonObject userjson = alipay_user_info_share_response.get("alipay_user_info_share_response").getAsJsonObject();
		String openid = userjson.get("user_id").getAsString();
		String nickname = userjson.get("nick_name").getAsString();
		String figureurl = userjson.get("avatar").getAsString();
		loginid = openid;
		username = nickname;
		figureurl = figureurl;
		logintype = "alipay";
	}

	public static void weibo_login(HttpServletRequest request, HttpServletResponse response) {
		String code = request.getParameter("code");
		String url = "https://api.weibo.com/oauth2/access_token?client_id=id&client_secret=&grant_type=authorization_code&redirect_uri=https://shop.dfvips.com/Login&code="
				+ code;
		String result = GetHtmlSrc.PostHtml(url);
		if (result != null) {
			JsonObject tokenjson = new JsonParser().parse(result).getAsJsonObject();
			String access_token = tokenjson.get("access_token").getAsString();
			String uid = tokenjson.get("uid").getAsString();
			String nickname = "Dreamfly用户";
			String figureurl = "https://weibo.com/favicon.ico";
			String OpenIDjson = GetHtmlSrc.PostHtml(
					"https://api.weibo.com/2/eps/user/info.json?access_token=" + access_token + "&uid=" + uid);
			loginid = uid;
			username = nickname;
			figureurl = figureurl;
			logintype = "weibo";
		}
	}

	public static void set_addCookie(String key, String value, HttpServletResponse response) {
		Cookie Cookie = new Cookie(key, value);
		Cookie.setMaxAge(360 * 24 * 60 * 60);
		response.addCookie(Cookie);
	}

	public static String initString(String s) {
		if (s == null || s.equals("") || s.equals("null")) {
			try {
				s = URLEncoder.encode(" ", "UTF-8");
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} else {
			try {
				s = URLEncoder.encode(s, "UTF-8");
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return s;
	}
}
