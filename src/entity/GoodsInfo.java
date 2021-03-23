package entity;

public class GoodsInfo {
	private Integer id;
	private String name;
	private String m_describe;
	private String describe;
	private String price;
	private String o_price;
	private Integer cid;
	private String image;
	private String cname;
	private String s_image;
	private String link_name;
	
	
	@Override
	public String toString() {
		return "GoodsInfo [id=" + id + ", name=" + name + ", m_describe=" + m_describe + ", describe=" + describe
				+ ", price=" + price + ", o_price=" + o_price + ", cid=" + cid + ", image=" + image + ", cname=" + cname
				+ ", s_image=" + s_image + ", link_name=" + link_name + "]";
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getM_describe() {
		return m_describe;
	}
	public void setM_describe(String m_describe) {
		this.m_describe = m_describe;
	}
	public String getDescribe() {
		return describe;
	}
	public void setDescribe(String describe) {
		this.describe = describe;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getO_price() {
		return o_price;
	}
	public void setO_price(String o_price) {
		this.o_price = o_price;
	}
	public Integer getCid() {
		return cid;
	}
	public void setCid(Integer cid) {
		this.cid = cid;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getCname() {
		return cname;
	}
	public void setCname(String cname) {
		this.cname = cname;
	}
	public String getS_image() {
		return s_image;
	}
	public void setS_image(String s_image) {
		this.s_image = s_image;
	}
	public String getLink_name() {
		return link_name;
	}
	public void setLink_name(String link_name) {
		this.link_name = link_name;
	}
}
