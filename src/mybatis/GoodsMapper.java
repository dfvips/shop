package mybatis;

import java.util.List;

import entity.GoodsInfo;

public interface GoodsMapper {
	public List<GoodsInfo> findgoods(String cname);
	public List<GoodsInfo> findgoodsById(Integer id);
}