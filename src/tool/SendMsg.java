package tool;

import com.github.qcloudsms.SmsSingleSender;
import com.github.qcloudsms.SmsSingleSenderResult;
import com.github.qcloudsms.httpclient.HTTPException;
import org.json.JSONException;
import java.io.IOException;

public class SendMsg {
	
	public static boolean sendMsg(String phone,int templateId,String paramsa){
		// 短信应用 SDK AppID
		int appid = YourSdkAPPID; // SDK AppID 以1400开头
		// 短信应用 SDK AppKey
		String appkey = "YourAppKey";
		// 需要发送短信的手机号码
		// 短信模板 ID，需要在短信应用中申请
		// 签名
		String smsSign = "学生个人学习开发网"; // NOTE: 签名参数使用的是`签名内容`，而不是`签名ID`。这里的签名"腾讯云"只是示例，真实的签名需要在短信控制台申请
		try {
			  String[] params = {paramsa};
			  SmsSingleSender ssender = new SmsSingleSender(appid, appkey);
			  SmsSingleSenderResult result = ssender.sendWithParam("86", phone,
			      templateId, params, smsSign, "", "");
			  System.out.println(result);
			} catch (HTTPException e) {
			  // HTTP 响应码错误
			  e.printStackTrace();
			} catch (JSONException e) {
			  // JSON 解析错误
			  e.printStackTrace();
			} catch (IOException e) {
			  // 网络 IO 错误
			  e.printStackTrace();
			}
		return false;
	}
}
