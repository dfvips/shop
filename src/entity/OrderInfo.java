package entity;

public class OrderInfo {
	private Integer id;
	private Integer uid;
	private String orderlist;
	
	@Override
	public String toString() {
		return "OrderInfo [id=" + id + ", uid=" + uid + ", orderlist=" + orderlist + "]";
	}
	public int getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public int getUid() {
		return uid;
	}
	public void setUid(Integer uid) {
		this.uid = uid;
	}
	public String getOrderlist() {
		return orderlist;
	}
	public void setOrderlist(String orderlist) {
		this.orderlist = orderlist;
	}
	
}
