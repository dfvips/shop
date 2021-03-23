package mybatis;

import java.io.Reader;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class MybatisReader {
	private static String resource="MyBatis-config.xml";
	public static Reader reader=null;
	public static SqlSessionFactory sqlSessionFactory=null;
	static{
		try{
			reader=Resources.getResourceAsReader(resource);
			sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);	
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}
	public static SqlSession getSession(){
		return sqlSessionFactory.openSession();
	}
}
