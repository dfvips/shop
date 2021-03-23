package mybatis;

import java.util.List;
import entity.GoodsmsgInfo;

public interface GoodsMsgMapper {
	public List<GoodsmsgInfo> findgoodsmsg(String link_name);
	public List<GoodsmsgInfo> searchgood(String name);
}