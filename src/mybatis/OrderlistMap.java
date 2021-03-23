package mybatis;

import java.util.List;

import entity.OrderInfo;


public interface OrderlistMap {
	public int insertordermsg(Integer uid,String orderlist);
	public List<OrderInfo> findorderlist(Integer uid);
}