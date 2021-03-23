package shop;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import entity.GoodsCarInfo;

public class AddToCar extends HttpServlet {

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
		response.setContentType("text/html; charset=UTF-8");
		request.setCharacterEncoding("utf-8");  
		String callback = request.getParameter("callback");
		String id=request.getParameter("id");
		String name=request.getParameter("name");
		String img=request.getParameter("img");
		String price=request.getParameter("price");
		String type=request.getParameter("type");
		String color=request.getParameter("color");
		String num=request.getParameter("num");
		PrintWriter out=response.getWriter();
		GoodsCarInfo carInfo = new GoodsCarInfo(id,name,img,price,type,color,num);
		System.out.println(carInfo.toString());
		HttpSession session = request.getSession();			
		@SuppressWarnings("unchecked")
		List<GoodsCarInfo> cart = (List<GoodsCarInfo>)session.getAttribute("cart");
		if(cart==null){
			cart = new ArrayList<GoodsCarInfo>();
			session.setAttribute("cart",cart);			
		}
		if(cart.add(carInfo)){
			Cookie cookie = new Cookie("JSESSIONID", session.getId());
			cookie.setMaxAge(360*24*60*60);
			response.addCookie(cookie);	
		}
		out.print(callback+"({\"result\":\"success\"})");
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
