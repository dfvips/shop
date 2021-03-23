package service;

import java.util.List;
import org.apache.ibatis.session.SqlSession;
import entity.CustomerInfo;
import entity.GoodsInfo;
import entity.GoodsmsgInfo;
import entity.OrderInfo;
import mybatis.GoodsMapper;
import mybatis.GoodsMsgMapper;
import mybatis.Mapper;
import mybatis.MybatisReader;
import mybatis.OrderlistMap;

public class Dbservice {

	public CustomerInfo findCustomer(CustomerInfo c) {
		// TODO Auto-generated method stub
		SqlSession sqlSession=MybatisReader.getSession();
		List<CustomerInfo> result=null;
		if(c.getLoginid()!=null) {
			result=sqlSession.getMapper(Mapper.class).findbloginid(c.getLoginid());
		}else if(c.getPassword()!=null) {
			if(c.getEmail()!=null) {
				result=sqlSession.getMapper(Mapper.class).findbyep(c.getEmail(),c.getPassword());
			}else if(c.getPhone()!=null) {
				result=sqlSession.getMapper(Mapper.class).findbyep(c.getPhone(),c.getPassword());
			}
		}else {
			if(c.getEmail()!=null) {
				result=sqlSession.getMapper(Mapper.class).findbyemail(c.getEmail());
			}
			if(c.getPhone()!=null) {
				result=sqlSession.getMapper(Mapper.class).findbyphone(c.getPhone());
			}
		}
		sqlSession.close();
		sqlSession.clearCache();
		if(result.size()!=0) {
			return result.get(0);
		}else {
			return null;
		}
	}

	public int insertcustomer(CustomerInfo c) {
		// TODO Auto-generated method stub
		SqlSession sqlSession=MybatisReader.getSession();
		int result=0;
		if(c.getLoginid()!=null) {
			result=sqlSession.getMapper(Mapper.class).insertbyloginid(c.getUsername(), c.getLoginid(), c.getFigureurl());
		}
		if(c.getPhone()!=null){
			result=sqlSession.getMapper(Mapper.class).insertbyphone(c.getPhone(), c.getFigureurl(),c.getUsername());
		}
		if(c.getEmail()!=null) {
			result=sqlSession.getMapper(Mapper.class).insertbyemail(c.getEmail(), c.getFigureurl(),c.getUsername());
		}
		sqlSession.commit();
		sqlSession.close();
		sqlSession.clearCache();
		return result;
	}
	public int updatecustomer(CustomerInfo c) {
		SqlSession sqlSession=MybatisReader.getSession();
		int result=0;
		if(c.getEmail()!=null) {
			result=sqlSession.getMapper(Mapper.class).updatemsg(c.getEmail(), c.getPassword());
		}else if(c.getPhone()!=null) {
			result=sqlSession.getMapper(Mapper.class).updatemsg(c.getPhone(), c.getPassword());
		}
		sqlSession.commit();
		sqlSession.close();
		sqlSession.clearCache();
		return result;
	}
	public List<GoodsInfo> findGoods(GoodsInfo goods){
		SqlSession sqlSession=MybatisReader.getSession();
		List<GoodsInfo> result=null;
		if(goods.getCname()!=null) {
			result=sqlSession.getMapper(GoodsMapper.class).findgoods(goods.getCname());
		}else if(goods.getId()!=null){
			result=sqlSession.getMapper(GoodsMapper.class).findgoodsById(goods.getId());
		}
		sqlSession.close();
		sqlSession.clearCache();
		return result;
	}
	public List<GoodsmsgInfo> findGoodsmsg(GoodsmsgInfo goods){
		SqlSession sqlSession=MybatisReader.getSession();
		List<GoodsmsgInfo> result=null;
		if(goods.getLink_name()!=null) {
			result=sqlSession.getMapper(GoodsMsgMapper.class).findgoodsmsg(goods.getLink_name());
		}
		sqlSession.close();
		sqlSession.clearCache();
		return result;
	}
	public List<GoodsmsgInfo> searchgoods(GoodsmsgInfo goods){
		SqlSession sqlSession=MybatisReader.getSession();
		List<GoodsmsgInfo> result=null;
		if(goods.getName()!=null) {
			result=sqlSession.getMapper(GoodsMsgMapper.class).searchgood(goods.getName());
		}
		sqlSession.close();
		sqlSession.clearCache();
		return result;
	}
	public int insertorderlist(OrderInfo i) {
		// TODO Auto-generated method stub
		SqlSession sqlSession=MybatisReader.getSession();
		int result=0;
		if(String.valueOf(i.getUid())!=null&&i.getOrderlist()!=null) {
			result=sqlSession.getMapper(OrderlistMap.class).insertordermsg(i.getUid(), i.getOrderlist());
		}
		sqlSession.commit();
		sqlSession.close();
		sqlSession.clearCache();
		return result;
	}
	public int updatecustomermsg(CustomerInfo c) {
		SqlSession sqlSession=MybatisReader.getSession();
		int result=0;
		if(c.getUid()!=null) {
			if(c.getGender()!=null) {
				result=sqlSession.getMapper(Mapper.class).updatesex(c.getUid(), c.getGender());
			}else if(c.getPassword()!=null) {
				result=sqlSession.getMapper(Mapper.class).updatepwd(c.getUid(), c.getPassword());
			}else if(c.getEmail()!=null) {
				result=sqlSession.getMapper(Mapper.class).updateemail(c.getUid(), c.getEmail());
			}else if(c.getPhone()!=null) {
				result=sqlSession.getMapper(Mapper.class).updatephone(c.getUid(), c.getPhone());
			}else if(c.getUsername()!=null) {
				result=sqlSession.getMapper(Mapper.class).updateusername(c.getUid(), c.getUsername());
			}else if(c.getFigureurl()!=null) {
				result=sqlSession.getMapper(Mapper.class).updatefigureurl(c.getUid(), c.getFigureurl());
			}
		}else if(c.getPhone()!=null) {
			result=0;
		}
		sqlSession.commit();
		sqlSession.close();
		sqlSession.clearCache();
		return result;
	}
	
	public List<OrderInfo> searchlist(OrderInfo o){
		SqlSession sqlSession=MybatisReader.getSession();
		List<OrderInfo> result=null;
		if(String.valueOf(o.getUid())!=null) {
			result=sqlSession.getMapper(OrderlistMap.class).findorderlist(o.getUid());
		}
		sqlSession.close();
		sqlSession.clearCache();
		return result;
	}
}
