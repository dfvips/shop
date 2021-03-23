package tool;

import java.util.regex.*;

public class Checkemail_phone {
	public static boolean isEmail(String string) {
		if (string == null) {
			return false;
		}
		String regEx1 = "^([a-z0-9A-Z]+[-|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$";
		Pattern p = Pattern.compile(regEx1);
		Matcher m = p.matcher(string);
		return m.matches();
	}

	public static boolean isMobile(String mobile) {
		if (mobile.length() != 11) {
			return false;
		}
		String pat1 = "^((13[4-9])|(147)|(15[0-2,7-9])|(178)|(18[2-4,7-8]))\\d{8}|(1705)\\d{7}$";
		String pat2 = "^((13[0-2])|(145)|(15[5-6])|(176)|(18[5,6]))\\d{8}|(1709)\\d{7}$";
		String pat3 = "^((133)|(153)|(177)|(18[0,1,9])|(149))\\d{8}$";
		String pat4 = "^((170))\\d{8}|(1718)|(1719)\\d{7}$";
		Pattern pattern1 = Pattern.compile(pat1);
		Matcher match1 = pattern1.matcher(mobile);
		boolean isMatch1 = match1.matches();
		if (isMatch1) {
			return true;
		}
		Pattern pattern2 = Pattern.compile(pat2);
		Matcher match2 = pattern2.matcher(mobile);
		boolean isMatch2 = match2.matches();
		if (isMatch2) {
			return true;
		}
		Pattern pattern3 = Pattern.compile(pat3);
		Matcher match3 = pattern3.matcher(mobile);
		boolean isMatch3 = match3.matches();
		if (isMatch3) {
			return true;
		}
		Pattern pattern4 = Pattern.compile(pat4);
		Matcher match4 = pattern4.matcher(mobile);
		boolean isMatch4 = match4.matches();
		return isMatch4;
	}
}
