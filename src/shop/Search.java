package shop;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entity.GoodsmsgInfo;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import service.Dbservice;

public class Search extends HttpServlet {

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
		String callback = request.getParameter("callback");
		PrintWriter out = response.getWriter();
		JSONObject jsonobjout = new JSONObject();
		if(request.getParameter("name")!=null) {
			GoodsmsgInfo g=new GoodsmsgInfo();
			g.setName(request.getParameter("name"));
			Dbservice dbservice = new Dbservice();
			List<GoodsmsgInfo> result = dbservice.searchgoods(g);
			if (result.size() != 0) {
				jsonobjout.element("result", "success");
				JSONArray array = new JSONArray();
				for (int i = 0; i < result.size(); i++) {
					GoodsmsgInfo thisGoodsmsgInfo = result.get(i);
					String name = thisGoodsmsgInfo.getName().toString();
					String result0 = thisGoodsmsgInfo.getLink_name().toString();
					JSONObject jsonobj = new JSONObject();
					jsonobj.element("title", name);
					jsonobj.element("result", result0);
					array.element(jsonobj);
				}
				jsonobjout.element("data", array);
			} else {
				jsonobjout.element("result", "fail");
		    }
			out.println(callback + "(" + jsonobjout.toString() + ")");
		}
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
