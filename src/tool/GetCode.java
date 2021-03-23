package tool;

import java.util.*;

public class GetCode {
	public static String result;

	public static String getCode() {
		char[] chars = "0123456789abcdefghijkmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ".toCharArray();
		Random r = new Random();
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < 4; ++i) {
			int pos = r.nextInt(chars.length);
			char c = chars[pos];
			GetCode.result = sb.append(c).toString();
		}
		return GetCode.result;
	}

	public static String getnumCode() {
		char[] chars = "0123456789".toCharArray();
		Random r = new Random();
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < 4; ++i) {
			int pos = r.nextInt(chars.length);
			char c = chars[pos];
			GetCode.result = sb.append(c).toString();
		}
		return GetCode.result;
	}

	static {
		GetCode.result = "";
	}
}
