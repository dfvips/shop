package shop;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import entity.GoodsCarInfo;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


public class ShowCar extends HttpServlet {

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
		Map<GoodsCarInfo, Integer> goodslist=null;
		String callback = request.getParameter("callback");
		goodslist = new HashMap<GoodsCarInfo, Integer>();  
		if(session.getAttribute("cart") == null){
			cart=null;
	        JSONObject result = new JSONObject();  
	        result.put("result", "fail");  
			out.print(callback+"("+result.toString()+")");
		}else {
			cart = (List<GoodsCarInfo>)session.getAttribute("cart");
			for(GoodsCarInfo good:cart){
				boolean flag=true;
				for(GoodsCarInfo good_key:goodslist.keySet()){
					if(good_key.getId().equals(good.getId())&&good_key.getType().equals(good.getType())&&good_key.getColor().equals(good.getColor())){
						if(goodslist.get(good_key)+Integer.parseInt(good.getNum())>20) {
							int num=20-goodslist.get(good_key);
							good.setNum(String.valueOf(num));
							goodslist.put(good_key,20);
						}else if(goodslist.get(good_key)==20||goodslist.get(good_key)+Integer.parseInt(good.getNum())==20) {
							goodslist.put(good_key,20);
						}else {
							goodslist.put(good_key,goodslist.get(good_key)+Integer.parseInt(good.getNum()));
						}
						flag=false;
						break;
					}
				}
				if(flag){
					goodslist.put(good,Integer.parseInt(good.getNum()));
				}
			}
	        out.print(callback+"("+createJSONObject(goodslist).toString()+")");
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
	
	private static JSONObject createJSONObject(Map<GoodsCarInfo, Integer> foodlist) {  
		
        JSONObject result = new JSONObject();  
        JSONArray jsonArray = new JSONArray();  
        
        for (Entry<GoodsCarInfo, Integer> entry : foodlist.entrySet()) {
        	JSONObject json = new JSONObject();  
 	        json.put("id", entry.getKey().getId());  
 	        json.put("name", entry.getKey().getName());  
 	        json.put("img", entry.getKey().getImg());  
 	        json.put("price", entry.getKey().getPrice()); 
 	        json.put("type",entry.getKey().getType());
 	        json.put("color",entry.getKey().getColor());
 	        json.put("num", entry.getValue()); 
 	        jsonArray.add(json);
        }	
	    if(jsonArray.isEmpty()==false) {
	        result.put("result", "success");  
	        result.element("data", jsonArray);  
	    }else {
	        result.put("result", "fail");  
	    }
        return result;  
    } 

}
