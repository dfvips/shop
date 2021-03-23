package shop;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import entity.GoodsCarInfo;

public class AddAndCut extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1539180950287570752L;

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
	@SuppressWarnings("unchecked")
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		response.setContentType("text/html; charset=UTF-8");
		request.setCharacterEncoding("utf-8");  
		String callback = request.getParameter("callback");
		String id="";
		String color="";
		String type="";
		String action="";
		HttpSession session = request.getSession();	
		List<GoodsCarInfo> cart;
		PrintWriter out=response.getWriter();
		if(request.getParameter("id")!=null&&request.getParameter("action")!=null) {
			id=request.getParameter("id");
			color=request.getParameter("color");
			type=request.getParameter("type");
			action=request.getParameter("action");
			if(session.getAttribute("cart") == null){
				cart=null;
				out.print(callback+"({\"result\", \"fail\"})");
			}else {
				cart=(List<GoodsCarInfo>)session.getAttribute("cart");
				if(action.equals("add")) {
					Add(cart,id,color,type);
				}else if(action.equals("cut")){
					Cut(cart,id,color,type);
				}
			}
			out.print(callback+"({\"result\":\"success\"})");
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
	
	public void Cut(List<GoodsCarInfo> cart,String id,String color,String type) {
		// TODO Auto-generated method stub
		int numm=0;
		for(int i=0;i<cart.size();i++)  {       
			if(id.equals(cart.get(i).getId())&&Integer.parseInt(cart.get(i).getNum())!=0)  {
				numm+=1;
			}else if(Integer.parseInt(cart.get(i).getNum())==0) {
				cart.remove(i);
			}
		}
		for(int i=0;i<cart.size();i++)  {       
			if(id.equals(cart.get(i).getId())&&color.equals(cart.get(i).getColor())&&type.equals(cart.get(i).getType()))  { 
				if(numm==1) {
					if(Integer.parseInt(cart.get(i).getNum())>1) {
						   String num=String.valueOf(Integer.parseInt(cart.get(i).getNum())-1);
			        	   cart.get(i).setNum(num);;    
			        	   break;    
					}
				}else {
					if(Integer.parseInt(cart.get(i).getNum())>=1) {
						   String num=String.valueOf(Integer.parseInt(cart.get(i).getNum())-1);
			        	   cart.get(i).setNum(num);;    
			        	   break;    
					}
				}
           }              
		}
	}

	public void Add(List<GoodsCarInfo> cart,String id,String color,String type) {
		// TODO Auto-generated method stub
		for(int i=0;i<cart.size();i++)  {       
			if(id.equals(cart.get(i).getId())&&color.equals(cart.get(i).getColor())&&type.equals(cart.get(i).getType()))  { 
			   String num=String.valueOf(Integer.parseInt(cart.get(i).getNum())+1);
        	   cart.get(i).setNum(num);;    
        	   break;    
			}
       }              
	}
}
