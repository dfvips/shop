package Test;

import java.util.List;
import org.junit.Test;
import org.apache.ibatis.session.SqlSession;
import entity.OrderInfo;
import mybatis.MybatisReader;
import service.Dbservice;

public class MybatisTest {

	@Test
	public void test() {
		/* CustomerInfo result=null; */
//		SqlSession sqlSession = MybatisReader.getSession();
		/*
		 * CustomerInfo c = new CustomerInfo(); c.setEmail("420443292@qq.com");
		 * Dbservice dbservice=new Dbservice(); result=dbservice.findCustomer(c);
		 * System.out.println(result);
		 */
//		sqlSession=MybatisReader.getSession();
//		result=sqlSession.getMapper(Mapper.class).findbyphone("18665154354");
//		System.out.println(result.toString());
//		result=sqlSession.getMapper(Mapper.class).findbyemail("420443292@qq.com");
//		System.out.println(result.toString());
//		int result1=0;
//		result1=sqlSession.getMapper(Mapper.class).updatemsg("420443292@qq.com", "12345");
//		sqlSession.commit();
//		System.out.println(result1);
//		result1=sqlSession.getMapper(Mapper.class).updatemsg("18665154354", "12345");
//		sqlSession.commit();
//		System.out.println(result1);
//		result1=sqlSession.getMapper(Mapper.class).insertbyloginid("test", "111", "111");
//		sqlSession.commit();
//		System.out.println(result1);
//		result1=sqlSession.getMapper(Mapper.class).insertbyphone("123", "123");
//		sqlSession.commit();
//		System.out.println(result1);
//		result1=sqlSession.getMapper(Mapper.class).insertbyemail("1565", "123");
//		sqlSession.commit();
//		System.out.println(result1);
		/*
		 * GoodsInfo g = new GoodsInfo(); g.setId(15);
		 * 
		 * List<GoodsInfo>
		 * result=sqlSession.getMapper(GoodsMapper.class).findgoods(g.getCname());
		 * 
		 * Dbservice dbservice=new Dbservice(); List<GoodsInfo>
		 * result=dbservice.findGoods(g); System.out.println(result);
		 * sqlSession.close();
		 */
		/*
		 * GoodsmsgInfo g=new GoodsmsgInfo(); g.setLink_name("mi9pro5g"); Dbservice
		 * dbservice=new Dbservice(); List<GoodsmsgInfo>
		 * result=dbservice.findGoodsmsg(g); System.out.println(result.toString());
		 */
		/*
		 * JSONObject jsonobjout = new JSONObject(); GoodsmsgInfo g=new GoodsmsgInfo();
		 * g.setName("С��"); Dbservice dbservice=new Dbservice(); List<GoodsmsgInfo>
		 * result=dbservice.searchgoods(g); if(result.size()!=0) {
		 * jsonobjout.element("result","success"); JSONArray array=new JSONArray();
		 * for(int i=0;i<result.size();i++) { GoodsmsgInfo
		 * thisGoodsmsgInfo=result.get(i); String
		 * name=thisGoodsmsgInfo.getName().toString(); String
		 * result0=thisGoodsmsgInfo.getLink_name().toString(); JSONObject jsonobj = new
		 * JSONObject(); jsonobj.element("title", name); jsonobj.element("result",
		 * result0); array.element(jsonobj); } jsonobjout.element("data", array);
		 * System.out.println(jsonobjout.toString()); }else {
		 * jsonobjout.put("result","fail"); } sqlSession.close();
		 */
		/*
		 * Integer uid=11; String orderlist="cdscscd";
		 */
//		Dbservice dbservice=new Dbservice();
//		OrderInfo i=new OrderInfo();
//		/*
//		 * i.setUid(uid); i.setOrderlist(orderlist); Integer
//		 * resultInteger=dbservice.insertorderlist(i);
//		 * System.out.println(resultInteger);
//		 */
//		i.setUid(2);
//		List<OrderInfo> result=null;
//		result=dbservice.searchlist(i);
//		System.out.print(result);
	}

}
