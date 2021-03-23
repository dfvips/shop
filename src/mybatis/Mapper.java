package mybatis;

import java.util.List;
import entity.CustomerInfo;;

public interface Mapper {
	public List<CustomerInfo> findbyphone(String phone);
	public List<CustomerInfo> findbyemail(String email);
	public List<CustomerInfo> findbloginid(String loginind);
	public List<CustomerInfo> findbyep(String ep,String password);
	public int insertbyphone(String phone,String figureurl,String username);
	public int insertbyemail(String email,String figureurl,String username);
	public int insertbyloginid(String username,String loginind,String figureurl);
	public int updatemsg(String ep,String password);
	public int updatepwd(Integer id,String password);
	public int updatefigureurl(Integer id,String figureurl);
	public int updatesex(Integer id,String gender);
	public int updateemail(Integer id,String email);
	public int updatephone(Integer id,String phone);
	public int updateusername(Integer id,String username);
}
