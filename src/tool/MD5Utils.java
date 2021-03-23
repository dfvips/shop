package tool;

import java.security.*;

public class MD5Utils {
	public static String salt;
	public static String saltcode;

	public static String encode(String text) {
		return md5(MD5Utils.saltcode + text);
	}

	public static String md5(String text) {
		try {
			MessageDigest digest = MessageDigest.getInstance("md5");
			byte[] result = digest.digest(text.getBytes());
			StringBuilder sb = new StringBuilder();
			for (byte b : result) {
				int number = b & 0xFF;
				String hex = Integer.toHexString(number);
				if (hex.length() == 1) {
					sb.append("0" + hex);
				} else {
					sb.append(hex);
				}
			}
			return sb.toString();
		} catch (Exception e) {
			e.printStackTrace();
			return "";
		}
	}

	static {
		MD5Utils.salt = "dreamfly";
		MD5Utils.saltcode = md5(MD5Utils.salt);
	}
}
