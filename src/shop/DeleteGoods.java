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
import net.sf.json.JSONObject;

public class DeleteGoods extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3785587528290624700L;

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
		PrintWriter out = response.getWriter();
		HttpSession session = request.getSession();	
		List<GoodsCarInfo> cart;
		String callback = request.getParameter("callback"); 
        JSONObject result = new JSONObject();  
		if(session.getAttribute("cart") == null){
			cart=null;
			out.print(callback+"({\"result\", \"fail\"})");
		}else {
			cart=(List<GoodsCarInfo>)session.getAttribute("cart");
	 	 	if(request.getParameter("id")!=null){
	 	 		String ids=request.getParameter("id").replace("{", "").replace("}", "");
	 	 		String colors=request.getParameter("color").replace("{", "").replace("}", "");
	 	 		String types=request.getParameter("type").replace("{", "").replace("}", "");
	 	 		String[] strArr = ids.split(",");
	 	 		String[] colorArr = colors.split(",");
	 	 		String[] typeArr = types.split(",");
	 	 	    for (int j = 0; j < strArr.length; j++) {
	 	 	        String id=strArr[j];
	 	 	        String color=colorArr[j];
	 	 	        String type="";
	 	 	        try {
	 	 	        	type=typeArr[j];
	 	 	        }catch (Exception e) {
						// TODO: handle exception
	 	 	        	type="";
					}
	 	 	        for(int i=0; i<cart.size();i++)  {
	 		           if(id.equals(cart.get(i).getId())&&color.equals(cart.get(i).getColor())&&type.equals(cart.get(i).getType()))  {
	        	   		   cart.remove(i);    
	        	   		   i-=1;
	 		           }
	 			    }
	 	 	    }
		        result.put("result", "success");  
				out.print(callback+"("+result.toString()+")");
 	 		}else {
 	 			result.put("result", "fail");  
 				out.print(callback+"("+result.toString()+")");
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

}
