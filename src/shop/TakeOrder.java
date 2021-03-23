package shop;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLEncoder;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import entity.OrderInfo;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import service.Dbservice;
import tool.MD5Utils;

public class TakeOrder extends HttpServlet {

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
		String nowtime=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
		String listnum=String.valueOf(System.currentTimeMillis());
		if(request.getParameter("userid")!=null) {
			Integer uid=Integer.parseInt(request.getParameter("userid").replace(MD5Utils.encode("Dreamfly"),""));
 	 		String ids=request.getParameter("id").replace("{", "").replace("}", "");
 	 		String colors=request.getParameter("color").replace("{", "").replace("}", "");
 	 		String types=request.getParameter("type").replace("{", "").replace("}", "");
 	 		String nums=request.getParameter("num").replace("{", "").replace("}", "");
 	 		String names=request.getParameter("name").replace("{", "").replace("}", "");
 	 		String prices=request.getParameter("price").replace("{", "").replace("}", "");
 	 		String imgs=request.getParameter("img").replace("{", "").replace("}", "");
 	 		String[] idArr = ids.split(",");
 	 		String[] colorArr = colors.split(",");
 	 		String[] typeArr = types.split(",");
 	 		String[] numArr = nums.split(",");
 	 		String[] nameArr = names.split(",");
 	 		String[] priceArr = prices.split(",");
 	 		String[] imgArr = imgs.split(",");
 	 		JSONObject all=new JSONObject();
 	 		JSONArray alljsoncallback=new JSONArray();
 	 		double priceall=0;
 	 	    for (int i = 0; i < idArr.length; i++) {
 	 	        String id=idArr[i];
 	 	        String color=colorArr[i];
 	 	        String type="";
	 	        try {
	 	        	type=typeArr[i];
	 	        }catch (Exception e) {
					// TODO: handle exception
	 	        	type="";
				}
 	 	        String num=numArr[i];
 	 	        String name=nameArr[i];
 	 	     	String price=priceArr[i];
 	 	     	String img=imgArr[i];
 	 	     	JSONObject thisObj=new JSONObject();
 	 	     	thisObj.element("id", id);	
 	 	     	thisObj.element("color", color);	
 	 	     	thisObj.element("type", type);	
 	 	     	thisObj.element("num", num);	
 	 	     	thisObj.element("name", name);	
 	 	     	thisObj.element("price", price);	
 	 	     	thisObj.element("img", img);
 	 	     	priceall+=(Double.parseDouble(price.replace("гд", ""))*Integer.parseInt(num));
 	 	     	alljsoncallback.element(thisObj);
 	 	    }
 	 	    all.element("data", alljsoncallback);
 	 	    DecimalFormat df = new DecimalFormat(".00");
 	 	    all.element("priceall", "гд"+df.format(priceall));
 	 	    all.element("ordertime", nowtime);
 	 	    all.element("ordernum", listnum);
 	 	    OrderInfo i=new OrderInfo();
 	 	    i.setUid(uid);
 	 	    i.setOrderlist(all.toString());
 	 	    int resultins=dbservice.insertorderlist(i);
 	 	    if(resultins==1) {
 	 			JSONObject jsoncallback=new JSONObject();
 	 			jsoncallback.element("result", "success");
 	 			out.print(callback+"("+jsoncallback.toString()+")");
 	 			set_addCookie("nowtime", URLEncoder.encode(nowtime,"utf-8"),response);
 	 			set_addCookie("ordernum",URLEncoder.encode(listnum,"utf-8"),response);
 	 			set_addCookie("orderprice",URLEncoder.encode(String.valueOf(priceall),"utf-8"),response);
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
	
	public static void set_addCookie(String key, String value, HttpServletResponse response) {
		Cookie Cookie = new Cookie(key, value);
		Cookie.setMaxAge(10);
		response.addCookie(Cookie);
	}
}
