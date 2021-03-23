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
import tool.Checkemail_phone;

public class CheckUser extends HttpServlet {

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
	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		String callback = request.getParameter("callback");
		if(request.getParameter("ep")!=null) {
			String ep = request.getParameter("ep");
			CustomerInfo c = new CustomerInfo();
			if (Checkemail_phone.isMobile(ep)) {
				c.setPhone(ep);
			} else if (Checkemail_phone.isEmail(ep)) {
				c.setEmail(ep);
			}
			Dbservice dbservice=new Dbservice();
			CustomerInfo userinfo = dbservice.findCustomer(c);
			if (userinfo != null) {
				System.out.println(userinfo);
				out.println(callback + "(" + success() + ")");
			} else {
				out.println(callback + "(" + fail() + ")");
			}
		}
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
	public static String success() {
		JSONObject jsonobj = new JSONObject();
		jsonobj.put("result", "success");
		return jsonobj.toString();
	}
	public static String fail() {
		JSONObject jsonobj = new JSONObject();
		jsonobj.put("result", "fail");
		return jsonobj.toString();
	}
}
