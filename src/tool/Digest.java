package tool;


import java.security.MessageDigest;
 
/**
 * @Description:MD5加解密工具
 * @author:liuyc
 * @time:2016年5月23日 上午11:11:16
 */
public class Digest {
	/**
	 * @Description:加密-32位小写
	 * @author:liuyc
	 * @time:2016年5月23日 上午11:15:33
	 */
	public static String encrypt32(String encryptStr) {
		MessageDigest md5;
		try {
			md5 = MessageDigest.getInstance("MD5");
			byte[] md5Bytes = md5.digest(encryptStr.getBytes());
			StringBuffer hexValue = new StringBuffer();
			for (int i = 0; i < md5Bytes.length; i++) {
				int val = ((int) md5Bytes[i]) & 0xff;
				if (val < 16)
					hexValue.append("0");
				hexValue.append(Integer.toHexString(val));
			}
			encryptStr = hexValue.toString();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return encryptStr;
	}
 
	/**
	 * @Description:加密-16位小写
	 * @author:liuyc
	 * @time:2016年5月23日 上午11:15:33
	 */
	public static String encrypt16(String encryptStr) {
		return encrypt32(encryptStr).substring(8, 24);
	}

}