package entity;

public class GoodsmsgInfo {
	private Integer id;
	private String name;
	private String link_name;
	private Integer gid;
	private String paralist;
	private String detail;
	private String describe;
	private String carousel;
	private String describe_imgs;
	@Override
	public String toString() {
		return "GoodsmsgInfo [id=" + id + ", name=" + name + ", link_name=" + link_name + ", gid=" + gid + ", paralist="
				+ paralist + ", detail=" + detail + ", describe=" + describe + ", carousel=" + carousel
				+ ", describe_imgs=" + describe_imgs + "]";
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
	public Integer getGid() {
		return gid;
	}
	public void setGid(Integer gid) {
		this.gid = gid;
	}
	public String getParalist() {
		return paralist;
	}
	public void setParalist(String paralist) {
		this.paralist = paralist;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	public String getDescribe() {
		return describe;
	}
	public void setDescribe(String describe) {
		this.describe = describe;
	}
	public String getCarousel() {
		return carousel;
	}
	public void setCarousel(String carousel) {
		this.carousel = carousel;
	}
	public String getDescribe_imgs() {
		return describe_imgs;
	}
	public void setDescribe_imgs(String describe_imgs) {
		this.describe_imgs = describe_imgs;
	}
	public String getLink_name() {
		return link_name;
	}
	public void setLink_name(String link_name) {
		this.link_name = link_name;
	}
}
