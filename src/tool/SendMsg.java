package tool;

import com.github.qcloudsms.SmsSingleSender;
import com.github.qcloudsms.SmsSingleSenderResult;
import com.github.qcloudsms.httpclient.HTTPException;
import org.json.JSONException;
import java.io.IOException;

public class SendMsg {
	
	public static boolean sendMsg(String phone,int templateId,String paramsa){
		// ����Ӧ�� SDK AppID
		int appid = 1400279626; // SDK AppID ��1400��ͷ
		// ����Ӧ�� SDK AppKey
		String appkey = "133c9f985f796b872e5a2461b40ae2ac";
		// ��Ҫ���Ͷ��ŵ��ֻ�����
		// ����ģ�� ID����Ҫ�ڶ���Ӧ��������
		// ǩ��
		String smsSign = "ѧ������ѧϰ������"; // NOTE: ǩ������ʹ�õ���`ǩ������`��������`ǩ��ID`�������ǩ��"��Ѷ��"ֻ��ʾ������ʵ��ǩ����Ҫ�ڶ��ſ���̨����
		try {
			  String[] params = {paramsa};
			  SmsSingleSender ssender = new SmsSingleSender(appid, appkey);
			  SmsSingleSenderResult result = ssender.sendWithParam("86", phone,
			      templateId, params, smsSign, "", "");
			  System.out.println(result);
			} catch (HTTPException e) {
			  // HTTP ��Ӧ�����
			  e.printStackTrace();
			} catch (JSONException e) {
			  // JSON ��������
			  e.printStackTrace();
			} catch (IOException e) {
			  // ���� IO ����
			  e.printStackTrace();
			}
		return false;
	}
}
