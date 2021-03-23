package shop;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entity.OrderInfo;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import service.Dbservice;
import tool.MD5Utils;

public class ShowOrder extends HttpServlet {

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

		response.setContentType("text/html; charset=UTF-8");
		request.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		JSONObject jsonoutput=new JSONObject();
		String callback = request.getParameter("callback");
		if(request.getParameter("userid")!=null&&!request.getParameter("userid").equals("undefined")) {
			Integer uid=Integer.parseInt(request.getParameter("userid").replace(MD5Utils.encode("Dreamfly"),""));
			OrderInfo o=new OrderInfo();
			o.setUid(uid);
			List<OrderInfo> result=null;
			result=dbservice.searchlist(o);
			if(result.size()>0) {
				JSONArray listArray=new JSONArray();
				for (int i = 0; i < result.size(); i++) {
					JSONObject obj=JSONObject.fromObject(result.get(i));
					listArray.element(obj);
				}
				jsonoutput.element("result", "success");
				jsonoutput.element("orderlist", listArray);
			}else {
				jsonoutput.element("result", "fail");
			}
		}else {
			jsonoutput.element("result", "fail");
		}
		out.println(callback+"("+jsonoutput+")");
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
