package shop;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entity.CustomerInfo;
import net.sf.json.JSONObject;
import service.Dbservice;
import tool.MD5Utils;

public class Updateusermsg extends HttpServlet {

	/**
		 * The doGet method of the servlet. <br>
		 *
		 * This method is called when a form has its tag value method equals to get.
		 * 
		 * @param request the request send by the client to the server
		 * @param response the response send by the server to the client
		 * @throws ServletException if an error occurred
		 * @throws IOException if an error occurred
		 */
	Dbservice dbservice=new Dbservice();
	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		String callback = request.getParameter("callback");
		JSONObject json=new JSONObject();
		CustomerInfo c=new CustomerInfo();
		if(request.getParameter("id")!=null) {
			Integer uid=Integer.parseInt(request.getParameter("id").replace(MD5Utils.encode("Dreamfly"),""));
			c.setUid(uid);
			if(request.getParameter("figureurl")!=null) {
				String figureurl=request.getParameter("figureurl");
				c.setFigureurl(figureurl);
			}else if(request.getParameter("username")!=null) {
				String username=request.getParameter("username");
				c.setUsername(username);
			}else if(request.getParameter("gender")!=null) {
				String gender=request.getParameter("gender");
				c.setGender(gender);
			}else if(request.getParameter("phone")!=null) {
				String phone=request.getParameter("phone");
				c.setPhone(phone);
			}else if(request.getParameter("email")!=null) {
				String email=request.getParameter("email");
				c.setEmail(email);
			}else if(request.getParameter("password")!=null) {
				String password=request.getParameter("password");
				c.setPassword(password);
			}
			Integer result=dbservice.updatecustomermsg(c);
			if(result!=0) {
				json.element("result", "success");
			}else {
				json.element("result", "fail");
			}
		}else {
			json.element("result", "fail");
		}
		out.print(callback+"("+json.toString()+")");
		out.flush();
		out.close();
	}

	/**
		 * The doPost method of the servlet. <br>
		 *
		 * This method is called when a form has its tag value method equals to post.
		 * 
		 * @param request the request send by the client to the server
		 * @param response the response send by the server to the client
		 * @throws ServletException if an error occurred
		 * @throws IOException if an error occurred
		 */
	@Override
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
