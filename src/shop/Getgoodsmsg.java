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

public class Getgoodsmsg extends HttpServlet {
	public Dbservice dbservice=new Dbservice();
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
		PrintWriter out = response.getWriter();
		String callback = request.getParameter("callback");
		if (request.getParameter("link_name") != null) {
			String link_name=request.getParameter("link_name");
			JSONObject jsonobj = new JSONObject();
			GoodsmsgInfo g=new GoodsmsgInfo();
			g.setLink_name(link_name);
			Dbservice dbservice=new Dbservice();
			List<GoodsmsgInfo> result=dbservice.findGoodsmsg(g);
			if(result.size()!=0) {
				jsonobj.put("result","success");
				GoodsmsgInfo thisGoodsmsgInfo=result.get(0);
				String id=thisGoodsmsgInfo.getGid().toString();
				String name=thisGoodsmsgInfo.getName().toString();
				String describe=thisGoodsmsgInfo.getDescribe().toString();
				JSONArray jsonArrayparalist=JSONArray.fromObject(thisGoodsmsgInfo.getParalist());
				JSONObject jsonobjdetail=JSONObject.fromObject(thisGoodsmsgInfo.getDetail());
				JSONArray jsonArraycarousel=JSONArray.fromObject(thisGoodsmsgInfo.getCarousel());
				JSONArray jsonArraydescribe_imgs=JSONArray.fromObject(thisGoodsmsgInfo.getDescribe_imgs());
				jsonobj.element("id", id);
				jsonobj.element("name", name);
				jsonobj.element("paralist", jsonArrayparalist);
				jsonobj.element("describe", describe);
				jsonobj.element("detail", jsonobjdetail);
				jsonobj.element("carousel", jsonArraycarousel);
				jsonobj.element("describe_imgs", jsonArraydescribe_imgs);
			}else {
				jsonobj.put("result","fail");
			}
			System.out.println(jsonobj.toString());
			out.print(callback+"("+jsonobj.toString()+")");
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

}
