package shop;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;
import tool.*;

public class Getcode extends HttpServlet {

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
		String email = "";
		String sresult = "";
		String stateemail = "";
		PrintWriter out = response.getWriter();
		if (request.getParameter("email") != null) {
			email = request.getParameter("email");
			stateemail = request.getParameter("state");
			sresult = GetCode.getCode();
			if(stateemail.equals("login")) {
				SendEmail.sendEmail(email, sresult, 1);
			}else{
				SendEmail.sendEmail(email, sresult, 0);
			}
		} else if (request.getParameter("state") != null && request.getParameter("state").equals("msg")) {
			String phone = request.getParameter("phone");
			System.out.println(phone);
			String state=request.getParameter("code");
			int statecode;
			if(state.equals("login")) {
				statecode = 465879;
			}else if(state.equals("pwd")) {
				statecode = 465878;
			}else {
				statecode = 498948;
			}
			String paramsa = sresult = GetCode.getnumCode();
		    System.out.println(statecode); 
		    SendMsg.sendMsg(phone, statecode, paramsa);
			System.out.println(sresult);
		}
		String callback = request.getParameter("callback");
		JSONObject jsonobj = new JSONObject();
		jsonobj.put("code", MD5Utils.encode(sresult));
		String result = callback + "(" + jsonobj.toString() + ")";
		out.println(result);
		out.flush();
		out.close();
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

}
