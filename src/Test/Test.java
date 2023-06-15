package Test;

import java.text.SimpleDateFormat;
import java.util.Date;
import service.Dbservice;

public class Test {
	static Dbservice dbservice=new Dbservice(); 
	public static void main(String[] args) {
		// TODO Auto-generated method stub
//		JSONObject jsonobj = new JSONObject();
//		jsonobj.put("result","success");
//		JSONArray jsonArrayphone = new JSONArray();  
//		JSONObject jsonphone1 = new JSONObject();
//		jsonphone1.element("name", "小米CC9 Pro");
//		jsonphone1.element("img", "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/74bb2ad7cb8b3707d8fd9d596e1866e2.png");
//		jsonphone1.element("link", "https://item.mi.com/10000198.html");
//		JSONObject jsonphone2 = new JSONObject();
//		jsonphone2.element("name", "Redmi 8A");
//		jsonphone2.element("img", "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/77bfd346ad97807237beca297cfe2fba.png");
//		jsonphone2.element("link", "https://www.mi.com/redmi8a");
//		JSONObject jsonphone3 = new JSONObject();
//		jsonphone3.element("name", "Redmi 8");
//		jsonphone3.element("img", "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/47057d897ee2c05c9215e059e1308dc6.png");
//		jsonphone3.element("link", "https://item.mi.com/10000198.html");
//		JSONObject jsonphone4 = new JSONObject();
//		jsonphone4.element("name", "小米MIX Alpha");
//		jsonphone4.element("img", "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/74bb2ad7cb8b3707d8fd9d596e1866e2.png");
//		jsonphone4.element("link", "https://item.mi.com/10000198.html");
//		JSONObject jsonphone5 = new JSONObject();
//		jsonphone5.element("name", "小米9 Pro 5G");
//		jsonphone5.element("img", "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/74bb2ad7cb8b3707d8fd9d596e1866e2.png");
//		jsonphone5.element("link", "https://item.mi.com/10000198.html");
//		JSONObject jsonphone6 = new JSONObject();
//		jsonphone6.element("name", "Redmi K20 Pro 尊享版");
//		jsonphone6.element("img", "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/74bb2ad7cb8b3707d8fd9d596e1866e2.png");
//		jsonphone6.element("link", "https://item.mi.com/10000198.html");
//		JSONObject jsonphone7 = new JSONObject();
//		jsonphone7.element("name", "Redmi Note 8 Pro");
//		jsonphone7.element("img", "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/74bb2ad7cb8b3707d8fd9d596e1866e2.png");
//		jsonphone7.element("link", "https://item.mi.com/10000198.html");
//		jsonArrayphone.add(jsonphone1);
//		jsonArrayphone.add(jsonphone2);
//		jsonArrayphone.add(jsonphone3);
//		jsonArrayphone.add(jsonphone4);
//		jsonArrayphone.add(jsonphone5);
//		jsonArrayphone.add(jsonphone6);
//		jsonArrayphone.add(jsonphone7);
//		jsonobj.element("phone", jsonArrayphone);
//		jsonobj.element("tv", jsonArrayphone);
//		jsonobj.element("pc", jsonArrayphone);
//		jsonobj.element("earphone", jsonArrayphone);
//		jsonobj.element("other", jsonArrayphone);
//		System.out.print(jsonobj.toString());
		/*
		 * JSONObject jsonobj = new JSONObject(); jsonobj.put("result","success");
		 * JSONArray jsonArrayphone=createJsonObj("小米手机"); JSONArray
		 * jsonArraytv=createJsonObj("小米电视"); JSONArray
		 * jsonArraypc=createJsonObj("小米笔记本"); JSONArray
		 * jsonArrayearphone=createJsonObj("小米耳机"); JSONArray
		 * jsonArraybind=createJsonObj("小米手环"); jsonobj.element("phone",
		 * jsonArrayphone); jsonobj.element("tv", jsonArraytv); jsonobj.element("pc",
		 * jsonArraypc); jsonobj.element("earphone", jsonArrayearphone);
		 * jsonobj.element("other", jsonArraybind);
		 */
		/* System.out.println(jsonobj.toString()); */
		System.out.println(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
		System.out.println(System.currentTimeMillis());
	}
	/*
	 * public static JSONArray createJsonObj(String cname) { JSONArray jsonArray=new
	 * JSONArray(); GoodsInfo goods=new GoodsInfo(); goods.setCname(cname);
	 * List<GoodsInfo> result=dbservice.findGoods(goods); for(int
	 * i=0;i<result.size();i++) { JSONObject json = new JSONObject();
	 * json.element("name", result.get(i).getName()); json.element("img",
	 * result.get(i).getS_image()); json.element("link", "#"); jsonArray.add(json);
	 * } return jsonArray; }
	 */
}
