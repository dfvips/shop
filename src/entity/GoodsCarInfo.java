package entity;

public class GoodsCarInfo {
	@Override
	public String toString() {
		return "GoodsCarInfo [id=" + id + ", name=" + name + ", img=" + img + ", price=" + price + ", type=" + type
				+ ", color=" + color + ", num=" + num + "]";
	}
	private String id;
	private String name;
	private String img;
	private String price;
	private String type;
	private String color;
	private String num;
	
	public GoodsCarInfo(String id, String name, String img, String price, String type, String color,
			String num) {
		// TODO Auto-generated constructor stub
		this.id=id;
		this.name=name;
		this.img=img;
		this.price=price;
		this.type=type;
		this.color=color;
		this.num=num;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getNum() {
		return num;
	}
	public void setNum(String num) {
		this.num = num;
	}
}
