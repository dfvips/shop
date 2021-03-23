package Test;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import tool.MD5Utils;

public class Test01 {
	public static void main(String[] args) {

		/*
		 * // 方式一：TreeMap可以自动排序 TreeMap<String, Object> params = new TreeMap<String,
		 * Object>(); setData(params);
		 * 
		 * StringBuilder s1 = new StringBuilder(); for (String key : params.keySet()) {
		 * s1.append(key).append("=").append(params.get(key)).append("&"); }
		 * s1.deleteCharAt(s1.length() - 1); System.out.println(s1);
		 */
		//方式二：使用HashMap，并使用Arrays.sort排序
		HashMap<String, Object> params2 = new HashMap<String, Object>();
		setData(params2);
		String[] sortedKeys = params2.keySet().toArray(new String[]{});
		Arrays.sort(sortedKeys);// 排序请求参数
		StringBuilder s2 = new StringBuilder();
        for (String key : sortedKeys) {
        	s2.append(key).append("=").append(params2.get(key)).append("&");
        }
        s2.deleteCharAt(s2.length() - 1);
        String key="62kdduu422dnU203jC43mncyddm2LU4J";
        System.out.println(s2+key);
        String url_a=MD5Utils.md5(s2+key);
        String url="https://www.c7e.cn/submit.php?"+s2+"&sign="+url_a+"&sign_type=MD5";
		System.out.println(url);
	}
	
	private  static void setData(Map<String,Object> params){
		params.put("pid", "33723"); 
		params.put("type", "alipay"); 
		params.put("out_trade_no", "20191209151343349021");
		params.put("notify_url", "http://dreamfly.work/shop/Pay"); 
		params.put("return_url", "http://dreamfly.work/shop"); 
		params.put("name", "test"); 
		params.put("money", "1.00"); 
		params.put("sitename","DreamFly"); 
	}
	public static String URLEncoder(String s) {
		try {
			s=URLEncoder.encode(s,"utf-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			s="";
		}
		return s;
	}
}