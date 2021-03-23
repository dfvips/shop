package entity;


public class CustomerInfo
{
    private Integer uid;
    private String loginid;
    private String username;
    private String password;
    private String gender;
    private String email;
    private String phone;
    private String address;
    private String figureurl;
    
    public String getPhone() {
        return this.phone;
    }
    
    public void setPhone(final String phone) {
        this.phone = phone;
    }
    
    public Integer getUid() {
        return this.uid;
    }
    
    public void setUid(final Integer uid) {
        this.uid = uid;
    }
    
    public String getLoginid() {
        return this.loginid;
    }
    
    public void setLoginid(final String loginid) {
        this.loginid = loginid;
    }
    
    public String getUsername() {
        return this.username;
    }
    
    public void setUsername(final String username) {
        this.username = username;
    }
    
    public String getPassword() {
        return this.password;
    }
    
    public void setPassword(final String password) {
        this.password = password;
    }
    
    public String getGender() {
        return this.gender;
    }
    
    public void setGender(final String gender) {
        this.gender = gender;
    }
    
    public String getEmail() {
        return this.email;
    }
    
    public void setEmail(final String email) {
        this.email = email;
    }
    
    public String getAddress() {
        return this.address;
    }
    
    public void setAddress(final String address) {
        this.address = address;
    }
    
    @Override
	public String toString() {
        return "CustomerInfo [uid=" + this.uid + ", loginid=" + this.loginid + ", username=" + this.username + ", password=" + this.password + ", gender=" + this.gender + ", email=" + this.email + ", phone=" + this.phone + ", address=" + this.address + "]";
    }
    
    public String getFigureurl() {
        return this.figureurl;
    }
    
    public void setFigureurl(final String figureurl) {
        this.figureurl = figureurl;
    }
}
